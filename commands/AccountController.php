<?php

/* 
 * Account commands controller
 * 
 * Deprecated!
 * 
 * Не используется, т.к. функционал списания за обслуживание счета был перенесен в InvestmentController.php
 */

namespace app\commands;

use Yii;
use yii\console\Controller;
use yii\console\ExitCode;

class AccountController extends Controller
{
    use \app\traits\ConfigParamsTrait;

    // получить список транзакций по накопленным средствам
    private function getAccumulatedTransactions() 
    {
        $transactionsTable = \app\models\Transaction::tableName();
        $transactionTypeTable = \app\models\TransactionType::tableName();
        $accountTable = \app\models\Account::tableName();
        $userTable = \app\models\User::tableName();
        
        // получить процент из конфигурационного файла
        $percent = $this->getUsingAccountDebitPercentParam();
        // получить массив исключаемых id пользователей из конфигурационного файла
        $exclude_user_ids = $this->getAccountDebitExcludedUserIdsParam();

        return \app\models\Transaction::find()
            ->select([
                "$accountTable.user_id as user_id",
                "$transactionsTable.account_id as account_id",
                "$userTable.manager_id as manager_id",
                "$transactionsTable.currency_id as currency_id",
                new \yii\db\Expression("SUM($transactionsTable.sum) AS `accumulated`"),
                new \yii\db\Expression("ROUND(SUM($transactionsTable.sum)/100*{$percent}*(-1), 2) AS `debit`")
            ])
            ->leftJoin($accountTable, "$accountTable.id = account_id")
            ->leftJoin($transactionTypeTable, "$transactionTypeTable.id = $transactionsTable.transaction_type_id")
            ->leftJoin($userTable, "$userTable.id = user_id")
            ->where(['in', "$transactionsTable.transaction_type_id", [2,4,5,6,9,10]])
            ->andWhere(["$transactionsTable.status" => 1])
            ->andWhere(['in', "$userTable.role", ['user']])
            ->andWhere(['not in', "user_id", $exclude_user_ids])
            ->groupBy(["user_id", "account_id", "manager_id", "currency_id"])
            ->asArray()
            ->all();
    }

    public function actionIndex()
    {
        echo "Account index action test success...\n";
    }
    
    /**
     * action для ежемесячного списания за обслуживание счета
     * 
     * запуск:
     * ./yii account/debit-monthly
     */
    public function actionDebitMonthly()
    {        
        // получить список транзакций по накопленным средствам
        $accumulatedTransactions = $this->getAccumulatedTransactions();

        // создать транзакции списания за обслуживание счета
        foreach($accumulatedTransactions as $transaction) {
            $model = new \app\models\Transaction();
            $model->account_id = $transaction['account_id'];
            $model->manager_id = $transaction['manager_id'];
            $model->currency_id = $transaction['currency_id'];
            $model->transaction_type_id = 2; // 2 - Оплата клиентом суммы за обслуживание счета
            $model->sum = $transaction['debit'];
            $model->description = 'Комиссия за обслуживание счета';
            $model->save();
        }
        
        echo "Monthly debit account action success...\n";

        return ExitCode::OK;
    }

}
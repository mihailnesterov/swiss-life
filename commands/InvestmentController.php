<?php

/* 
 * Investment commands controller
 */

namespace app\commands;

use Yii;
use yii\console\Controller;
use yii\console\ExitCode;

class InvestmentController extends Controller
{
    use \app\traits\ConfigParamsTrait;

    // получить список инвестиционных транзакций
    private function getItvestmentTransactions() 
    {
        $transactionsTable = \app\models\Transaction::tableName();
        $transactionTypeTable = \app\models\TransactionType::tableName();
        $accountTable = \app\models\Account::tableName();
        $userTable = \app\models\User::tableName();
        
        // получить процент из конфигурационного файла
        $percent = $this->getInvestmentProfitPercentParam();
        // получить массив исключаемых id пользователей из конфигурационного файла
        $exclude_user_ids = $this->getInvestmentProfitExcludedUserIdsParam();

        return \app\models\Transaction::find()
            ->select([
                "$accountTable.user_id as user_id",
                "$transactionsTable.account_id as account_id",
                "$transactionsTable.manager_id as manager_id",
                "$transactionsTable.currency_id as currency_id",
                new \yii\db\Expression("SUM($transactionsTable.sum)*(-1) AS `invested`"),
                new \yii\db\Expression("ROUND(SUM($transactionsTable.sum)*(-1)/100*{$percent}, 2) AS `profit`")
            ])
            ->leftJoin($accountTable, "$accountTable.id = account_id")
            ->leftJoin($transactionTypeTable, "$transactionTypeTable.id = $transactionsTable.transaction_type_id")
            ->leftJoin($userTable, "$userTable.id = user_id")
            ->where(['in', "$transactionsTable.transaction_type_id", [7]])
            ->andWhere(["$transactionsTable.status" => 1])
            ->andWhere(['in', "$userTable.role", ['user']])
            ->andWhere(['not in', "user_id", $exclude_user_ids])
            ->groupBy(["user_id", "account_id", "manager_id", "currency_id"])
            ->asArray()
            ->all();
    }

    public function actionIndex()
    {
        echo "Investment index action test success...\n";
    }
    
    /**
     * action для ежемесячного начисление прибыли от инвестиций
     * 
     * запуск:
     * ./yii investment/profit-monthly
     */
    public function actionProfitMonthly()
    {        
        // получить список инвестиционных транзакций
        $itvestmentTransactions = $this->getItvestmentTransactions();

        // создать транзакции начисления прибыли
        foreach($itvestmentTransactions as $transaction) {
            $model = new \app\models\Transaction();
            $model->account_id = $transaction['account_id'];
            $model->manager_id = $transaction['manager_id'];
            $model->currency_id = $transaction['currency_id'];
            $model->transaction_type_id = 5; // 5 - Начисление суммы прибыли на счет клиента
            $model->sum = abs($transaction['profit']);
            $model->description = 'PROFIT';
            $model->save();
        }

        echo "Monthly profit investment action success...\n";

        return ExitCode::OK;
    }

}
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
        
        // получить проценты начисления и списания из конфигурационного файла
        $profitPercent = $this->getInvestmentProfitPercentParam();
        $debitPercent = $this->getUsingAccountDebitPercentParam();
        // получить массив исключаемых id пользователей из конфигурационного файла
        $exclude_user_ids = $this->getInvestmentProfitExcludedUserIdsParam();

        return \app\models\Transaction::find()
            ->select([
                "$accountTable.user_id as user_id",
                "$transactionsTable.account_id as account_id",
                "$userTable.manager_id as manager_id",
                "$transactionsTable.currency_id as currency_id",
                new \yii\db\Expression("SUM($transactionsTable.sum)*(-1) AS `invested`"),
                new \yii\db\Expression("ROUND(SUM($transactionsTable.sum)*(-1)/100*{$profitPercent}, 2) AS `profit`"),
                new \yii\db\Expression("ROUND(SUM(($transactionsTable.sum)/100*{$profitPercent})/100*{$debitPercent}, 2) AS `debit`")
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

        // получить процент списания за обслуживание счета из конфигурационного файла
        $debitPercent = $this->getUsingAccountDebitPercentParam();

        // создать транзакции начисления прибыли
        foreach($itvestmentTransactions as $transaction) {
            
            // транзакция начисления прибыли
            $profit = new \app\models\Transaction();
            $profit->account_id = $transaction['account_id'];
            $profit->manager_id = $transaction['manager_id'];
            $profit->currency_id = $transaction['currency_id'];
            $profit->transaction_type_id = 5; // 5 - Начисление суммы прибыли на счет клиента
            $profit->sum = abs($transaction['profit']);
            $profit->description = 'PROFIT';
            $profit->save();

            // транзакция списания за обслуживание счета
            $debit = new \app\models\Transaction();
            $debit->account_id = $transaction['account_id'];
            $debit->manager_id = $transaction['manager_id'];
            $debit->currency_id = $transaction['currency_id'];
            $debit->transaction_type_id = 2; // 2 - Оплата клиентом суммы за обслуживание счета
            $debit->sum = (-1) * abs($transaction['debit']);
            $debit->description = "Комиссия за обслуживание счета ({$debitPercent}% от суммы прибыли по инвестициям)";
            $debit->save();

            unset($profit, $debit);
        }

        echo "Monthly profit investment and debit for using account action success...\n";

        return ExitCode::OK;
    }

}
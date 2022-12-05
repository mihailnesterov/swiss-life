<?php

/* 
 * Credit commands controller
 */

namespace app\commands;

use Yii;
use yii\console\Controller;
use yii\console\ExitCode;

class CreditController extends Controller
{
    use \app\traits\ConfigParamsTrait;

    // получить список кредитных транзакций
    private function getCreditTransactions() 
    {
        $transactionsTable = \app\models\Transaction::tableName();
        $transactionTypeTable = \app\models\TransactionType::tableName();
        $accountTable = \app\models\Account::tableName();
        $userTable = \app\models\User::tableName();

        // получить процент из конфигурационного файла
        $percent = $this->getRepayCreditPercentParam();

        return \app\models\Transaction::find()
            ->select([
                "$accountTable.user_id as user_id",
                "$transactionsTable.account_id as account_id",
                "$userTable.manager_id as manager_id",
                "$transactionsTable.currency_id as currency_id",
                new \yii\db\Expression("SUM($transactionsTable.sum) AS `credit`"),
                new \yii\db\Expression("ROUND(SUM($transactionsTable.sum)/100*{$percent}*(-1), 2) AS `repay`")
            ])
            ->leftJoin($accountTable, "$accountTable.id = account_id")
            ->leftJoin($transactionTypeTable, "$transactionTypeTable.id = $transactionsTable.transaction_type_id")
            ->leftJoin($userTable, "$userTable.id = user_id")
            ->where(['in', "$transactionsTable.transaction_type_id", [8]])
            ->andWhere(["$transactionsTable.status" => 1])
            ->groupBy(["user_id", "account_id", "manager_id", "currency_id"])
            ->orderBy(["user_id" => SORT_ASC])
            ->asArray()
            ->all();
    }

    // получить суммы уже существующих погашений по кредитам (transaction_type_id === 9)
    private function getPaidCreditSums() {
        return \app\models\Transaction::find()
                ->select(['account_id', 'currency_id', 'SUM(sum) as sum'])
                ->where(['transaction_type_id' => 9])
                ->andWhere(['status' => 1])
                ->groupBy(['account_id', 'currency_id'])
                ->orderBy(["account_id" => SORT_ASC])
                ->asArray()
                ->all();
    }
    

    public function actionIndex()
    {
        echo "Credit index action test success...\n";
    }
    
    /**
     * action для ежемесячного погашения кредитного плеча
     * 
     * запуск:
     * ./yii credit/repay-monthly
     */
    public function actionRepayMonthly()
    {        
        // получить список кредитных транзакций
        $creditTransactions = $this->getCreditTransactions();
        // получить суммы уже существующих погашений
        $paidCreditSums = $this->getPaidCreditSums();
        // получить IDs счетов уже существующих погашений
        $paidCreditSumsAccountsIds = array_unique(array_map(
            function($item) {
                return $item['account_id'];
            },
            $paidCreditSums
        ));

        // создать транзакции погашения кредитного плеча для каждого кредита
        foreach($creditTransactions as $transaction) {

            /**
             * в переменной сохранить остаток кредита,
             * далее она может быть скорректирована на сумму уже существующих погашений
             */
            $creditBalance = floatval($transaction['credit']);

            /**
             * в переменной сохранить сумму погашения, 
             * далее она может быть скорректирована, если по кредиту уже были погашения
             * в зависимости от разницы остатка кредита и сумм погашения
             */
            $repaySum = floatval($transaction['repay']);
            
            // проверить - если погашения уже были
            if( in_array($transaction['account_id'], $paidCreditSumsAccountsIds) ) {
                
                // получить сумму предыдущих погашений по счету транзакции
                $paidSumByTransactionAccount = array_values(array_filter(
                    $paidCreditSums,
                    function($item) use($transaction) {
                        return $item['account_id'] === $transaction['account_id'];
                    }
                ));
            }

             // создать транзакцию если остаток по кредиту > 0:
             if( $creditBalance > 0 ) {

                // если суммы погашений уже были - массив будет не пустым
                if( ! empty($paidSumByTransactionAccount) ) {
                    // скорректировать остаток по кредиту на сумму уже существующих погашений
                    $creditBalance = floatval(abs($transaction['credit']) - abs($paidSumByTransactionAccount[0]['sum']));

                    /**
                     * если разность остатка по кредиту и суммы погашений < 0, тогда 
                     * скорректровать сумму погашения, т.е. сделать ее равной остатку по кредиту
                     */
                    if( $creditBalance - abs($paidSumByTransactionAccount[0]['sum']) < 0 ) {
                        $repaySum = round($creditBalance, 2);
                    }
                }

                // создать транзакции погашения, с учетом корректировок $repaySum
                $model = new \app\models\Transaction();
                $model->account_id = $transaction['account_id'];
                $model->manager_id = $transaction['manager_id'];
                $model->currency_id = $transaction['currency_id'];
                $model->transaction_type_id = 9; // 9 - Погашение клиентом полученного кредита
                $model->sum = $repaySum;
                $model->description = 'Погашение кредита';
                $model->save();
                
            }
            
        }
        
        echo "Monthly repay credit action success...\n";

        return ExitCode::OK;
    }

}
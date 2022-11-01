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
        
        return array_values(
            array_filter(
                \app\models\Transaction::find()
                    ->select([
                        "$accountTable.user_id as user_id",
                        "$transactionsTable.account_id as account_id",
                        "$transactionsTable.manager_id as manager_id",
                        "$transactionsTable.currency_id as currency_id",
                        new \yii\db\Expression("SUM($transactionsTable.sum) AS `credit`")
                    ])
                    ->leftJoin($accountTable, "$accountTable.id = account_id")
                    ->leftJoin($transactionTypeTable, "$transactionTypeTable.id = $transactionsTable.transaction_type_id")
                    ->where(['in', "$transactionsTable.transaction_type_id", [8,9]])
                    ->andWhere(["$transactionsTable.status" => 1])
                    ->groupBy(["user_id", "account_id", "manager_id", "currency_id"])
                    ->asArray()
                    ->all(),
                function($item) {
                    return $item['credit'] > 0;
                }
            )
        ); 
    }

    // получить сумму накопленных средств (profit) на счете
    private function getAccountProfitSum( $account_id ) {
        return \app\models\Transaction::find()
                ->where(['in', 'transaction_type_id', [4,5,9,10]])
                ->andWhere(["status" => 1])
                ->andWhere(["account_id" => $account_id])
                ->sum('sum'); // если sum == 0 - накопленные средства (profit) отсутствуют
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
        $creditTransactions = array_map(
            function($item) {
                return array_merge(
                    $item, 
                    ['repay' => round(($item['profit'] / 100 * $this->getRepayCreditPercentParam()), 2)] 
                );
            },
            array_filter(
                array_map(
                    function($item) {
                        $profit = $this->getAccountProfitSum( $item['account_id'] );        
                        return array_merge(
                            $item, 
                            ['profit' => isset($profit) ? $profit : 0] 
                        );
                    },
                    $this->getCreditTransactions()
                ),
                function($item) {
                    // получить только тех, у кого есть накопленные средства (profit)
                    return $item['profit'] > 0;
                }
            )
        );

        // создать транзакции погашения кредитного плеча для каждого кредита > 0
        foreach($creditTransactions as $transaction) {
            $model = new \app\models\Transaction();
            $model->account_id = $transaction['account_id'];
            $model->manager_id = $transaction['manager_id'];
            $model->currency_id = $transaction['currency_id'];
            $model->transaction_type_id = 9;
            $model->sum = ((-1) * $transaction['repay']);
            $model->description = 'Погашение кредита';
            $model->save();
        }

        echo "Monthly repay credit action success...\n";

        return ExitCode::OK;
    }

}
<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property int $id id пользователя
 * @property int|null $manager_id id менеджера
 * @property int|null $status_id id статуса
 * @property int|null $parent_id id представителя
 * @property int $language_id id языка
 * @property string $email Email
 * @property string|null $password Пароль
 * @property string|null $auth_key Authentication Key
 * @property string|null $token Токен 
 * @property string|null $firstName Имя
 * @property string|null $lastName Фамилия
 * @property string|null $phone Телефон
 * @property string|null $address Адрес пользователя
 * @property string $role Роль 
 * @property int $status Статус активен/неактивен
 * @property int $verified Верифицирован
 * @property int $representive Представитель
 * @property string $created Дата создания профиля
 *
 * @property Account[] $accounts
 * @property Manager $manager
 * @property Language $language
 * @property Message[] $messages
 * @property UserStatus $userStatus
 * @property UserAsset[] $userAssets
 * @property UserCategory[] $userCategories
 * @property UserDocument[] $userDocuments
 * @property UserPhoto[] $userPhotos
 * @property Transaction[] $managerTransactions
 * @property UserVisit[] $userVisits
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['email'], 'required'],
            [['manager_id', 'status_id', 'parent_id', 'language_id'], 'integer'],
            [['status', 'verified', 'representive'], 'boolean'],
            [['created'], 'safe'],
            [['email', 'firstName', 'lastName', 'phone'], 'string', 'max' => 100],
            ['password', 'string', 'min' => 8, 'max' => 100, 'tooShort' => 'Длина пароля не минее 8 символов'],
            [['auth_key', 'address'], 'string', 'max' => 255],
            [['token'], 'string', 'max' => 50],
            [['role'], 'string', 'max' => 20],
            [['email'], 'unique'],
            [['manager_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['manager_id' => 'id']], 
            [['status_id'], 'exist', 'skipOnError' => true, 'targetClass' => Status::className(), 'targetAttribute' => ['status_id' => 'id']],
            [['language_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::className(), 'targetAttribute' => ['language_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id пользователя',
            'manager_id' => 'id менеджера',
            'status_id' => 'id статуса',
            'parent_id' => 'id представителя',
            'language_id' => 'id языка',
            'email' => 'Email',
            'password' => 'Пароль',
            'auth_key' => 'Authentication Key',
            'token' => 'Токен', 
            'firstName' => 'Имя',
            'lastName' => 'Фамилия',
            'phone' => 'Телефон',
            'address' => 'Адрес пользователя',
            'role' => 'Роль',
            'status' => 'Статус активен/неактивен',
            'verified' => 'Верифицирован',
            'representive' => 'Представитель',
            'created' => 'Дата создания профиля',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        unset(
            $fields['auth_key'], 
            $fields['password'],
            $fields['token'],
            $fields['manager_id'],
            $fields['language_id']
        );

        return array_merge($fields, [
            'fullName' => function () {
                return "$this->lastName $this->firstName";
            },
            'newMessages' => function () {
                return intval(\app\models\Message::find()
                    ->where(['receiver_id' => $this->id])
                    ->andWhere(['isRead' => 0])
                    ->count());
            },
            'members' => function () {
                return $this::find()
                    ->where(['parent_id' => $this->id])
                    ->all();
            },
            'userStatus' => function () {
                return $this->userStatus;
            },
            'userVisits' => function () {
                return \app\models\UserVisit::find()
                    ->where(['user_id' => $this->id])
                    ->orderBy(['created' => SORT_DESC])
                    ->limit(5)
                    ->all();
            },
            'userAssets' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $currencyTable = \app\models\Currency::tableName();
                $accountTable = \app\models\Account::tableName();
                $userTable = \app\models\User::tableName();
                $assetTable = \app\models\Asset::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        "$assetTable.id",
                        "$assetTable.name",
                        "$assetTable.excerpt",
                        "$assetTable.calculation",
                        "$transactionsTable.created",
                        "$transactionsTable.sum",
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->leftJoin($accountTable, "$accountTable.id = $transactionsTable.account_id")
                    ->leftJoin($userTable, "$userTable.id = $accountTable.user_id")
                    ->leftJoin($assetTable, "$assetTable.id = $transactionsTable.asset_id")
                    ->where(["$userTable.id" => $this->id])
                    ->andWhere(["$transactionsTable.transaction_type_id" => 7])
                    ->andWhere(["$transactionsTable.status" => 1])
                    ->asArray()
                    ->all();
            },
            'userAssetsTotal' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $transactionTypeTable = \app\models\TransactionType::tableName();
                $currencyTable = \app\models\Currency::tableName();
                $accountTable = \app\models\Account::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        new \yii\db\Expression("SUM($transactionsTable.sum * (-1)) AS `total`"),
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->leftJoin($accountTable, "$accountTable.id = $transactionsTable.account_id")
                    ->leftJoin($transactionTypeTable, "$transactionTypeTable.id = $transactionsTable.transaction_type_id")
                    ->where(["$accountTable.user_id" => $this->id])
                    ->andWhere(["$transactionsTable.status" => 1])
                    ->andWhere(["$transactionsTable.transaction_type_id" => 7])
                    ->groupBy("$transactionsTable.currency_id")
                    ->asArray()
                    ->all();
            },
            'userLeverageTotal' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $transactionTypeTable = \app\models\TransactionType::tableName();
                $currencyTable = \app\models\Currency::tableName();
                $accountTable = \app\models\Account::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        new \yii\db\Expression("SUM($transactionsTable.sum) AS `total`"),
                        "$currencyTable.shortName as currency",
                        "$currencyTable.sign as sign", 
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->leftJoin($accountTable, "$accountTable.id = $transactionsTable.account_id")
                    ->leftJoin($transactionTypeTable, "$transactionTypeTable.id = $transactionsTable.transaction_type_id")
                    ->where(["$accountTable.user_id" => $this->id])
                    ->andWhere(["$transactionsTable.status" => 1])
                    //->andWhere(['not', ["$transactionsTable.accepted" => null]])
                    ->andWhere(['in', "$transactionsTable.transaction_type_id", [8,9]])
                    ->groupBy("$transactionsTable.currency_id")
                    ->asArray()
                    ->all();
            },
            'usersCountAll' => function () {
                return intval(\app\models\User::find()
                    ->where(['manager_id' => $this->id])
                    ->count());
            },
            'usersCountActive' => function () {
                return intval(\app\models\User::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['status' => 1])
                    ->count());
            },
            'usersCountVerified' => function () {
                return intval(\app\models\User::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['verified' => 1])
                    ->count());
            },
            'usersCountRepresentive' => function () {
                return intval(\app\models\User::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['representive' => 1])
                    ->count());
            },
            'usersCountNotActive' => function () {
                return intval(\app\models\User::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['status' => 0])
                    ->count());
            },
            'usersCountNotVerified' => function () {
                return intval(\app\models\User::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['verified' => 0])
                    ->count());
            },
            'usersByStatuses' => function () {
                $statusTable = \app\models\Status::tableName();
                $userTable = \app\models\User::tableName();
                return \app\models\Status::find()
                    ->select([
                        new \yii\db\Expression("COUNT(*) AS `count`"), 
                        "$statusTable.name as status",
                    ])
                    ->leftJoin($userTable, "$userTable.status_id = $statusTable.id")
                    ->where(["$userTable.manager_id" => $this->id])
                    ->andWhere(['!=', "$userTable.status_id", 1])
                    ->orderBy(["$statusTable.id" => SORT_ASC])
                    ->groupBy("$statusTable.id")
                    ->asArray()
                    ->all();
            },
            'transactionsDebitSum' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $currencyTable = \app\models\Currency::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        new \yii\db\Expression("SUM($transactionsTable.sum) AS `total`"), 
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->where(["$transactionsTable.manager_id" => $this->id])
                    ->andWhere(['>', "$transactionsTable.sum", 0])
                    ->andWhere(["$transactionsTable.status" => 1])
                    //->andWhere(['not', ["$transactionsTable.accepted" => null]])
                    ->groupBy("$transactionsTable.currency_id")
                    ->asArray()
                    ->all();
            },
            'transactionsCreditSum' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $currencyTable = \app\models\Currency::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        new \yii\db\Expression("SUM($transactionsTable.sum) AS `total`"), 
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->where(["$transactionsTable.manager_id" => $this->id])
                    ->andWhere(['<', "$transactionsTable.sum", 0])
                    ->andWhere(["$transactionsTable.status" => 1])
                    //->andWhere(['not', ["$transactionsTable.accepted" => null]])
                    ->groupBy("$transactionsTable.currency_id")
                    ->asArray()
                    ->all();
            },
            'transactionsTotalSum' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $currencyTable = \app\models\Currency::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        new \yii\db\Expression("SUM($transactionsTable.sum) AS `total`"), 
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->where(["$transactionsTable.manager_id" => $this->id])
                    ->andWhere(["$transactionsTable.status" => 1])
                    //->andWhere(['not', ["$transactionsTable.accepted" => null]])
                    ->groupBy("$transactionsTable.currency_id")
                    ->asArray()
                    ->all();
            },
            'assetsTotalCount' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $currencyTable = \app\models\Currency::tableName();
                $accountTable = \app\models\Account::tableName();
                $userTable = \app\models\User::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        new \yii\db\Expression("COUNT(*) AS `count`"),
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->leftJoin($accountTable, "$accountTable.id = $transactionsTable.account_id")
                    ->leftJoin($userTable, "$userTable.id = $accountTable.user_id")
                    ->where(["$userTable.manager_id" => $this->id])
                    ->andWhere(["$transactionsTable.transaction_type_id" => 7])
                    ->andWhere(["$transactionsTable.status" => 1])
                    ->groupBy("$transactionsTable.currency_id")
                    ->asArray()
                    ->all();
            },
            'assetsTotalSum' => function () {
                $transactionsTable = \app\models\Transaction::tableName();
                $currencyTable = \app\models\Currency::tableName();
                $accountTable = \app\models\Account::tableName();
                $userTable = \app\models\User::tableName();
                return \app\models\Transaction::find()
                    ->select([
                        new \yii\db\Expression("SUM($transactionsTable.sum) AS `total`"), 
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $transactionsTable.currency_id")
                    ->leftJoin($accountTable, "$accountTable.id = $transactionsTable.account_id")
                    ->leftJoin($userTable, "$userTable.id = $accountTable.user_id")
                    ->where(["$userTable.manager_id" => $this->id])
                    ->andWhere(["$transactionsTable.transaction_type_id" => 7])
                    ->andWhere(["$transactionsTable.status" => 1])
                    ->groupBy("$transactionsTable.currency_id")
                    ->asArray()
                    ->all();
            },
        ]);
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function extraFields()
    {
        return [
            'accounts', 
            'manager',
            'language',
            'messagesIn',
            'messagesOut',
            'userCategories',
            'userDocuments',
            'userPhotos',
            'managerTransactions'
        ];
    }

    /**
     * Gets query for [[Accounts]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAccounts()
    {
        return $this->hasMany(Account::className(), ['user_id' => 'id']);
    }

    /** 
    * Gets query for [[Manager]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getManager() 
    { 
        return $this->hasOne(User::className(), ['id' => 'manager_id']); 
    }

    /**
    * Gets query for [[Language]].
    *
    * @return \yii\db\ActiveQuery
    */
   public function getLanguage()
   {
       return $this->hasOne(Language::className(), ['id' => 'language_id']);
   }

    /**
     * Gets query for [[MessagesOut]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMessagesOut()
    {
        return $this->hasMany(Message::className(), ['sender_id' => 'id']);
    }

    /**
     * Gets query for [[MessagesIn]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMessagesIn()
    {
        return $this->hasMany(Message::className(), ['receiver_id' => 'id']);
    }

    /**
     * Gets query for [[UserStatus]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserStatus()
    {
        return $this->hasOne(Status::className(), ['id' => 'status_id']);
    }

    /**
     * Gets query for [[UserAssets]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserAssets()
    {
        return $this->hasMany(UserAsset::className(), ['user_id' => 'id']);
    }

    /**
     * Gets query for [[UserCategories]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserCategories()
    {
        return $this->hasMany(Category::className(), ['id' => 'category_id'])->viaTable('user_category', ['user_id' => 'id']);
    }

    /**
     * Gets query for [[UserDocuments]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserDocuments()
    {
        return $this->hasMany(File::className(), ['id' => 'file_id'])->viaTable('user_document', ['user_id' => 'id']);
    }

    /**
     * Gets query for [[UserPhotos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserPhotos()
    {
        return $this->hasMany(File::className(), ['id' => 'file_id'])->viaTable('user_photo', ['user_id' => 'id']);
    }

    /** 
    * Gets query for [[ManagerTransactions]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getManagerTransactions() 
    { 
        return $this->hasMany(Transaction::className(), ['manager_id' => 'id']); 
    }

    /**
    * Gets query for [[UserVisits]].
    *
    * @return \yii\db\ActiveQuery
    */
    public function getUserVisits()
    {
        return $this->hasMany(UserVisit::className(), ['user_id' => 'id']);
    }

    /**
     * Search by query params for [[User]].
     *
     * @param Object $params
     * @return \yii\db\ActiveQuery
     */
    public function search($params)
    {
        $query = $this::find();
        
        foreach ($params as $param => $value) {
            foreach(explode(' ', $value) as $key => $searchString) {
                $query->orFilterWhere([
                    'like', $param, $searchString
                ]);
            }
        }

        $activeData = new \yii\data\ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'defaultPageSize' => 20,
                'pageSizeLimit' => [0, 20],
            ],
        ]);
        
        return $activeData;
    }
}

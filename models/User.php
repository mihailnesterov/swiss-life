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
 * @property string $email Email
 * @property string $password Пароль
 * @property string|null $auth_key Authentication Key
 * @property string|null $token Токен 
 * @property string $firstName Имя
 * @property string $lastName Фамилия
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
 * @property Message[] $messages
 * @property UserStatus $userStatus
 * @property UserAsset[] $userAssets
 * @property UserCategory[] $userCategories
 * @property UserDocument[] $userDocuments
 * @property UserPhoto[] $userPhotos
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
            [['email', 'password', 'firstName'], 'required'],
            [['manager_id', 'status_id', 'parent_id'], 'integer'],
            [['status', 'verified', 'representive'], 'boolean'],
            [['created'], 'safe'],
            [['email', 'password', 'firstName', 'lastName', 'phone'], 'string', 'max' => 100],
            [['auth_key', 'address'], 'string', 'max' => 255],
            [['token'], 'string', 'max' => 50],
            [['role'], 'string', 'max' => 20],
            [['email'], 'unique'],
            [['manager_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['manager_id' => 'id']], 
            [['status_id'], 'exist', 'skipOnError' => true, 'targetClass' => Status::className(), 'targetAttribute' => ['status_id' => 'id']],
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
            $fields['status_id'],
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
            'userAssetsTotal' => function () {
                $userAssetTable = \app\models\UserAsset::tableName();
                $currencyTable = \app\models\Currency::tableName();
                return \app\models\UserAsset::find()
                    ->select([
                        new \yii\db\Expression("SUM($userAssetTable.sum) AS `total`"), 
                        "$currencyTable.sign", 
                        "$currencyTable.shortName as currency"
                    ])
                    ->leftJoin($currencyTable, "$currencyTable.id = $userAssetTable.currency_id")
                    ->where(["$userAssetTable.user_id" => $this->id])
                    ->groupBy("$userAssetTable.currency_id")
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
            'transactionsDebetSum' => function () {
                return \app\models\Transaction::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['>', 'sum', 0])
                    ->andWhere(['status' => 1])
                    ->andWhere(['not', ['accepted' => null]])
                    ->sum('sum');
            },
            'transactionsCreditSum' => function () {
                return \app\models\Transaction::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['<', 'sum', 0])
                    ->andWhere(['status' => 1])
                    ->andWhere(['not', ['accepted' => null]])
                    ->sum('sum');
            },
            'transactionsTotalSum' => function () {
                return \app\models\Transaction::find()
                    ->where(['manager_id' => $this->id])
                    ->andWhere(['status' => 1])
                    ->andWhere(['not', ['accepted' => null]])
                    ->sum('sum');
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
            'messagesIn',
            'messagesOut',
            'userAssets', 
            'userCategories',
            'userDocuments',
            'userPhotos'
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
     * Search by query params for [[User]].
     *
     * @param Object $params
     * @return \yii\db\ActiveQuery
     */
    public function search($params)
    {
        $query = $this::find();
        
        foreach ($params as $param => $value) {
            $query->orFilterWhere([
                'like', $param, $value
            ]);
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

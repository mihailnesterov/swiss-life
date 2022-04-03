<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;
use app\models\User;

class UserController extends BaseApiController
{
    public $modelClass = 'app\models\User';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'users'
    ];

    public function actions()
    {
        $actions = parent::actions();
        
        $actions['index']['prepareDataProvider'] = [$this, 'prepareBaseApiDataProvider'];
        
        return $actions;
    }

    public function actionToken()
    {
        return Yii::$app->user->identity->token;
    }

    public function actionAuthorized()
    {
        return $this->modelClass::find()->where(['id' => Yii::$app->user->identity->id])->one();
    }

    public function actionMembers($id)
    {
        return $this->modelClass::find()->where(['parent_id' => $id])->all();
    }

    public function actionAuthorized_manager()
    {
        return new \yii\data\ActiveDataProvider([
            'query' => $this->modelClass::find()
                ->orderBy(['created' => SORT_DESC])
                ->where(['manager_id' => Yii::$app->user->identity->id]),
            'pagination' => $this->pagination,
        ]);
    }

    public function actionCategories()
    {        
        $userCategoryTable = \app\models\UserCategory::tableName();
        $categoryTable = \app\models\Category::tableName();
        
        return array_merge(
            [
                [
                    "name" => "Все",
                    "description" => "Все клиенты"
                ]
            ],
            \app\models\UserCategory::find()
            ->select([
                "$categoryTable.name",
                "$categoryTable.description",
            ])
            ->leftJoin($categoryTable, "$categoryTable.id = $userCategoryTable.category_id")
            ->groupBy("$categoryTable.id")
            ->asArray()
            ->all()
        );
    }

    public function actionChange_password($id)
    {
        $newPassword = Yii::$app->request->post('password');

        if( !empty($newPassword) ) {
            
            $user = $this->findUserModel($id);           
            $user->password = Yii::$app->security->generatePasswordHash($newPassword);

            if ( Yii::$app->security->validatePassword($newPassword, $user->password) ) {
                $user->auth_key = Yii::$app->security->generateRandomString($lenght = 255);
                $user->token = Yii::$app->security->generateRandomString($lenght = 20);
                $user->save();
                return [
                    'id' => $user->id,
                    'email' => $user->email,
                    'firstName' => $user->firstName,
                    'hash' => $user->password,
                    'password' => $newPassword
                ];
            } else {
                throw new \yii\base\ErrorException('Пароль не прошел валидацию.');
            }

        } else {
            throw new \yii\base\ErrorException('Пароль пуст.');
        }
    }

    public function actionUpdate_photo()
    {
        if( Yii::$app->request->getBodyParams() ) {
            
            $user_id = Yii::$app->request->getBodyParam('user_id');
            $file_id = Yii::$app->request->getBodyParam('file_id');

            if(!empty($user_id) && !empty($file_id)) {
                
                $userPhoto = \app\models\UserPhoto::find()->where(['user_id' => $user_id])->one();
                
                if(!empty($userPhoto)) {
                    $userPhoto->file_id = $file_id;
                    $userPhoto->save();
                } else {
                    $model = new \app\models\UserPhoto();
                    $model->user_id = $user_id;
                    $model->file_id = $file_id;
                    $model->save();
                }
            }
        }
    }

    private function findUserModel($id)
    {
        if (($model = \app\models\User::findOne($id)) !== null) {
            return $model;
        }

        throw new \yii\web\NotFoundHttpException("Пользователь с id=$id не найден.");
    }

}

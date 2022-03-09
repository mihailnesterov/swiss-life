<?php
    use yii\helpers\Html;
    use app\assets\AppAsset;
    
    $directoryAsset = Yii::$app->assetManager->getPublishedUrl('zgrboard/web');
    $this->beginPage();
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">

        <base href="<?= Yii::$app->homeUrl ?>">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?= Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?> | <?= Html::encode(Yii::$app->name) ?></title>
        
        <?php $this->head(); ?>
        
        <?= $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'href' => $directoryAsset . 'favicon.ico']) ?>
        
        <?php            
            AppAsset::register($this);
        ?>
        
    </head>
    <body>
        <?php $this->beginBody(); ?>
        
        <div id="login-wrapper" style="margin-top:8%;">

             <?= $content ?>               

        </div> 	<!-- end wrapper-->

        
        <?php $this->endBody(); ?>
        
    </body>
</html>
<?php $this->endPage(); ?>
<?php
    use yii\helpers\Html;
    use app\assets\InvestorAsset;
    
    $directoryAsset = Yii::$app->assetManager->getPublishedUrl(Yii::$app->homeUrl.'web');   
    
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
        
        <?php InvestorAsset::register($this); ?>
        
    </head>
    <body>
        <?php $this->beginBody(); ?>
            <?= $content ?>
        <?php $this->endBody(); ?>
    </body>
</html>
<?php $this->endPage(); ?>

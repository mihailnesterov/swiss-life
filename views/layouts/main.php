<?php
	use yii\helpers\Html;
	use yii\helpers\Url;
    use app\assets\AppAsset;
    
    $directoryAsset = Yii::$app->assetManager->getPublishedUrl(Yii::$app->homeUrl.'web');

    /*$company = Yii::$app->controller->getCompany('company');
    $services = Yii::$app->controller->getServices('services');
    $complexes = Yii::$app->controller->getComplexes('complexes');
    $footerServices = Yii::$app->controller->getFooterServices('footerServices');
    $footerComplexes = Yii::$app->controller->getFooterComplexes('footerComplexes');
    $metrika = Yii::$app->controller->getYandexMetrika('metrika');*/
    
    $this->beginPage();
?>

<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="<?= Yii::$app->request->url ?>" />
        <meta property="og:title" content="<?= $this->title ?> | <?= Yii::$app->name ?>" />
        <meta property="og:description" content="<?= $this->title ?>" />
        <meta property="og:image" content="<?= Yii::$app->homeUrl ?>web/images/logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="<?= $this->title ?> | <?= Yii::$app->name ?>" />
        <meta name="twitter:image:src" content="<?= Yii::$app->homeUrl ?>web/images/logo.png" />
        <meta name="twitter:description" content="<?= $this->title ?>" />
        <link rel="image_src" href="<?= Yii::$app->homeUrl ?>web/images/logo.png" />

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
        
        <div class="wrapper">
		
			<?= $content ?>

		</div>
	

        <?php $this->endBody(); ?>
    </body>
</html>
<?php $this->endPage(); ?>

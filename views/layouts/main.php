<?php
	use yii\helpers\{Html, Url};
    use app\assets\AppAsset;
    
    //$directoryAsset = Yii::$app->assetManager->getPublishedUrl(Yii::$app->homeUrl.'web');
    if( null !== Yii::$app->request->get('lang') ) {
        Yii::$app->language = Yii::$app->request->get('lang');
    }
    
    $this->beginPage();
?>

<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <?= Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?> | <?= Html::encode(Yii::$app->name) ?></title>
        
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

        <meta name="robots" content="index,follow,noodp">
        <meta name="googlebot" content="index,follow">

        <!--<meta name="google-site-verification" content="verification_token">
        <meta name="yandex-verification" content="verification_token" />-->

        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="viewport" content="ya-title=#4e69a2,ya-dock=fade">

        <?= $this->registerLinkTag(['rel' => 'apple-touch-icon', 'sizes' => '76x76', 'href' => 'favicon/apple-touch-icon.png']) ?>
        <?= $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'sizes' => '32x32', 'href' => 'favicon/favicon-32x32.png']) ?>
        <?= $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'sizes' => '16x16', 'href' => 'favicon/favicon-16x16.png']) ?>
        <?= $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'sizes' => '150x150', 'href' => 'favicon/mstile-150x150.png']) ?>
        <?= $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'sizes' => '192x192', 'href' => 'favicon/android-chrome-192x192.png']) ?>
        <?= $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'sizes' => '256x256', 'href' => 'favicon/android-chrome-256x256.png']) ?>
        <?= $this->registerLinkTag(['rel' => 'manifest', 'href' => 'favicon/site.webmanifest']) ?>
        <?= $this->registerLinkTag(['rel' => 'mask-icon', 'color' => '#5bbad5', 'href' => 'favicon/safari-pinned-tab.svg']) ?>
        <?= $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'href' => 'favicon/favicon.ico']) ?>
       
        <?php $this->head(); ?>
        
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-TileImage" content="/mstile-150x150.png">
        <meta name="theme-color" content="#ffffff">
        
        <?php AppAsset::register($this); ?>
        
    </head>
    <body>
        <?php $this->beginBody(); ?>
        <div class="wrapper">
            <header class="header">
                <div class="container">
                    <?= \app\widgets\Header::widget() ?>
                </div>
            </header>
            <div class="content">
                <?= $content ?>
            </div>
            <footer class="footer">
                <div class="container">
                    <?= \app\widgets\Footer::widget() ?>
                </div>
            </footer>
        </div>
        <?php $this->endBody(); ?>
    </body>
</html>
<?php $this->endPage(); ?>

<?php
use yii\helpers\Html;

/* @var $this \yii\web\View view component instance */
/* @var $message \yii\mail\MessageInterface the message being composed */
/* @var $content string main view render result */

$this->title = \Yii::$app->name;

?>

<?php $this->beginPage() ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=<?= \Yii::$app->charset ?>" />
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <style>
        body {
            background-color: #eee;
            font-family: Helvetica, Verdana, Arial, sans-serif;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.6;
        }
        h1,h2,h3 {
            color: #A48962;
        }
        .wrapper {
            background-color: #fff;
            margin: 0 auto;
            max-width: 600px;
            border: 2px #222836 solid;
            padding: 0;
        }
        .header,
        .footer {
            background-color: #222836;
            padding: 10px 16px;
        }
        .header {
            text-align: center;
        }
        .content {
            padding: 16px;
            color: #222836;
            line-height: 1.6;
        }
        .content p {
            color: #222836;
        }
        .content a {
            color: #555099;
            text-decoration: underline;
        }
        .copyright {
            text-align: center;
        }
        .copyright a {
            color: #A48962;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <?php $this->beginBody() ?>

    <div class="wrapper">
        <div class="header">
            <h3><?= \Yii::$app->name ?></h3>
        </div>
        <div class="content">
            <?= $content ?>
        </div>

        <div class="footer">
            <p class="copyright">
                <a href="<?= \Yii::$app->params['url'] ?>" target="_blank">
                    <?= \Yii::$app->name ?>
                </a>
            </p>
        </div>
    </div>
    
    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
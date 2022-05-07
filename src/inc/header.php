<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="src/inc/global-style/style.css">
    <link rel="stylesheet" type="text/css" href="src/inc/style.css">
    <link rel="icon" href="src/inc/global-style/logo_icon.jpg">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title><?= $head_title ?? 'Drank kaarten' ?></title>
</head>
<body>
    <div class ="flex-wrapper">
        <div class = "header_margin">
            <div class ="header">
                <div class= "navbar">
                    <div class="logo_nav">
                        <img src="src/inc/global-style/logo.jpg" width= "150px" height = "150px" alt="logo">
                    </div>
                    <div style="width: 33.333333333%"> </div>
                    <div style="width: 33.333333333%">
                        <?= $body_title ?? 'Drank kaarten' ?>
                    </div>
                    <div style="width: 33.333333333%">
                        <u>
                            <li><a href="http://ceniproductions.be/">Home</a></li>
                            <li><a href="http://ceniproductions.be/servercheck.php"> Dashboard</a></li>
                        </u>
                    </div>
                </div>
            </div>
        </div>

        <main class="page-main">
            <?php flash() ?>
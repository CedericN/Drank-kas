<?php
    require __DIR__ . '/../src/bootstrap.php';

    require_login();
?>

<?php view('header', ['head_title' => 'kaarten', 'body_title' => 'Drank kaarten leden']); ?>
<p>Welkom <?= current_user()?> (<?= current_user(true)?>) <br><a href="logout.php"> Uitloggen</a></p>
<?php view('footer'); ?>

<?php

    require __DIR__ . '/../src/bootstrap.php';

    if(is_get_request()){
        $inputs = [];
        $errors = [];

        if(got_activation_code()){
            $inputs['activation_code'] = $_SESSION['activation_code'];
        }
        else{
            $fields = [
                'activation_code' => 'string | required'
            ];

            [$inputs, $errors] = filter($_GET, $fields);
        }

        if(!$errors){
            if(!is_user_logged_in()){
                redirect_with_message_and_items('login.php', 'Gelieven in te loggen om uw account te activeren', ['activation_code' => $inputs['activation_code']], FLASH_WARNING);
            }

            $user = find_unverified_user($_SESSION['user_email'], $inputs['activation_code']);

            if($user && activate_user($user['id'])){
                redirect_with_message('index.php', 'Uw account is succesvol geactiveerd');
            }
        }
    }
?>
<?php view('header', ['head_title' => 'kaarten', 'body_title' => 'Drank kaarten leden']); ?>
<p>Welkom <?= current_user()?> (<?= current_user(true)?>) gelieve uw account te activeren<br><a href="logout.php"> Uitloggen</a></p>
<?php view('footer'); ?>

<?php

    require __DIR__ . '/../src/bootstrap.php';

    if (is_user_logged_in()) {
        redirect_to('index.php');
    }

    $errors = [];
    $inputs = [];

	if(is_post_request()) {
        //registration fields
        $fields = [
            'de_gebruikersnaam' => 'string | required | alphanumeric | between: 3, 32 | unique: users, username',
            'het_e-mailadres' => 'email | required | email | unique: users, email',
            'het_wachtwoord' => 'string | required | secure',
            'herhaal_wachtwoord' => 'string | required | same: het_wachtwoord',
            'gebruiksvoorwaarden' => 'string | required'
        ];

        //custom error messages
        $messages = [
            'het e-mailadres' =>[
                'unique' => 'dit e-mailadres is al in gebruik'
            ],
            'herhaal wachtwoord' => [
                'required' => 'gelieve u wachtwoord opnieuw in te geven',
                'same' => 'het wachtwoord komt niet overeen'
            ],
            'gebruiksvoorwaarden' => [
                'required' => 'u moet de gebruiksvoorwaarden accepteren'
            ]
        ];

        [$inputs, $errors] = filter($_POST, $fields, $messages);

        if ($errors){
            redirect_with('register.php', ['inputs' => $inputs, 'errors' => $errors]);
        }

        $activation_code = generate_activation_code();

        if(register_user($inputs['het_e-mailadres'], $inputs['de_gebruikersnaam'], $inputs['het_wachtwoord'], $activation_code)){
            send_activation_email($inputs['het_e-mailadres'], $activation_code);

            redirect_with_message('login.php', 'uw account is succesvol aangemaakt gelieve uw mail te checken om u account te activeren');
        }
    }
    else if (is_get_request()){
        [$inputs, $errors] = session_flash('inputs', 'errors');
    }
?>

<?php view('header', ['head_title' => 'registreren', 'body_title' => 'Drank kaarten register']) ?>

    <div class="account_form_wrapper">
        <form action="register.php" method="post">
            <h1> Account aanmaken </h1>
            <div>
                <label for="de gebruikersnaam">Gebruikersnaam: </label>
                <input type="text" name="de_gebruikersnaam" id="de_gebruikersnaam" value="<?= $inputs['de_gebruikersnaam'] ?? '' ?>" class="<?= error_class($errors, 'de_gebruikersnaam') ?>">
                <small><?= $errors['de_gebruikersnaam'] ?? ''?></small>
            </div>

            <div>
                <label for="het e-mailadres">Email: </label>
                <input type="text" name="het_e-mailadres" id="het_e-mailadres" value="<?= $inputs['het_e-mailadres'] ?? '' ?>" class="<?= error_class($errors, 'het_e-mailadres') ?>">
                <small><?= $errors['het_e-mailadres'] ?? ''?></small>
            </div>

            <div>
                <label for="het wachtwoord">Wachtwoord: </label>
                <input type="password" name="het_wachtwoord" id="het_wachtwoord" value="<?= $inputs['het_wachtwoord'] ?? '' ?>" class="<?= error_class($errors, 'het_wachtwoord') ?>">
                <small><?= $errors['het_wachtwoord'] ?? ''?></small>
            </div>

            <div>
                <label for="herhaal wachtwoord">Herhaal wachtwoord: </label>
                <input type="password" name="herhaal_wachtwoord" id="herhaal_wachtwoord" value="<?= $inputs['herhaal_wachtwoord'] ?? '' ?>" class="<?= error_class($errors, 'herhaal_wachtwoord') ?>">
                <small><?= $errors['herhaal_wachtwoord'] ?? ''?></small>
            </div>

            <div>
                <label for="gebruiksvoorwaarden">
                    <input type="checkbox" name="gebruiksvoorwaarden" id="gebruiksvoorwaarden" value="checked" <?= $inputs['gebruiksvoorwaarden'] ?? '' ?>/>
                    Ik accepteer de <a href="#" title="gebruiksvoorwaarden">gebruiksvoorwaarden</a>
                </label>
                <small><?= $errors['gebruiksvoorwaarden'] ?? ''?></small>
            </div>

            <div>
                <input type="submit" class="btn btn-primary account_form_btn" value="Aanmaken">
                <input type="reset" class="btn btn-secondary account_form_btn" value="Resetten">
            </div>
            <p>Heb je al een account? <a href="login.php">Login hier</a></p>
        </form>
    </div>

<?php view('footer') ?>

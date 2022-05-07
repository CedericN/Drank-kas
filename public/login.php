<?php
    require __DIR__ . '/../src/bootstrap.php';

    if (is_user_logged_in()) {
        redirect_to('index.php');
    }

    $inputs = [];
    $errors = [];

    if(is_post_request()){
        $fields = [
            'de_gebruikersnaam' => 'string | required',
            'het_wachtwoord' => 'string | required',
            'aangemeld_blijven' => 'string'
        ];

        [$inputs, $errors] = filter($_POST, $fields);

        if ($errors){
            redirect_with('login.php', ['errors' => $errors, 'inputs' => $inputs]);
        }

        if(!login($inputs['de_gebruikersnaam'], $inputs['het_wachtwoord'], isset($inputs['aangemeld_blijven']))){
            $errors['login'] = 'ongeldige gebruikersnaam of wachtwoord';

            redirect_with('login.php', ['errors' => $errors, 'inputs' => $inputs]);
        }

        redirect_to( is_user_active() ? 'index.php' : 'activate.php');
    }
    else if(is_get_request()){
        [$errors, $inputs] = session_flash('errors', 'inputs');
    }
?>

<?php view('header', ['head_title' => 'inloggen', 'body_title' => 'Drank kaarten inloggen']); ?>

    <?php if (isset($errors['login'])) : ?>
    <div class="alert alert-error">
        <?= $errors['login'] ?>
    </div>
    <?php endif ?>

    <div class="account_form_wrapper">

        <form action="login.php" method="post">
            <h1>Inloggen</h1>
            <div>
                <label for="de_gebruikersnaam">Gebruikersnaam: </label>
                <input type="text" name="de_gebruikersnaam" id="de_gebruikersnaam" value="<?= $inputs['de_gebruikersnaam'] ?? '' ?>">
                <small><?= $errors['de_gebruikersnaam'] ?? ''?></small>
            </div>

            <div>
                <label for="het_wachtwoord">Wachtwoord: </label>
                <input type="password" name="het_wachtwoord" id="het_wachtwoord">
                <small><?= $errors['het_wachtwoord'] ?? ''?></small>
            </div>

            <div>
                <label for="aangemeld_blijven">
                    <input type="checkbox" name="aangemeld_blijven" id="aangemeld_blijven"
                           value="checked" <?= $inputs['aangemeld_blijven'] ?? '' ?> />
                    Aangemeld blijven?
                </label>
            </div>

            <div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%">
                <input type="submit" class="btn btn-primary account_form_btn" value="Inloggen">
                <a href="register.php">Registreren</a>
            </div>
        </form>
    </div>

<?php view('footer'); ?>
<?php

//    register new users
    function register_user(string $email, string $username, string $password, string $activation_code, int $expiry = 1 * 24 * 60 * 60,  bool $is_admin = false): bool{
        $sql = 'insert into users(username, email, password, is_admin, activation_code, activation_expiry)
                values(:username, :email, :password, :is_admin, :activation_code, :activation_expiry)';

        $statement = db()->prepare($sql);

        $statement->bindValue(':username', $username);
        $statement->bindValue(':email', $email);
        $statement->bindValue(':password', password_hash($password, PASSWORD_BCRYPT));
        $statement->bindValue(':is_admin', (int)$is_admin, PDO::PARAM_INT);
        $statement->bindValue(':activation_code', password_hash($activation_code, PASSWORD_DEFAULT));
        $statement->bindValue(':activation_expiry', date('Y-m-d H:i:s', time() + $expiry));

        return $statement->execute();
    }

//    log-in/-out
    function log_user_in($user): bool{
        session_regenerate_id(); //prevent session fixation attacks

        $_SESSION['username'] = $user['username'];
        $_SESSION['user_id'] = $user['ID'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_active'] = $user['active'];

        return true;
    }

    function login(string $username, string $password, bool $remember = false): bool{
        $user = find_user_by_username($username);

        if($user && password_verify($password, $user['password'])){

            log_user_in($user);

            if($remember){
                remember_me($user['ID']);
            }

            return true;
        }
        return false;
    }

    function is_user_logged_in(): bool
    {
        if(isset($_SESSION['username'])){
            return true;
        }

        $token = filter_input(INPUT_COOKIE, 'im_lazy', FILTER_UNSAFE_RAW);

        if($token && token_is_valid($token)){
            $user = find_user_by_token($token);
            if($user){
                return log_user_in($user);
            }
        }

        return false;
    }

    function require_login(): void{
        if(!is_user_logged_in()){
            redirect_with_message('login.php', 'Gelieven in te loggen om deze pagina te zien',FLASH_WARNING);
        }
    }

    function logout(): void{
        if(is_user_logged_in()){
            delete_user_token($_SESSION['user_id']);

            unset($_SESSION['user_id'], $_SESSION['username'], $_SESSION['user_email'], $_SESSION['user_active']);

            if(isset($_COOKIE['im_lazy'])){
                unset($_COOKIE['im_lazy']);
                setcookie('im_lazy', null, -1);
            }

            session_destroy();

            redirect_with_message('login.php', 'succesvol uitgelogd');
        }
    }

    function current_user(bool $id = false){
        if (is_user_logged_in()){
            return $id ? $_SESSION['user_id'] : $_SESSION['username'];
        }
        return null;
    }

    function is_user_active(): bool
    {
        return (int)$_SESSION['user_active'] === 1;
    }

    function find_user_by_username(string $username){
        $sql = 'select ID, username, password, active, email from users where username=:username';

        $statement = db()->prepare($sql);
        $statement->bindValue(':username', $username);
        $statement->execute();

        return $statement->fetch(PDO::FETCH_ASSOC);
    }

//    email verification
    function got_activation_code(): bool{
        return isset($_SESSION['activation_code']);
    }

    function generate_activation_code(): ?string{
        try {
            return bin2hex(random_bytes(32));
        } catch (Exception $e) {
            return NULL;
        }
    }

    function send_activation_email(string $email, string$activation_code): void{
        $activation_link = APP_URL . "/activate.php?activation_code=$activation_code";

        $subject = 'Drank kaarten, bevestig u account';
        $message = <<<MESSAGE
                    <h1>Welkom bij Drank kaarten. </h1>
                    <p>Jouw account is bijna klaar. Je moet alleen nog u e-mailadres bevestigen.</p>
                    <p class="warning">als je u niet hebt aangemeld bij <a href="https://localhost/drank">Drank kaarten</a> gelieve deze mail te negeren</p>
                    <a href="$activation_link">Bevestig e-mailadres</a>
                    MESSAGE;
        $header = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf8\r\n" . "From:" . SENDER_EMAIL_ADDRESS;

        mail($email, $subject, $message, $header);
    }

    function find_unverified_user(string $email, string $activation_code){
        $sql = 'select id, activation_code, activation_expiry < now() as expired from users where active = 0 and email=:email';

        $statment = db()->prepare($sql);

        $statment->bindValue(':email', $email);
        $statment->execute();

        $user = $statment->fetch(PDO::FETCH_ASSOC);
        if($user){
            if((int)$user['expired'] === 1){
                $errors['activate'] = 'activatie code is vervallen';
                redirect_with('login.php', ['errors' => $errors]);
            }
            if(password_verify($activation_code, $user['activation_code'])){
                return $user;
            }
        }

        return null;
    }

    function activate_user(int $user_id): bool{
        $sql = 'update users set active = 1, activated_at = CURRENT_TIMESTAMP where id=:id';

        $statement = db()->prepare($sql);
        $statement->bindValue(':id', $user_id, PDO::PARAM_INT);

        return $statement->execute();
    }

//    delete users
    function delete_user_by_id(int $id, int $active = 0): bool
    {
        $sql = 'delete from users where id =:id and active=:active';

        $statement = db()->prepare($sql);
        $statement->bindValue(':id', $id, PDO::PARAM_INT);
        $statement->bindValue(':active', $active, PDO::PARAM_INT);

        return $statement->execute();
    }

//    keep logged in functions
    function remember_me(int $user_id, int $day = 30): void{
        [$selector, $validator, $token] = generate_token();

        delete_user_token($user_id);

        $expired_seconds = time() + 60 * 60 * 24 * $day;
        $expiry = date('Y-m-d H:i:s', $expired_seconds);

        if(insert_user_token($user_id, $selector, $validator, $expiry)){
            setcookie('im_lazy', $token, $expired_seconds, "", "",false, true);
        }
    }
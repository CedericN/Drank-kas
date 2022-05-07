<?php

use JetBrains\PhpStorm\NoReturn;

    function view(string $filename, array $data = []): void{
        foreach ($data as $key => $value) {
            $$key = $value;
        }

        require_once __DIR__ . '/../inc/' .$filename . '.php';
    }

    function is_post_request(): bool{
        return strtoupper($_SERVER['REQUEST_METHOD']) === 'POST';
    }

    function is_get_request(): bool{
        return strtoupper($_SERVER['REQUEST_METHOD']) === 'GET';
    }

    function error_class(array $errors, string $field): string{
        return isset($errors[$field]) ? 'error' : '';
    }

    #[NoReturn] function redirect_to(string $url): void{
        header('Location:' . $url);
        exit;
    }

    #[NoReturn] function redirect_with(string $url, array $items): void{
        foreach ($items as $key => $value) {
            $_SESSION[$key] = $value;
        }

        redirect_to($url);
    }

    #[NoReturn] function redirect_with_message(string $url, string $message, string $type = FLASH_SUCCESS): void{
        flash('flash_' . uniqid(), $message, $type);
        redirect_to($url);
    }

    #[NoReturn] function redirect_with_message_and_items(string $url, string $message, array $items, string $type = FLASH_SUCCESS): void{
        foreach ($items as $key => $value) {
            $_SESSION[$key] = $value;
        }
        flash('flash_' . uniqid(), $message, $type);
        redirect_to($url);
    }

    function session_flash(...$keys): array{
        $data = [];
        foreach ($keys as $key) {
            if(isset($_SESSION[$key])){
                $data[] = $_SESSION[$key];
                unset($_SESSION[$key]);
            }
            else{
                $data[] = [];
            }
        }
        return $data;
    }

    function db(): ?PDO{
        static $pdo;

        if(!$pdo) {
            $dsn = sprintf("mysql:host=%s;dbname=%s;charset=UTF8", DB_HOST, DB_NAME);

            try {
                $pdo = new PDO($dsn, DB_USER, DB_PASS);
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }

        return $pdo;
    }

    function browser_console($data): void{
        echo "<script>console.log('" . json_encode($data) . "');</script>";
    }

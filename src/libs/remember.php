<?php
    function generate_token(): ?array{
        try {
            $selector = bin2hex(random_bytes(16));
        } catch (Exception $e) {
            return null;
        }
        try {
            $validator = bin2hex(random_bytes(32));
        } catch (Exception $e) {
            return null;
        }
        return [$selector, password_hash($validator, PASSWORD_DEFAULT), $selector . ':' . $validator];
    }

    function parse_token(string $token): ?array{
        $parts = explode(':', $token);
        if($parts && count($parts) == 2){
            return [$parts[0], $parts[1]];
        }
        return null;
    }

    function insert_user_token(int $user_id, string $selector, string $validator, string $expiry): bool{
        $sql = 'insert into user_tokens(selector, validator, user_id, expiry) values(:selector, :validator, :user_id, :expiry)';

        $statement = db()->prepare($sql);
        $statement->bindValue(':user_id', $user_id);
        $statement->bindValue(':selector', $selector);
        $statement->bindValue(':validator', $validator);
        $statement->bindValue(':expiry', $expiry);

        return $statement->execute();
    }

    function find_user_token_by_selector(string $selector){
        $sql = 'select id, selector, validator, user_id, expiry from user_tokens where selector = :selector and expiry >= now() limit 1';

        $statement = db()->prepare($sql);
        $statement->bindValue(':selector', $selector);

        $statement->execute();

        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    function delete_user_token(int $user_id): bool{
        $sql = 'delete from user_tokens where user_id = :user_id';

        $statement = db()->prepare($sql);
        $statement->bindValue(':user_id', $user_id);

        return $statement->execute();
    }

    function find_user_by_token(string $token){
        $tokens = parse_token($token);

        if(!$tokens){
            return null;
        }

        $sql = 'select users.ID, users.username, users.active, users.email from users inner join user_tokens on user_id = users.ID where selector = :selector and expiry > now() limit 1';

        $statement = db()->prepare($sql);
        $statement->bindValue(':selector', $tokens[0]);

        $statement->execute();

        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    function token_is_valid(string $token): bool{
        [$selector, $validator] = parse_token($token);
        $tokens = find_user_token_by_selector($selector);
        if(!$tokens){
            return false;
        }
        return password_verify($validator, $tokens['validator']);
    }
<?php
//https://www.phptutorial.net/php-tutorial/php-validation/
    require_once __DIR__ . '/../../config/database.php';

    const DEFAULT_VALIDATION_ERRORS = [
        'required' => 'gelieve %s in te geven',
        'email' => 'dit is geen geldig e-mailadres',
        'min' => '%s moet minstens %s karakters hebben',
        'max' => '%s mag maximum %s karakters hebben',
        'between' => '%s moet tussen %d en %d karakters hebben',
        'same' => '%s moet overeenkomen met %s',
        'alphanumeric' => '%s mag alleen letters en nummer bevatten',
        'secure' => '%s moet tussen de 8 en 64 karakters hebben en minstens één nummer, één hoofdletter, één kleine letter en één speciaal karakter',
        'unique' => '%s bestaat al',
    ];

    function validate(array $data, array $fields, array $messages = []): array{
        $split = fn($str, $separator) => array_map('trim', explode($separator, $str));

        $rule_message = array_filter($messages, fn($messages) => is_string($messages));

        $validation_errors = array_merge(DEFAULT_VALIDATION_ERRORS, $rule_message);

        $errors = [];

        foreach ($fields as $field => $option){
            $rules = $split($option, '|');

            foreach ($rules as $rule){
                $params = [];
                if(strpos($rule, ':')){
                    [$rule_name, $param_str] = $split($rule, ':');
                    $params = $split($param_str, ',');
                }
                else{
                    $rule_name = trim($rule);
                }

                $fn = 'is_' . $rule_name;

                if(is_callable($fn)){
                    $pass = $fn($data, $field, ...$params);
                    if (!$pass){
                        $errors[$field] = str_replace('_', ' ', sprintf( $messages[$field][$rule_name] ?? $validation_errors[$rule_name], $field, ...$params));
                    }
                }
            }
        }

        return $errors;
    }

    function is_required(array $data, string $field): bool{
        return isset($data[$field]) && trim($data[$field] !== '');
    }

    function is_email(array $data, string $field): bool
    {
        if (empty($data[$field])) {
            return true;
        }

        return filter_var($data[$field], FILTER_VALIDATE_EMAIL);
    }

    function is_min(array $data, string $field, int $min): bool
    {
        if (!isset($data[$field])) {
            return true;
        }

        return mb_strlen($data[$field]) >= $min;
    }

    function is_max(array $data, string $field, int $max): bool
    {
        if (!isset($data[$field])) {
            return true;
        }

        return mb_strlen($data[$field]) <= $max;
    }

    function is_between(array $data, string $field, int $min, int $max): bool
    {
        if (!isset($data[$field])) {
            return true;
        }

        $len = mb_strlen($data[$field]);
        return $len >= $min && $len <= $max;
    }

    function is_alphanumeric(array $data, string $field): bool
    {
        if (!isset($data[$field])) {
            return true;
        }

        return ctype_alnum($data[$field]);
    }

    function is_same(array $data, string $field, string $other): bool
    {
        if (isset($data[$field], $data[$other])) {
            return $data[$field] === $data[$other];
        }

        if (!isset($data[$field]) && !isset($data[$other])) {
            return true;
        }

        return false;
    }

    function is_secure(array $data, string $field): bool
    {
        if (!isset($data[$field])) {
            return false;
        }

        $pattern = "#.*^(?=.{8,64})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$#";
        return preg_match($pattern, $data[$field]);
    }

    function is_unique(array $data, string $field, string $table, string $column): bool
    {
        if (!isset($data[$field])) {
            return true;
        }

        $sql = "SELECT $column FROM $table WHERE $column = :value";

        $stmt = db()->prepare($sql);
        $stmt->bindValue(":value", $data[$field]);

        $stmt->execute();

        return $stmt->fetchColumn() === false;
    }
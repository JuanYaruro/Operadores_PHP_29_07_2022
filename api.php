<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    $_DATA = ($_SERVER["REQUEST_METHOD"] == "POST") 
                ? json_decode(file_get_contents("php://input"), true)
                : (array) ["num1"=> 0 , "num2" => 0, "operador" => null];
    extract($_DATA);
    unset($_DATA);

    $res = match($operador){
        "suma" => (float)$num1 + (float)$num2,
        "resta" => (float)$num1 - (float)$num2,
        "multiplicacion" => (float)$num1 * (float)$num2,
        "divicion" =>  ((float)$num2 == 0) ? 0 : (float)$num1 / (float)$num2,
        default => 0
    };

    print_r(json_encode((object) [
        "Mensaje" => (string) "Realizar los operadores de la calculadora",
        "Servidor" => $_SERVER["HTTP_HOST"],
        "Operacion" => "el resultado de la $operador es: $res",
        "Resultado" => $res
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG))

?>
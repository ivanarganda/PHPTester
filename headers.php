<?php 

    require_once "parameters.php";

    require_once LOCAL_PATH . "/src/classes/autoload.php";

    $conexion = new Conexion();

    $con = $conexion->pdo;

    $commonMethods = new MetodosComunes( $con );

    set_error_handler(function($errno, $errstr, $errfile, $errline) use ($commonMethods) {

        if (0 === error_reporting()) {

            return false;

        }
        
        $commonMethods->procesarError($errno, $errstr, $errfile, $errline);

        return $errno;
    });

    register_shutdown_function(function() use ($commonMethods) { // manejo de errores fatales

        $error = error_get_last();

        if ( !empty( $error ) ){

            $errno   = $error["type"];

            $errfile = $error["file"];

            $errline = $error["line"];
            
            $errstr  = $error["message"];
            
            if ($errno == E_ERROR) { // error fatal: E_ERROR == 1

                $commonMethods->procesarError($errno, $errstr, $errfile, $errline);

            } 

        }

    });


?>
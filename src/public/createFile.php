<?php 

require_once '../../parameters.php';

$code = $_POST['code'];

$code = preg_replace('/^<\?php|\?>/','',$code);

file_put_contents( 
        $_POST['file'] , 
        '<?php 
            try {
            ' . $code . 
            '
            } catch ( Exception $e ){
                echo $e->getMessage() . " error "; 
            }
        ?>' 
);

echo '';

?>
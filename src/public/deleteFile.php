<?php 

require_once '../../parameters.php';

$file = $_POST['file'];
$path = URL_PHP_FILE;

if ( $file === 'buffer' ){

    $file = $_POST['idSession'] . '_*.txt';
    $path = URL_TXT_FILE;

}

exec( "rm -f filename " . $path . $file );

?>
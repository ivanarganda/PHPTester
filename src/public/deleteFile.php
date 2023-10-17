<?php 

require_once '../../parameters.php';
require_once LOCAL_PATH . '/src/classes/autoload.php';

$file = $_POST['file'];

$path = URL_PHP_FILE;

if ( $file === 'buffer' ){

    $session = new Session(false);

    $session->deleteBufferFiles();

} else {

    exec( "rm -f filename $path$file" );

}

?>
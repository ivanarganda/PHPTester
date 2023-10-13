<?php 

require_once '../../parameters.php';

exec( "rm -f filename " . URL_PHP_FILE . $_POST['file'] );

?>
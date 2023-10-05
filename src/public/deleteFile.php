<?php 

require_once '../../parameters.php';

exec( "rm -f filename " . LOCAL_PATH . '/localData/' . $_POST['file'] );

?>
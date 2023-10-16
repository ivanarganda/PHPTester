<?php 

require_once '../../parameters.php';

file_put_contents( LOCAL_PATH . '/filesTXT/' . $_POST['file'] , $_POST['buffer_data'] , FILE_APPEND );

?>
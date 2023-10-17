<?php 

require_once '../../parameters.php';

file_put_contents( URL_TXT_FILE . $_POST['file'] , $_POST['buffer_data'] , FILE_APPEND );

?>
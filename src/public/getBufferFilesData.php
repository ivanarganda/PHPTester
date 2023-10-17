<?php 
require_once '../../parameters.php';
require_once LOCAL_PATH . '/src/classes/autoload.php';

$files = scandir( URL_TXT_FILE );

echo json_encode( array_map( function($file){
    $matches = array();
    preg_match_all( REGEX_BUFFER_FILES , $file, $matches);
    return $matches[0];
} , $files ) );  


?>
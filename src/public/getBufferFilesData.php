<?php 
require_once '../../parameters.php';

$files = scandir( LOCAL_PATH . '/filesTXT/' );

echo json_encode( array_map( function($file){
    $matches = array();
    preg_match_all("/$_POST[sessionId]+_+([0-9_-]){1,}+([0-9:-]){1,}+(\.\w+)/", $file, $matches);
    return $matches[0];
} , $files ) );  


?>
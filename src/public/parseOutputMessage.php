<?php 

require_once '../../parameters.php';

$regexPath = '/(\/\w+)+([.a-z])+|\w+\s+([A-Z]:)+(\/\w+)+([.a-z])+(\s)+(\w+)+/i';

$response = $_POST['output'];

$response =  htmlspecialchars(str_replace( array("\n",'\\') , array('','/') , $response ));

$delimiter = preg_match_all( $regexPath , $response , $matches );

$delimiter = trim($matches[0][0]);

echo htmlspecialchars($delimiter , ENT_HTML5);

?>
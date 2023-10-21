<?php 

require_once 'parameters.php';

require_once LOCAL_PATH . '/src/classes/autoload.php';

$session = new Session;

$session->getSessionId();

require_once "ssl_checking.php";

?>
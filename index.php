<?php 

require_once 'parameters.php';

require_once LOCAL_PATH . '/src/classes/autoload.php';

$session = new Session;

if ( isset($_SESSION['id']) ){

    $session->getSessionId();

}

echo "<script>window.location='dashboard.php';</script>";

?>
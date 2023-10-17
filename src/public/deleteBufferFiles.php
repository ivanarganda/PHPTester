<?php 

require_once '../../parameters.php';
require_once LOCAL_PATH . '/src/classes/autoload.php';

try {

    $session = new Session(false);

    $session->deleteBufferFiles();

    echo json_encode( '' );

} catch ( Exception $e){

    echo json_encode( $e->getMessage() );

}

?>
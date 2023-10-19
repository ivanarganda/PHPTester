<?php 

require_once '../../parameters.php';
require_once LOCAL_PATH . '/src/classes/autoload.php';

$session = new Session( false );

try {

    $isReminded = $session->checkNoReminderSessionFile();

    if ( $isReminded ){
    
        file_put_contents( URL_TXT_FILE . $_POST['filename'] , '[session_data_recovery]' );

    }

    echo json_encode( $isReminded );

} catch ( Exception $e){

    echo json_encode( $e->getMessage() );

}


?>
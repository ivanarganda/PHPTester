<?php 

require_once '../../parameters.php';
require_once LOCAL_PATH . '/src/classes/autoload.php';

$session = new Session( false );

$isReminded = $session->checkNoReminderSessionFile();

$msg = 'existReminder';

if ( $isReminded ){
    
   $msg = 'NoExistReminder';

} 

echo json_encode( $msg );


?>
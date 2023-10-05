<?php 

require_once '../../parameters.php';

$msg = '';

$version = $_POST['version'];

$command = "update-alternatives --config php /usr/bin/$version";

// Execute the command
$output = exec($command);

if ( $output !== null ){

    $msg = 'ok';

} else {

    $msg = 'Failed to update PHP version';

}

echo json_encode( $msg );


?>
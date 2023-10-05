<?php

require_once "../../parameters.php";

$imagesSlider = scandir( LOCAL_PATH . '/assets/imgs/slider/' );

$imagesSlider = array_filter( $imagesSlider , function( $i ){  return $i != '.' && $i != '..';  });

echo json_encode( $imagesSlider );

?>
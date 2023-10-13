<?php 


function load_class( $classname ){

    include $classname . '.php';

}

spl_autoload_register( "load_class" );

?>
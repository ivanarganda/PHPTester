<?php 

$ssl = new SSL;

$hasHttps = $ssl->checkSSLActivation(); 

if ( !$hasHttps ){

    $hasHttps = 'http://';

}

$redirect = new Redirect;

$url_redirect = $redirect->__redirect( basename($_SERVER['PHP_SELF']));

 // var_dump($url_redirect);

if ( $url_redirect ){

    echo "<script>window.location='".$hasHttps . $url_redirect ."'</script>";

}



?>
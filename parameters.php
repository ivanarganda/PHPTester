<?php 

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');

$_SERVER['HTTPS'] = '';
$protocolWeb = $_SERVER['HTTPS'] ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? '';
$uri = $_SERVER['REQUEST_URI'] ?? '';

$serverPath = __DIR__;
$serverPath = str_replace( array("index.php") , array("") , $serverPath );
$cadServerPath = explode( '/' , $serverPath);

define( 'PROTOCOL_TCP' , $protocolWeb );
define( 'SERVER_PATH' , str_replace( $cadServerPath[count($cadServerPath)-1] , '' , $serverPath ) );
define( 'LOCAL_PATH' , $serverPath );
define( 'ROOT_PATH' , '/var/www/' );
define( 'HOST' , $protocolWeb . $host );
define( 'PROTOCOL_WEB_XML' , 'http://' . $host );
define( 'PROTOCOL_WEB' , $protocolWeb . $host );


$isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

// Get the protocol (http or https)
$protocol = $isHttps ? 'https://' : 'http://';

// Get the host name
$host = $_SERVER['HTTP_HOST'];

// Get the complete route (URL path)
$route = $_SERVER['REQUEST_URI'];

// Combine everything to get the complete URL
$completeUrl = $protocol . $host . $route;

$completeUrl = str_replace("dashboard.php" , "" , $completeUrl);

// Output the complete URL
define( 'URI' , $completeUrl);

$slashes = count( explode( '/' , $route ) ) - 1;

$route = $slashes != 1  ? str_replace( $route , '' , URI ) :  URI; 

define( 'URI_CONTENT_PAGE' , $route );

$url_php_file = LOCAL_PATH . '/filesPHP/';
$url_txt_file = LOCAL_PATH . '/filesTXT/';

$php_file = str_replace( LOCAL_PATH . '/' , '' , $url_php_file );
$txt_file = str_replace( LOCAL_PATH . '/' , '' , $url_txt_file );

define( 'URL_PHP_FILE' , $url_php_file );
define( 'URL_TXT_FILE' , $url_txt_file );

define( 'PHP_FILE' , $php_file );
define( 'TXT_FILE' , $txt_file );


?>
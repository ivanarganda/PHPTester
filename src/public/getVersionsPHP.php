<?php

require_once '../../parameters.php';

$regexReplaceAllExceptDigits = '/!?([a-z])|!?([a-z])(\S)/i';

// List versions
$files = shell_exec( 'dpkg -l | grep -E \'php[0-9]\.[0-9]\'' );

$versions = preg_match_all( '/([a-z])+\d+(.)+(\d)+(\-)+(\D)/i' , $files , $matches );

$matches[0] = array_map( function( $x ){ return preg_replace( '/(-)+\w/i' , '' , $x ); } , $matches[0] );

$matches[0] = array_unique($matches[0]);

$versions = $matches[0];


// Get current version

$currentVersion = shell_exec( 'php -v' );

$content = $currentVersion;

$currentVersion = preg_match_all( '/!?^([a-zA-Z])+\s+([\d\.]{1,3})/i' , $content , $match_curr_version );

$currentVersion = $match_curr_version[0][0];

$currentVersion = preg_replace( $regexReplaceAllExceptDigits , '' , $currentVersion);

$optionsSelect = "";

if ( count($versions) < 2 ){

    $optionsSelect.="<option value=''>php version</option>";

}

// Fetch versioon to build option dropown list
foreach ($versions as $key => $version_option ) {

    $version_option = preg_replace( $regexReplaceAllExceptDigits , '' , $version_option);
    
    $checked = $currentVersion == $version_option ? 'selected' : '';
    $optionsSelect.= "<option $checked value='php$version_option'>$version_option</option>";

}



echo $optionsSelect;

?>
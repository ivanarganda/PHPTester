<?php 

class Session{  

    public $id;

    public function __construct( $session = true ){

        $this->id = $session ? Request::getId() : $_SESSION['id'];

    }

    public function getSessionId(){

        unset( $_SESSION['id'] );

        return $_SESSION['id'] = $this->id;

    }

    public function deleteBufferFiles(){

        preg_match_all( REGEX_BUFFER_FILES , implode( ',' , scandir( URL_TXT_FILE ) ) , $matches);
        
        array_map( function( $file ){

            unlink( URL_TXT_FILE . $file );

        } , $matches[0] );

    }

}


?>
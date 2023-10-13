<?php 

class Session{  

    public $id;

    public function __construct(){

        $this->id = Request::getId();

    }

    public function getSessionId(){

        unset( $_SESSION['id'] );

        return $_SESSION['id'] = $this->id;

    }

}


?>
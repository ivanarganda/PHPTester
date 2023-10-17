<?php 

class Request{

    static function getId(){
        
        // Generate a random session ID
        $randomSessionID = $_SERVER['REMOTE_ADDR'] . '(' . bin2hex(random_bytes(32)); // Creates a 64-character (256-bit) hex session ID

        return $randomSessionID;

    }

}

?>
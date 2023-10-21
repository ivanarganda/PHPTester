<?php 

class Redirect{

    public function __redirect( $site ){


        if ( $site === "index.php" || $site === "" ){

            $site = MAIN_PAGE;
            
        } else {

            return false;

        }

        return URI_NO_PROTOCOL . $site;

    }

}


?>
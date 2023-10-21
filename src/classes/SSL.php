<?php 


class SSL{

    public $domain;

    public function __construct(){

        $this->domain = HOST;

    }

    function checkSSLActivation() {

        error_reporting(E_ERROR);

        $domain = $this->domain;

        try {

            $url = "https://api.ssllabs.com/api/v3/analyze?host=" . $domain;
            
            $data = file_get_contents($url);
    
            if ($data === false) {
                return '';
            }
        
            $result = json_decode($data, true);
        
            if ($result && isset($result['endpoints']) && is_array($result['endpoints']) && count($result['endpoints']) > 0) {

                $status = $result['endpoints'][0]['statusMessage'];
                return 'https://';

            } else {

                return '';

            }

        } catch ( Exception $e ){

            return '';

        }
    }

}

?>
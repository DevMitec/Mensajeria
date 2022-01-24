<?php

namespace MIT\SdkClient\helpers;


/**
 * Class EncryptBodyHelper
 * @package MIT\SdkClient\helpers
 */
class EncryptBodyHelper
{

    private $tokenStorageHelper;
    private $hmacHelper;
    private $aesHelper;

    /**
     * EncryptBodyHelper constructor.
     * @param $tokenStorageHelper
     */
    public function __construct($tokenStorageHelper){
        $this->tokenStorageHelper = $tokenStorageHelper;
        $this->hmacHelper = new HmacHelper();
        $this->aesHelper = new AesHelper();
    }

    /**
     * @param $data
     * @return array
     */
    public function protectData($data){

        $hmacBytes = $this->hmacHelper->encode($this->tokenStorageHelper->getHmacKey() ,$data);
        $body = $this->aesHelper->encrypt($this->tokenStorageHelper->getAesKey() , $data);

        return array('mit-hs' => base64_encode($hmacBytes), 'body' => base64_encode($body));
    }

}

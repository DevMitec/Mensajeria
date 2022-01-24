<?php


namespace MIT\SdkClient\helpers;


/**
 * Class AesHelper
 * @package MIT\SdkClient\helpers
 */
class AesHelper
{

    const MODE = MCRYPT_MODE_CBC;
    const CIPHER_METHOD = MCRYPT_RIJNDAEL_128;
    const LENGTH_IV = 16;


    /**
     * @param $key
     * @param $data
     * @return string
     */
    public function encrypt($key, $data)
    {

        try {
            $blockSize = mcrypt_get_block_size(self::CIPHER_METHOD, self::MODE);
            $dataPadded = $this->pkcs5_pad($data, $blockSize);
            $iv = mcrypt_create_iv(mcrypt_get_iv_size(self::CIPHER_METHOD, self::MODE), MCRYPT_RAND);
            $encryptedData = mcrypt_encrypt(self::CIPHER_METHOD, $key, $dataPadded, self::MODE, $iv);
            return $iv . $encryptedData;
        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }

    /**
     * @param $text
     * @param $blockSize
     * @return string
     */
    private function pkcs5_pad($text, $blockSize)
    {
        $pad = $blockSize - (strlen($text) % $blockSize);
        return $text . str_repeat(chr($pad), $pad);
    }


    /**
     * @param $data
     * @param $key
     * @return string
     */
    public static function deCypherData($data, $key)
    {

        $newData = base64_decode($data);
        $iv = substr($newData, 0, self::LENGTH_IV);
        $dataRaw = substr($newData, self::LENGTH_IV, strlen($newData));
        try{
            $decipherMessage = self::pkcs5_unPad(mcrypt_decrypt(self::CIPHER_METHOD, $key, $dataRaw, self::MODE, $iv));
            if(!$decipherMessage){
                throw new \InvalidArgumentException('The message can not be decipher');
            }
            return $decipherMessage;
        }catch (\Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * @param $text
     * @return false|string
     */
    private static function pkcs5_unPad($text) {
        $pad = ord($text{strlen($text) - 1});
        if ($pad > strlen($text)) {
            return false;
        }
        if (strspn($text, chr($pad), strlen($text) - $pad) != $pad) {
            return false;
        }
        return substr($text, 0, -1 * $pad);
    }
}
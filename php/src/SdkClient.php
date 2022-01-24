<?php

namespace MIT\SdkClient;

use MIT\SdkClient\handlers\DeCypherResponse;
use MIT\SdkClient\helpers\EncryptBodyHelper;
use MIT\SdkClient\Handlers\MitAuthentication;
use MIT\SdkClient\Helpers\RsaHelper;
use MIT\SdkClient\Helpers\TokenStorageHelper;
use MIT\SdkClient\models\Environment;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\CurlHandler;
use GuzzleHttp\HandlerStack;

class SdkClient extends Client
{

    private $clientId;
    private $clientSecret;
    private $environment;
    private $scopes;
    private $storageHelper;
    private $rsaHelper;

    /**
     * SdkClient constructor.
     * @param $environment
     * @param $clientId
     * @param $clientSecret
     * @param $scopes
     */
    public function __construct($environment, $clientId, $clientSecret, $scopes)
    {

        $this->environment = new Environment($environment);
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->scopes = $scopes;
        $this->storageHelper = new TokenStorageHelper();
        $this->rsaHelper = new RsaHelper();
        $this->initialize();
    }

    /**
     *
     */
    public function initialize(){
        try {
            new MitAuthentication($this->clientId, $this->clientSecret, $this->storageHelper,$this->scopes, $this->rsaHelper);
        }catch (\Exception $e){
            return $e->getMessage();
        }

    }


    /**
     * @param $url
     * @param $data
     * @param bool $deCypherResponse
     * @return string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function postRequest($url, $data, $deCypherResponse = false)
    {
        try {
            $encryptBodyHelper = new EncryptBodyHelper($this->storageHelper);
            $dataEncrypted = $encryptBodyHelper->protectData($data);
            $body = $dataEncrypted['body'];
            $headers = [
                'MIT-HS' => $dataEncrypted['mit-hs'],
                'Authorization' => 'Bearer ' . $this->storageHelper->getToken($this->clientId),
                'Content-Type' => 'text/plain; charset=ISO-8859-1',
                'accept-encoding' => 'gzip, x-gzip, deflate',
            ];

            $client = new Client();

            if ($deCypherResponse) {
                $stack = HandlerStack::create(new CurlHandler());
                $stack->push(new DeCypherResponse($this->storageHelper, $dataEncrypted));
                $client = new Client(['handler' => $stack]);
            }
            return $client->request('POST', $url , ['headers' => $headers, 'body' => $body]);
        } catch (\Exception $e){
            print($e->getMessage());
            return $e->getMessage();
        }


    }
}

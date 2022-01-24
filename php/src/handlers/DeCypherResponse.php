<?php


namespace MIT\SdkClient\handlers;

use MIT\SdkClient\helpers\AesHelper;
use MIT\SdkClient\Helpers\HmacHelper;
use GuzzleHttp\Psr7\Stream;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * Class DeCypherResponse
 * @package MIT\SdkClient\handlers
 */
class DeCypherResponse
{


    private $storageHelper;
    private $bodyCypher;


    /**
     * DeCypherResponse constructor.
     * @param $storageHelper
     * @param $bodyCypher
     */
    public function __construct($storageHelper , $bodyCypher)
    {
        $this->storageHelper = $storageHelper;
        $this->bodyCypher = $bodyCypher;
    }

    /**
     * @param callable $handler
     * @return \Closure
     */
    public function __invoke(callable $handler)
    {
        return function (RequestInterface $request, array $options) use ($handler) {
            $promise = $handler($request, $options);
            return $promise->then(
                function (ResponseInterface $response) {
                        $responseBody = $response->getBody()->getContents();
                        var_dump($response->getBody()->getContents());
                        $deCypherBody = AesHelper::deCypherData($responseBody , $this->storageHelper->getAesKey());
                        print($deCypherBody);
                        $this->verifyHmac($deCypherBody , $response->getHeaderLine('MIT-HS'));
                        $stream = fopen('data://text/plain,' . $deCypherBody,'r');
                        return $response->withBody(new Stream($stream));
                }
            );
        };
    }


    /**
     * @param $message
     * @param $expectedHmac
     * @throws \Exception
     */
    private function verifyHmac($message, $expectedHmac){

        $receiveMessageHmac = HmacHelper::encode($this->storageHelper->getHmacKey() , $message);
        if(strcasecmp(base64_encode($receiveMessageHmac),  $expectedHmac) != 0){
            throw new \Exception("Response Hmac not match");
        }
    }

}
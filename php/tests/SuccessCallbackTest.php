<?php

use MIT\SdkClient\SdkClient;
use \MIT\SdkClient\models\Environment;

class SuccessCallbackTest extends PHPUnit_Framework_TestCase
{

    public function testRunConexion()
    {
        $urlCharge = "http://example.com/data";
        $amount = rand(50, 150);
        $data = "hola mundo";
        try {
            $sdkClient = new  SdkClient(Environment::QA, 'idClient', 'secretClient', "msec/genKey scope");

            $request = $sdkClient->postRequest($urlCharge, $data, true);

            $this->assertNotNull($request->getBody());
            $this->assertNotNull($request->getStatusCode());

        } catch (\Exception $e) {
            print($e);
        }
    }
}

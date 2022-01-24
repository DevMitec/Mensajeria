<?php

namespace MIT\SdkClient\Handlers;

use MIT\SdkClient\models\Environment;
use CakeDC\OAuth2\Client\Provider\Cognito;
use Closure;
use League\OAuth2\Client\Grant\ClientCredentials;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Psr\Http\Message\RequestInterface;

/**
 * Class CognitoAuthentication
 * @package MIT\SdkClient\Handlers
 */
class CognitoAuthentication
{

    private $clientId;
    private $clientSecret;
    private $tokenStorageHelper;
    private $scopes;
    const REDIRECT_URI = 'none';

    /**
     * CognitoAuthentication constructor.
     * @param $clientId
     * @param $clientSecret
     * @param $scopes
     * @param $tokenStorageHelper
     */
    public function __construct($clientId, $clientSecret, $scopes, $tokenStorageHelper)
    {
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->scopes = $scopes;
        $this->tokenStorageHelper = $tokenStorageHelper;
    }


    /**
     * @param callable $handler
     * @return Closure
     */
    public function __invoke(callable $handler)
    {
        return function (RequestInterface $request, array $options) use ($handler) {
            $token = $this->tokenStorageHelper->getToken();

            if (!isset($token)) {
                $token = $this->getToken();
            }
            return $handler(
                $request->withAddedHeader('Authorization', 'Bearer ' . $token),
                $options
            );
        };
    }


    /**
     * @return \League\OAuth2\Client\Token\AccessToken|\League\OAuth2\Client\Token\AccessTokenInterface|string
     */
    private function getToken()
    {

        if (!isset($this->clientId)) {
            throw new \InvalidArgumentException("Client Id can't be null");
        }

        if (!isset($this->clientSecret)) {
            throw new \InvalidArgumentException("Client Secret can't be null");
        }

        try {

            $provider = new Cognito([
                'clientId' => $this->clientId,
                'clientSecret' => $this->clientSecret,
                'redirectUri' => self::REDIRECT_URI,
                'hostedDomain' => Environment::getUrlToken(),
                'scope' => $this->scopes,
            ]);

            $grant = new ClientCredentials();

            $token = $provider->getAccessToken($grant);
            $this->tokenStorageHelper->setAccessToken($token);
            return $token;
        } catch (\UnexpectedValueException $e) {
            return $e->getMessage();
        } catch (IdentityProviderException $e) {
            return $e->getMessage();
        } catch (\Exception $e){
            return $e->getMessage();
        }
    }
}

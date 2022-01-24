# Sdk Php Client

Un conjunto de clases que permiten intercambiar mensajes de forma segura con los servicios de MIT.  
  
  
## Comenzando

Estas instrucciones te permitirán implementar el flujo de comunicación establecido en MIT para intercambio seguro de mensajes.
El modelo de autorización está basado en el protocolo [Oauth 2.0](https://oauth.net/) y algoritmos de cifrado robusto.
 
 
## Pre-requisitos

0. php 7.4 o superior
1. Identificar la aplicación a registrar:
2. Registrar la aplicación en el servidor de autorización para obtener un **ClientID** y opcionalmente un **ClientSecret**
> La aplicación por lo menos debe tener habilitado el scope _"msec/genKey"_
 
 
## Modo de uso 

El SDK tiene como base los componentes de httpClient de la libreria Guzzle, PHP HTTP client.
Para mas información visite el siguiente enlace.

> Guzzle: https://docs.guzzlephp.org/en/stable/#

 
Pasos para usar la libreria.

0. Inicializar el Objeto SdkClient de la libreria como a continuacion se presenta.

    $sdkClient = new  SdkClient(Entorno, clientId, secretId, scopes);

1. Llamar al postRequest que se encargara de procesar la transacción, a continación se presenta un ejemplo.

    $request = $sdkClient->postRequest(URL, DATOS);
    
    Si desea descifrar la respuesta debera enviar como tercer parametro true, por ejemplo.
    
    $request = $sdkClient->postRequest(URL, DATOS, true);
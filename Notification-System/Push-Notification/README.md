# Push Notifications

## O que é

*Web Push Notification*, ou somente *Push Notification* é um meio de interagir com browser dos usuários do seu site mesmo que eles não estejam ativamente usando-o naquele momento, enviando informações atualizadas e relevantes.

O sistema é composto por duas peças que devem ser usadas de forma complementar: **Push Messages** e **Notifications**. O primeiro é responsável por gerenciar os dados do dispositivo e enviar as mensagens do servidor para os usuários. O segundo é responsável por controlar a exibição das mensagens no dispositivo do usuário.

## Para que serve?

*Push Notification* é uma forma de aumentar o engajamento dos usuários, porém, se usado em excesso, pode se tornar um incômodo, trazendo um resultado inverso, ou seja, reduzindo o engajamento.

## Componentes envolvidos em um Push Notification

Para implementar *Push Notification*, é preciso o seguinte:

### VAPID Keys

Também conhecidas como application server keys, servem para identificar sua aplicação junto aos Push Services. Você consegue gerá-las usando a biblioteca em Node [web-push](https://www.npmjs.com/package/web-push) com o seguinte comando:

```shell
$ npx web-push generate-vapid-keys

Public Key:
BLEvwbQgdjaHjmXcJgpAmOpFCuR-m_BKJWhskZmbFYAQABA4ZrpLQ1UnNJVH_Zbmzjugmmts2I5kLt8wMKQlIME

Private Key:
cSTj1YJCDQGP-J6QLCr3gSkU2OPs39Dx3FtiBc6ZOYI
```

### Service worker

Service worker é um código javascript que roda em background no browser, mesmo quando seu site não está aberto, e é executado quando ele recebe uma mensagem push. Nele são implementadas as regras para manipulação e exibição das notificações.

### Push Service

Sua aplicação server não envia uma *Push Notification* diretamente para o dispositivo do usuário. Quem faz isso é o *Push Service*. Ele é um serviço controlado pelo fabricante do browser do usuário, e não há como controlar isso. Porém a requisição a todos eles é padronizada, portanto, basta utilizar os dados da inscrição fornecidas no momento da autorização do usuário.

Abaixo estão os *Push Services* dos principais browsers:

- **Mozilla autopush** - Firefox
- **Google Firebase Cloud Messaging (FCM)** - Chrome (e alguns browsers baseados em Chromium: Brave, Opera, etc.)
- **Windows Push Notification Services** - Edge
- **Apple Push Notification service (APNs)** - Safari

### Browser compatível

Os principais browsers modernos suportam a tecnologia, tanto desktop quanto mobile (Android e iOS). A lista completa pode ser encontrada na [MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent#browser_compatibility).

## Como fazer

São necessários os seguintes passos:

- Na camada cliente, registre o service worker e solicite permissão para enviar *Push Notifications*. Um pop up nativo aparecerá para que o usuário decida se permite ou não as notificações

```javascript
navigator.serviceWorker.register('./service-worker.js');

const result = await Notification.requestPermission();
```

- O usuário pode negar ou aceitar a solicitação
  - Se negar, não é possível reverter a decisão ou solicitar nova permissão programaticamente. O usuário ativamente precisa acessar as configurações do seu browser e desfazer a decisão
  - Se aceitar, o browser gera um identificador daquele dispositivo e uma inscrição (subscription) no *Push Service*

```javascript
let swRegistration = await navigator.serviceWorker.getRegistration();

let subscription = await swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY)
});
```

- Enviar a inscrição do dispositivo do usuário para armazenamento em seu servidor

![alt text](image.png)

- Use a biblioteca web-push para criar a lógica de envio de mensagens push para os dispositivos de seus usuários
  - Na camada server da sua aplicação, você vai usar sua VAPID Key para fazer uma chamada HTTP REST para o *Push Service* constante na inscrição, passando a subscription do usuário como parâmetro, para que ele envie sua mensagem para o dispositivo do usuário

```javascript
webpush.sendNotification(subscription, notification, options);
```

![alt text](image-1.png)

- Adicionar lógica para manipular o recebimento das mensagens que foram enviadas aos dispositivos e exibi-las como *Notifications*.
  - No service worker, adicionar os eventos desejados para validar, manipular e exibir as mensagens recebidas para o usuário

![alt text](image-2.png)

## Referências

- [Compatibilidade dos browsers - Fonte: MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent#browser_compatibility)
- [Push API - Fonte: W3C](https://www.w3.org/TR/push-api/)
- [How push works - Fonte: web.dev](https://web.dev/articles/push-notifications-how-push-works)
- [Codelab: server - Fonte: web.dev](https://web.dev/articles/push-notifications-server-codelab)
- [Codelab: client - Fonte: web.dev](https://web.dev/articles/push-notifications-client-codelab)
- [Push API - Fonte: MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Notifications API - Fonte: MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

- [ServiceWorker Cookbook - Github](https://github.com/mdn/serviceworker-cookbook/)
- [Push Notifications codelab - Github](https://github.com/GoogleChromeLabs/web-push-codelab)
- https://github.com/andreinwald/webpush-ios-example
- https://github.com/AkileshRao/Service-worker-notification
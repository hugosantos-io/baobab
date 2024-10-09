# Push Notifications

## O que é

*Web Push Notification*, ou somente *Push Notification* é um meio de interagir com browser dos usuários do seu site mesmo que eles não estejam ativamente usando-o naquele momento, enviando informações atualizadas e relevantes.

O sistema é composto por duas peças que devem ser usadas de forma complementar: **Push Messages** e **Notifications**. O primeiro é responsável por gerenciar os dados do dispositivo e enviar as mensagens do servidor para os usuários. O segundo é responsável por controlar a exibição das mensagens no dispositivo do usuário.

## Para que serve?

*Push Notification* é uma forma de aumentar o engajamento dos usuários, porém, se usado em excesso, pode se tornar um incômodo, trazendo um resultado inverso, ou seja, reduzindo o engajamento.

De forma simplificada, para implementar *Push Notification*, são necessários os seguintes passos:

- Na camada cliente, solicite permissão para enviar *Push Notification*s
- O usuário pode negar ou aceitar a solicitação
  - Se negar, não é possível reverter a decisão ou solicitar nova permissão programaticamente. O usuário ativamente precisa acessar as configurações do seu browser e desfazer a decisão
  - Se aceitar, será gerado um identificador daquele dispositivo
- Enviar o identificador do dispositivo do usuário para armazenamento em seu servidor
- Criar lógica de envio de mensagens push para os dispositivos de seus usuários
- Adicionar lógica para manipular o recebimento das mensagens que foram enviadas aos dispositivos e exibi-las como *Notifications*
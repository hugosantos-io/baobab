const applicationServerPublicKey = 'BLduBaEh6ip8KFkz9XuzUpq2KIL2z88OnBd5udqcknjMtJQB148G9EbuUHwZCJFl-gxRi7T1CLir-JYblTfoXo4';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  // PushData keys structure standart https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  let pushData = event.data.json();
  if (!pushData || !pushData.title) {
    console.error('Received WebPush with an empty title. Received body: ', pushData);
  }

  self.registration.showNotification(pushData.title, pushData)
    .then(() => {
      // You can save to your analytics fact that push was shown
      // fetch('https://your_backend_server.com/track_show?message_id=' + pushData.data.message_id);
    });
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  if (!event.notification.data) {
    console.error('Click on WebPush with empty data, where url should be. Notification: ', event.notification)
    return;
}
if (!event.notification.data.url) {
    console.error('Click on WebPush without url. Notification: ', event.notification)
    return;
}

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
    .then(() => {
        // You can send fetch request to your analytics API fact that push was clicked
        // fetch('https://your_backend_server.com/track_click?message_id=' + pushData.data.message_id);
    })
  );
});

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription);
    })
  );
});
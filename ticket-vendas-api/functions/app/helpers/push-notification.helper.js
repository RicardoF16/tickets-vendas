const admin = require('../lib/firebase').admin;
// sendPushNotication('eXosmGCDsoo:APA91bG598MBwNre5kY1FcdxaeAtvR818WJsX82wIJHqc6NaFRucRbDp-W50lC1RaUsF9WyEvE51__pW2i-0c614qPCwFnUkWKaLG34d4ubRW-N7E-n4OCLwJZKgS0gO4l5qqMfVNzDQ', 'Alguém está precisando de sua ajuda',


module.exports = function sendPushNotication(idPushNotification, title, message) {
  const payload = {
    notification: {
      title: title,
      body: message,
      sound: 'default',
      // click_action: 'FCM_PLUGIN_ACTIVITY',
      // icon: 'fcm_push_icon'
    }
  };

  if (idPushNotification) {
    admin.messaging()
      .sendToDevice(idPushNotification, payload)
      .then(response => {
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
              // todo: remover tokens invalidos;
            }
          }
        });
      });
  }
}

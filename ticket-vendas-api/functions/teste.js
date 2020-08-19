const { admin } = require('./app/lib/firebase');

sendPushNotication('ff95kWXr6_I:APA91bH9CBY-4OkxPRwyY0645eJSvjFGk0CbCqHyR53LfDMTfys4sUsCTz6tv192qGEx8Fa7V3Sj6bXTOuDO4RXSyx0eHekHT1LWi10EOlfIvOcIBJWrpC0M5kCxogvOWiIiInDEwz0G', 'Alguém está precisando de sua ajuda','asdas');
// ff95kWXr6_I:APA91bH9CBY-4OkxPRwyY0645eJSvjFGk0CbCqHyR53LfDMTfys4sUsCTz6tv192qGEx8Fa7V3Sj6bXTOuDO4RXSyx0eHekHT1LWi10EOlfIvOcIBJWrpC0M5kCxogvOWiIiInDEwz0G

function sendPushNotication(idPushNotification, title, message) {
  const payload = {
    notification: {
      title: title,
      body: message,
      sound: 'default',
    //   click_action: 'FCM_PLUGIN_ACTIVITY',
    //   icon: 'fcm_push_icon'
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



//   admin
//       .auth()
//       .verifyIdToken('eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2YjgzOTdjOGU0NmE3M2ZiMDExMDk2YjUyMDE1YTZlNjZkMDMyZWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSmhvbmFudGFuIEVybmFuZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTZmR1RhSUpYeUhrL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmZUdUF3emYzNWZobzNyMWxOeHNFblEtdUNlZUEvczk2LWMvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3BldC1jYXItcGVvcGxlLXByb2QiLCJhdWQiOiJwZXQtY2FyLXBlb3BsZS1wcm9kIiwiYXV0aF90aW1lIjoxNTYzODA0MTcyLCJ1c2VyX2lkIjoiZHFpc01TSHNya1FONnpkYnFhQjVTVGl3WHM0MiIsInN1YiI6ImRxaXNNU0hzcmtRTjZ6ZGJxYUI1U1Rpd1hzNDIiLCJpYXQiOjE1NjM4MDQ4ODAsImV4cCI6MTU2MzgwODQ4MCwiZW1haWwiOiJqaG9uc29hZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNTQ1NjUxODk3MjcxMzQ0MjA3NyJdLCJlbWFpbCI6WyJqaG9uc29hZEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.NeaasPxtprgvwrY_Z05npNS23iPEomgy0mFIg3ZGf6rSk4Cq0Urco5hrTS-KQUwi3ELWN3ukWCHEPjq7b7cmR-sfJN5nXpz0gCSMR0OpdpscWSbJdnwnsnE4_QUBFfW0WVXs-7UiZK4sW9e0OCYdqjPieEYKjjepArNYKwbv0DP2WuMGtK7PAr2zNaDszETRoQRZ2iPNnUqOB0MyhaceKL3wS76aS6rX9GevN19WV52quHg8gjs_JcF4wwVYOhAOrvz2RSEj1o8aRM5eOgOb0KDl4I3q2y6M8uHgIFoEs7UmDV9GRhKuzd5F2Akic4b72pZtHjswj-FrrZB3PuJcfw')
//       .then(decodedIdToken => {
       
//           UsuarioModel.getByUid(decodedIdToken.uid)
//             .then(usuario => {
                
                
//                 console.log(usuario);
                
//             });
//       })
//       .catch(error => {
//           console.log('decodedIdToken 2 >>', error);
//           res.status(403).send('Unauthorized' + idToken);
//       });


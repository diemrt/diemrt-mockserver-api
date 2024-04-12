const admin = require("firebase-admin");
//Aggiungo il percorso al file locale del service account
const serviceAccount = require("./blog-example-3d481-firebase-adminsdk-g9i6g-43a32e15b0.json");

//Inizializzo l'app come da guida ufficiale Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
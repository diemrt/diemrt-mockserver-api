//Inizializzo in modo standard express
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
app.use(cors())

//Carico le configurazioni nel file .env
//Nel file deve essere presente la variabile TOKEN_SECRET=...
const dotenv = require('dotenv')
dotenv.config()

//Creo un middleware per la gestione centralizzata del token di Firebase
const admin = require('./firebase-config')
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      console.log(decodeValue);
      return next();
    }
    return res.sendStatus(401).json({ message: 'Unauthorized' });
  } catch (e) {
    console.log(e)
    return res.json({ message: 'Internal Error' });
  }
}

//registro il middleware
app.use(authenticateToken)

//Aggiungo un esempio di chiamata GET di una lista fittizia di post.
app.get('/posts', (req, res) => {
  const posts = {
    data: [
      {
        id: 1,
        title: "First post",
        description: "My first post."
      }
    ]
  }
  res.send(posts)
})

//Aggiungo un esempio di chiamata GET per avere un singolo post. L'id inserito simula l'id del post richiesto.
//La chiamata può andare volutamente in errore se si inserisce l'id 2 nella richiesta
app.get('/posts/:postId', (req, res) => {
  const posts = {
    data:
    {
      id: req.params?.postId,
      title: "First post",
      description: "My first post."
    }
  }

  if (req.params?.postId === "2")
    throw new Error('Il valore inserito non è ammesso.')

  res.send(posts)
})

//Aggiungo un esempio di chiamata POST, che ritorna un 201Created
app.post('/posts', (req, res) => {
  res.status(201).end()
  res.send()
})

//Aggiungo un esempio di chiamata PUT
app.put('/posts/:postId', (req, res) => {
  res.send()
})

//Aggiungo un esempio di chiamata PATCH
app.patch('/posts/:postId', (req, res) => {
  res.send()
})

//Aggiungo un esempio di chiamata DELETE
app.delete('/posts/:postId', (req, res) => {
  res.send()
})

//Avvio il server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
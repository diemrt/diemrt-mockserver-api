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

//Creo un middleware per la gestione centralizzata del token di auth
const jwt = require('jsonwebtoken')
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
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

  if(req.params?.postId === "2")
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
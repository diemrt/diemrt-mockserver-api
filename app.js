const express = require('express')
const app = express()
const port = 3000

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

app.get('/posts/:postId', (req, res) => {
  const posts = {
    data: 
      {
        id: req.params?.postId,
        title: "First post",
        description: "My first post."
      }
  }
  res.send(posts)
})

app.post('/posts', (req, res) => {  
  res.status(201).end()
  res.send()
})

app.put('/posts/:postId', (req, res) => {  
  res.send()
})

app.patch('/posts/:postId', (req, res) => {  
  res.send()
})

app.delete('/posts/:postId', (req, res) => {  
  res.send()
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
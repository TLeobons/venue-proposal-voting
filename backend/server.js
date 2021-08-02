const cors = require('cors')
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')

app.use(cors())
app.options('*', cors())
app.use(express.json())

let users = []
let venues = []

app.get('/', (req, res) => {
  res.send('API is running')
})

app.post('/sendvenue', (req, res) => {
  const venuewithUniqueId = {
    venueid: uuidv4(),
    ...req.body
  }
  venues.push(venuewithUniqueId)
  res.json(venues)
})

app.post('/senduser', (req, res) => {
  const userwithUniqueId = {
    userid: uuidv4(),
    name: req.body.name,
  }
  users.push(userwithUniqueId)
  res.json(users)
})

app.get('/getallusersandvenue', (req, res) => {
  res.json({ users, venues })
})

app.post('/vote', (req, res) => {
  let filtereduser = users.filter((user) => user.userid == req.body.userid)[0]
  if (!filtereduser.voting) {
    filtereduser = {
      userid: filtereduser.userid,
      name: filtereduser.name,
      voting: req.body.venueid,
    }
    const indexUser = users.findIndex((user) => user.userid == req.body.userid)

    users[indexUser] = filtereduser
    res.json({ message: 'Your vote has been casted successfully', users })
  } else {
    res.json({ message: 'You already Voted', users })
  }
})

app.listen(5000, console.log('App is running on Port 5000'))

module.exports = app

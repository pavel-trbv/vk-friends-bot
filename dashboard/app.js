const colors = require('colors')
const http = require('http')
const express = require('express')
const fs = require('fs')
const app = express()

const { spawn } = require('child_process');

const config = require('../config.json')

const mongoClient = require('mongodb').MongoClient
const db_host = 'mongodb://localhost:27017'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

let bot = spawn('node', ['bot/index.js'])

bot.stdout.on('data', (data) => {
  console.log(data.toString());
});

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/dist/js'));

app.get('/api/uniqs.get', (req, res) => {
  mongoClient.connect(db_host, { useNewUrlParser: true }, (err, client) => {
    if (err) console.error(err)

    const id = req.query.id

    const db = client.db(config.database)

    const uniqs = db.collection(`id${id}uniqs`)

    uniqs.find().sort({ date: -1 }).toArray((err, result) => {
      if (err) console.error(err)

      res.json(result)

      client.close()
    })
  })
})

app.get('/api/bot.restart', (req, res) => {
  bot.kill()
  console.log(' Bot stopped'.bold.red)

  bot = spawn('node', ['bot/index.js'])
  setTimeout(() => {
    console.log(' Bot started'.bold.red)
    bot.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    res.json({ status: 'ok' })
  }, 2000);
})

app.get('/api/ids.get', (req, res) => {
  mongoClient.connect(db_host, { useNewUrlParser: true }, (err, client) => {
    if (err) console.error(err)

    const db = client.db(config.database)

    const ids = db.collection('ids')
    ids.find().toArray((err, result) => {
      if (err) console.error(err)
      
      if (result.length == 0) res.json([])
      else res.json(result)
    })
  })  
})

app.get('/api/ids.set', (req, res) => {
  mongoClient.connect(db_host, { useNewUrlParser: true }, (err, client) => {
    if (err) console.error(err)

    const db = client.db(config.database)
    const ids = db.collection('ids')

    ids.deleteMany({})

    if (req.query.ids == '') {
      res.json({ status: 'ok' })
      return
    }

    const idsList = req.query.ids.split(',').map(i => {
      if (i != '') return { id: i }
    })

    ids.insertMany([ ...idsList ], (err, result) => {
     if (err) console.error(err)

      bot.kill()
      console.log(' Bot stopped'.bold.red)
    
      bot = spawn('node', ['bot/index.js'])
      setTimeout(() => {
        console.log(' Bot started'.bold.red)
        bot.stdout.on('data', (data) => {
          console.log(data.toString());
        });
    
        res.json({ status: 'ok' })
      }, 2000);
    })
  })  
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

http.createServer(app).listen(port, e => {
  if(e) console.error(e)
  console.log(`\n Server was running on`.green, `http://${host}:${port}`.yellow)
  console.log(` Open page on your browser\n`.cyan)
})
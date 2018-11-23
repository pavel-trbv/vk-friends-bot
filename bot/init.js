/**
 * Инициализация списка друзей, относительно которого
 * будет происходить получение новых друзей
 */

const mongoClient = require('mongodb').MongoClient
const _init = require('VK-Promise')
const config = require('../config.json')
const vk = new _init(config.token)

const colors = require('colors')

const init = (id, _cb) => {
  // Подключение к БД
  mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) console.error(err)

    console.log(' Инициализация нового ID...'.bold.italic.yellow)
    
    const db = client.db(config.database)
    const list = db.collection(`id${id}list`)
    const uniq = db.collection(`id${id}uniqs`)

    list.deleteMany({})
    uniq.deleteMany({})

    // Получение списка друзей из ВК
    vk.getAll('friends.get', { fields: 'nickname,domain', user_id: id })
      .then(r => {
        list.insertMany([ ...r ], (err, result) => { 
          if (err) console.error(err);
          console.log(` Добавлено ${result.ops.length}`.bold.green)
          _cb(id, result.ops)
        })
        client.close()
      })
      .catch(e => console.error(e))
  })  
}

module.exports = init

if (process.env.TYPE == 'shell') init(r => {})


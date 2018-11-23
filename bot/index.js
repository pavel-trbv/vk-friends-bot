const mongoClient = require('mongodb').MongoClient
const _initVk = require('VK-Promise')
const config = require('../config.json')
const _ = require('lodash')
const vk = new _initVk(config.token)
const colors = require('colors')

const init = require('./init.js')

console.log(' Запуск бота'.bold.italic.yellow)
console.log(' Подключение к БД...'.italic.yellow)

// Подключение к БД
mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
  if (err) console.error(err)
  console.log(' OK'.green)
   
  const db = client.db(config.database)

  const ids = db.collection('ids')

  const update = (id, result) => {  // result => Все друзья из БД
    // Получение всех друзей
    const uniq = db.collection(`id${id}uniqs`)

    vk.getAll('friends.get', { fields: 'nickname,domain', user_id: id })
      .then(r => {
        if (err) console.error(err)

        //uniq.deleteMany({}) // Очищение новых друзей
        
        const diff = r.length - result.length // Кол-во новых друзей
        console.log(` @ID${id}`.bold.magenta, ` Новых друзей: ${diff}`.green)

        if (diff > 0) { // Есть ли новые друзья
          const oldFriendsIds = result.map(i => i.id) // ID старых друзей
          const newFriendsIds = r.map(i => i.id) // ID !всех друзей
          const ids = _.xor(oldFriendsIds, newFriendsIds) // ID !новых друзей

          let keys = [] // Массив ключей для !новых друзей в массиве !всех друзей

          // Порядковый номер друга в массиве всех друзей
          ids.map(i => {
            let key = _.findIndex(r, { id: i })
            keys.push(key)
          })

          // Добавление новых друзей в БД
          console.log(` @ID${id}`.bold.magenta, ' Добавлены:'.blue) // Log
          keys.map(i => {
            // Проверка на существование
            uniq.find({ id: r[i].id }).toArray((err, result) => {
              if (err) console.error(err)

              if (result.length == 0) {
                uniq.insertOne({ ...r[i], date: new Date() }, (err, result) => {
                  if (err) console.error(err)

                  console.log(` @ID${id}`.bold.magenta, ' ID: '.blue, result.ops[0].id) // Log
                })
              }
            })
          })
        } 
      })
      .catch(e => console.error(e))
  }

  // Функция обработки
  const _load = () => {
    ids.find().toArray((err, r) => {
      if (r.length != 0) {
        if (err) console.error(err)

        r.map(({ id }) => {
          console.log(`\n ID: ${id}`.blue.bold)

          const friends = db.collection(`id${id}list`)

          friends.find().toArray((err, result) => {
            if (err) console.error(err)

            if (result.length == 0) {
              init(id, update)
            } else {
              console.log(' Обновление...'.italic.yellow)
              console.log(` @ ${(new Date()).toLocaleString('ru-RU', { timeZone: 'UTC', hour12: false })}`.magenta);
              update(id, result)
            }
          })
        }) 
      } 
    })  
  } 
  _load() // Начальная итерация

  // Повторять каждые 3 минуты
  setInterval(_load, 180000) // 180 000 => 3 минуты
})


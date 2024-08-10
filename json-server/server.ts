import jsonServer from 'json-server'

import checkAuthorization from './middlewares/checkAuthorization'
import requestDelay from './middlewares/requestDelay'
import router from './router'
import { dbConfig } from './core/DataBase'

const server = jsonServer.create()

const DataBaseJSON = jsonServer.router(dbConfig.path)

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(requestDelay)

// проверяем, авторизован ли пользователь
server.use(checkAuthorization)
server.use(DataBaseJSON)
server.use('/api', router)

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port')
})

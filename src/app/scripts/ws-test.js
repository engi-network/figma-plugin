/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const websocket = require('ws')

const WS_URL = process.env['SOCKET_URL']
const CHECK_ID = '4b8bc01a-e8ec-4cec-b343-803c08fb5323'

const ws = new websocket.WebSocket(WS_URL)

ws.on('open', function open() {
  console.info('Connected.')
  ws.send(
    JSON.stringify({
      message: 'subscribe',
      check_id: CHECK_ID,
    }),
  )
  // ws.close();
})

ws.on('close', function close() {
  console.info('disconnected')
})

ws.on('message', function message(data) {
  let message = JSON.parse(data)
  console.info('received: %s', message)
})

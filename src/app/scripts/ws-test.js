/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const websocket = require('ws')

const WS_URL = process.env['SOCKET_URL']
const CHECK_ID = '8e92553f-6cf9-406a-8805-6a31db487559'

var retries = 5

function connect() {
  var ws
  if (--retries == 0) {
    console.info(`giving up on ${WS_URL}`)
    process.exit(1)
  }
  console.info(`connecting to ${WS_URL}`)
  ws = new websocket.WebSocket(WS_URL)

  ws.on('open', function open() {
    console.info(`subscribing to ${CHECK_ID}`)
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
    connect()
  })

  ws.on('message', function message(data) {
    let message = JSON.parse(data)
    console.info('received: %s', message)
  })
}

connect()

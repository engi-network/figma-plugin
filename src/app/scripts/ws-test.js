/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const websocket = require('ws')

const WS_URL = process.env['SOCKET_URL']

let retries = 5
const myArgs = process.argv.slice(2)
const checkId = myArgs[0]

function connect() {
  let ws
  if (--retries == 0) {
    console.info(`giving up on ${WS_URL}`)
    process.exit(1)
  }
  console.info(`connecting to ${WS_URL}`)
  ws = new websocket.WebSocket(WS_URL)

  ws.on('open', function open() {
    console.info(`subscribing to ${checkId}`)
    ws.send(
      JSON.stringify({
        message: 'subscribe',
        check_id: checkId,
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

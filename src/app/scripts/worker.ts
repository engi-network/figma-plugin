export const workerScript = `
onmessage = (event) => {
  const workerData = event.data
  postMessage('[WORKER] Web worker onmessage established')

  switch (workerData.connectionStatus) {
    case 'init':
      console.info('init....')
      break

    case 'stop':
      console.info('stop worker from working...')
      break

    default:
      postMessage('[WORKER] Web worker onmessage get to default')
  }
}  
`

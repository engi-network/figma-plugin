export const workerScript = `
onmessage = (event) => {
  const workerData = event.data
  postMessage('[WORKER] Web worker onmessage established')

  switch (workerData.connectionStatus) {
    case 'init':
      console.info('Initialize worker.')
      break

    case 'stop':
      console.info('Stop worker from working.')
      break

    default:
      postMessage('Worker is woring.')
  }
}  
`

class MyWorker {
  worker
  constructor() {}

  initialize() {
    if (window.Worker) {
      const textScript = document.getElementById('my-worker')
        ?.textContent as string
      const blob = new Blob([textScript])

      this.worker = new Worker(window.URL.createObjectURL(blob))

      this.worker.addEventListener(
        'message',
        this.onWorkerMessage.bind(this),
        null,
      )
    }
  }

  //message from worker
  onWorkerMessage(event: MessageEvent): void {
    console.info('message from worker', event.data)
  }

  start() {
    if (!this.worker) {
      return
    }

    this.worker.postMessage({
      connectionStatus: 'init',
    })
  }

  stopPolling() {
    if (!this.worker) {
      return
    }
    this.worker.postMessage({
      connectionStatus: 'stop',
    })
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate()
    }
  }
}

export default new MyWorker()

class MyWorker {
  private worker
  constructor() {}

  initialize(workerScript: string) {
    if (window.Worker) {
      const blob = new Blob([workerScript])

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

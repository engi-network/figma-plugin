import { CallbackType } from '~/app/lib/services/socket'

class PubSub {
  private subscriptions = new Map<string, Set<CallbackType>>()

  subscribe(topic: string, callback: CallbackType) {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set())
    }

    this.subscriptions?.get(topic)?.add(callback)

    return () => this.unsubscribe(topic, callback)
  }

  unsubscribe(topic: string, callback: CallbackType) {
    const evSub = this.subscriptions.get(topic)
    evSub?.delete(callback)
    if (evSub?.size === 0) {
      this.subscriptions.delete(topic)
    }
  }

  publish(topic: string, data) {
    const evSub = this.subscriptions.get(topic)

    if (evSub) {
      for (const cb of evSub) {
        cb(data)
      }
    }
  }

  updateSubscription(topic: string, callback: CallbackType) {
    const evSub = this.subscriptions.get(topic)
    evSub?.forEach((fn) => {
      if (fn.name === callback.name) {
        evSub.delete(fn)
      }
    })
    evSub?.add(callback)
  }

  getTopics(): Array<string> {
    return Array.from(this.subscriptions.keys())
  }
}

export default PubSub

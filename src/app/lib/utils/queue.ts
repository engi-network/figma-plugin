interface IQueue<T> {
  dequeue(): T | undefined
  enqueue(item: T): void
  size(): number
}

// time interval for dequeue
export const ANIMATION_DURATION_MS = 3000

export class Queue<T> implements IQueue<T> {
  private storage: T[] = []

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Queue has reached max capacity, you cannot add more items')
    }
    this.storage.push(item)
  }

  dequeue(): T | undefined {
    return this.storage.shift()
  }

  size(): number {
    return this.storage.length
  }
}

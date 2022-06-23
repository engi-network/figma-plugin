import { useEffect, useState } from 'react'

export const createStore = (initialState) => {
  let state = initialState
  const getState = () => state
  const listeners = new Set()

  const setState = (fn) => {
    if (typeof fn === 'function') {
      state = fn(state)
    } else {
      state = fn
    }

    listeners.forEach(
      (listener) => typeof listener === 'function' && listener(),
    )
  }

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { state, getState, setState, subscribe }
}

export const useStore = (store, selector) => {
  const [state, setState] = useState(() => selector(store.getState()))

  useEffect(() => {
    const callback = () => setState(selector(store.getState()))

    const unsubscribe = store.subscribe(callback)
    callback()
    return unsubscribe
  }, [store, selector])

  return state
}

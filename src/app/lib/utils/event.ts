interface DispatchParams {
  data?: Record<string, unknown> | unknown
  type: string
}

export const dispatchData = ({ type, data }: DispatchParams): void => {
  parent.postMessage(
    {
      pluginMessage: {
        type,
        data,
      },
    },
    '*',
  )
}

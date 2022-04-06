export const onFormChange = async (data) => {
  const promises = Object.entries(data).map(async ([key, value]) => {
    await figma.clientStorage.setAsync(key, value)
  })

  await Promise.all(promises)
}

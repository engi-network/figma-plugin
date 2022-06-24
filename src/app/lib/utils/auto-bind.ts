export function autoBind(obj): void {
  const propertyNames = Object.getOwnPropertyNames(obj.constructor.prototype)
  propertyNames.forEach((propertyName) => {
    const value = obj[propertyName]
    if (propertyName !== 'constructor' && typeof value === 'function') {
      obj[propertyName] = value.bind(obj)
    }
  })
}

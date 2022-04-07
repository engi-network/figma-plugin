/* eslint-disable sort-keys */
import { createServer, Factory, Model, RestSerializer } from 'miragejs'

export function makeServer({ environment = 'development' }) {
  return createServer({
    environment,
    models: {
      reminder: Model,
    },

    factories: {
      reminder: Factory.extend({
        text(i) {
          return `Reminder ${i}`
        },
      }),
    },

    seeds(server) {
      server.createList('reminder', 10)
    },

    serializers: {
      reminder: RestSerializer.extend({
        include: ['reminder'],
        embed: true,
      }),
    },

    routes() {
      this.namespace = 'api'
      this.resource('reminder')
      this.delete('/reminders/:id', (schema, request) => {
        let id = request.params.id

        return schema.reminders.find(id).destroy()
      })

      this.get('/reminders', (schema) => {
        return schema.reminders.all()
      })

      this.post('/reminders', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.reminders.create(attrs)
      })
    },
  })
}

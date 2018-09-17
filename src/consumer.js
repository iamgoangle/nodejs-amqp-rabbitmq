// Do not use this code on your production
const q = 'Customer created event'
const amqp = require('amqplib/callback_api')

async function loyaltyService() {
  const conn = amqp.connect(
    'amqp://localhost',
    (err, conn) => {
      conn.createChannel((err, ch) => {
        var ex = 'Customer created event'

        ch.assertExchange(ex, 'fanout', { durable: false })

        ch.assertQueue('', { exclusive: true }, (err, q) => {
          console.log(
            ' [*] Waiting for messages in %s. To exit press CTRL+C',
            q.queue
          )
          ch.bindQueue(q.queue, ex, '')

          ch.consume(
            q.queue,
            msg => {
              console.log(' 💎 %s', msg.content.toString())
              console.log(' 💎 Create loyalty package for new customer...')
            },
            { noAck: true }
          )
        })
      })
    }
  )
}

async function postService() {
  const conn = amqp.connect(
    'amqp://localhost',
    (err, conn) => {
      conn.createChannel((err, ch) => {
        var ex = 'Customer created event'

        ch.assertExchange(ex, 'fanout', { durable: false })

        ch.assertQueue('', { exclusive: true }, (err, q) => {
          console.log(
            ' [*] Waiting for messages in %s. To exit press CTRL+C',
            q.queue
          )
          ch.bindQueue(q.queue, ex, '')

          ch.consume(
            q.queue,
            msg => {
              console.log(' 📦 %s', msg.content.toString())
              console.log(' 📦 Create mew welcome pack for new customer...')
            },
            { noAck: true }
          )
        })
      })
    }
  )
}

async function emailService() {
  const conn = amqp.connect(
    'amqp://localhost',
    (err, conn) => {
      conn.createChannel((err, ch) => {
        var ex = 'Customer created event'

        ch.assertExchange(ex, 'fanout', { durable: false })

        ch.assertQueue('', { exclusive: true }, (err, q) => {
          console.log(
            ' [*] Waiting for messages in %s. To exit press CTRL+C',
            q.queue
          )
          ch.bindQueue(q.queue, ex, '')

          ch.consume(
            q.queue,
            msg => {
              console.log(' ✉️  %s', msg.content.toString())
              console.log(
                ' ✉️  Construct new email and send to new customer...'
              )
            },
            { noAck: true }
          )
        })
      })
    }
  )
}

loyaltyService()
postService()
emailService()

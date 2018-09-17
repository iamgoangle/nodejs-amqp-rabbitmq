// Do not use this code on your production
const q = 'Customer created event'
const amqp = require('amqplib').connect('amqp://localhost')

async function customerService(msg) {
  console.time('customerService')
  console.log(`%s  Launch publisher...`, '🚁')
  try {
    const conn = await amqp
    const ch = await conn.createChannel()
    ch.assertExchange(q, 'fanout', { durable: false })

    await ch.publish(q, 's', new Buffer(msg))

    console.log(`😊  Topic ${q} has been created`)
    console.log(`😊  Success! send ${msg} to queue`)
    console.timeEnd('customerService')
  } catch (e) {
    console.error(`🙅  Cannot send to queue`)
  }
}

customerService(`New customer id=12345 has been created`)

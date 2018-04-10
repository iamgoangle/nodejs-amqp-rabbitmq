/**
 * Spike - Message Queue & Message Broker integration with NodeJS
 * @author  Teerapong, Singthong
 */

const q = 'tasks';
const open = require('amqplib').connect('amqp://localhost');

// Publisher
async function publisher(msg) {
  console.log(`%s  Launch publisher...`, '🚁');
  try {
    const conn = await open;  // open connection
    const ch = await conn.createChannel();  // create channel
    const assertQueue = await ch.assertQueue(q, true); // once queue error re-enqueue

    const message = msg;
    const sendToQueue = await ch.sendToQueue(q, new Buffer(message));
    console.log(`😊  Success! send ${message} to queue`);
  } catch (e) {
    console.error(`🙅  Cannot send to queue`);
  }
}

Array(10000).fill().map((v, i) => {
  publisher(`Hello ${i}`);
});

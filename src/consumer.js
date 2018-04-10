/**
 * Spike - Consumer Message Queue
 * @author  Teerapong, Singthong
 */

const q = 'tasks';
const open = require('amqplib').connect('amqp://localhost');

async function consumer() {
  console.log(`%s  Launch consumer...`, '🚁');
  try {
    const conn = await open;  // open connection
    const ch = await conn.createChannel();  // create channel
    const assertQueue = await ch.assertQueue(q); // once queue error re-enqueue

    await ch.consume(q, (msg) => {
      if (msg === null) {
        throw `🙉 Error to consume the queue`;
      }

      console.log(`😊  Success! retrieve message from queue`);
      console.log(msg.content.toString());
      ch.ack(msg);
    }, { noAck: false });
  } catch (e) {
    console.error(`🙅  Cannot connect to queue`);
  }
}

consumer();
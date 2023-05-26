const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
        origin: "*"
      }
});
var amqplib = require('amqplib/callback_api');

var APPRABMQ
var mainChannel
var exchange = 'direct'
try {
    amqplib.connect('amqp://rabbitmq', function(error0, conn) {			
    if (error0) {
        throw error0;
    }
    conn.createChannel(function(error1, channel) {
      if (error1) {
          throw error1;
      }
      channel.assertExchange(exchange, 'direct', {
        durable: false
      });
      mainChannel=channel
    })
    APPRABMQ=conn
})
} catch (error) {
    throw error
}


io.on('connection', (socket) => {
    socket.on('results', (res)=>{
        let qmsg = JSON.stringify(res)
        if(mainChannel){
                
          mainChannel.assertQueue('', {
            exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            var correlationId = generateUuid();
            mainChannel.consume(q.queue, function(msg) {
                if (msg.properties.correlationId === correlationId) {
                    console.log(' [.] Got %s', msg.content.toString());
                    socket.emit("userRes", msg.content.toString());
                    mainChannel.deleteQueue(q.queue)
                    return
                }
            }, {
                noAck: true
            });
  
            mainChannel.sendToQueue('rpc_queue',
                Buffer.from(qmsg.toString()), {
                    correlationId: correlationId,
                    replyTo: q.queue
                });
        });
		} else {
			socket.emit('RabbitMQ is off',function(sresp){});
		}
    })
    /* socket.on('user',(uid)=>{
      
      if(mainChannel){
         
        mainChannel.assertQueue('', {
          exclusive: true
      }, function(error2, q) {
          if (error2) {
              throw error2;
          }
          var correlationId = generateUuid();
          mainChannel.consume(q.queue, function(msg) {
              if (msg.properties.correlationId === correlationId) {
                  console.log(' [.] Got %s', msg.content.toString());
                  socket.emit("userRes", msg.content.toString());
                  mainChannel.deleteQueue(q.queue)
              }
          }, {
              noAck: true
          });

          mainChannel.sendToQueue('rpc_queue',
              Buffer.from(uid.toString()), {
                  correlationId: correlationId,
                  replyTo: q.queue
              });
      });
                
            
        }else{
          socket.emit('RabbitMQ is off',function(sresp){});
        }
    }) */
  });
  
  server.listen(3001, () => {
    console.log('listening on *:3001');
  });


function generateUuid() {
    return Math.random().toString() +
           Math.random().toString() +
           Math.random().toString();
  }
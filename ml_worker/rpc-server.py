import json
import pika
from functions import *
import time

print('STARTED WORKER 2')

connection = pika.BlockingConnection(
pika.ConnectionParameters(host='rabbitmq'))
 

channel = connection.channel()

channel.queue_declare(queue='user_queue')


def on_request(ch, method, props, body):
   
    print(int(body))
    response = hotStart(int(body))
    print(response)

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=json.dumps(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='user_queue', on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
channel.start_consuming()
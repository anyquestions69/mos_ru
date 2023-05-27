import json
import uuid
import pika
from functions import *
import time

print('STARTED WORKER 1')

connection = pika.BlockingConnection(
pika.ConnectionParameters(host='rabbitmq'))
 
channel = connection.channel()

channel.queue_declare(queue='rpc_queue')


def on_request(ch, method, props, body):
   
    print(json.loads(body))
    response = json.dumps(['Образование', 'Творчество'])

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)

consumer_tag = uuid.uuid1().hex
channel.basic_qos(prefetch_count=1)

channel.basic_consume(queue='rpc_queue',consumer_tag=consumer_tag, on_message_callback=on_request)

print(" [x] Awaiting RPC requests", consumer_tag)
channel.start_consuming()
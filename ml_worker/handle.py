import json
import pika
from functions import *

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))

channel = connection.channel()

channel.queue_declare(queue='test_queue')



def on_request(ch, method, props, body):
   
    print(body)
    response = json.dumps({"test":"ok"})

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='test_queue', on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
channel.start_consuming()
FROM python:3.8-alpine

RUN apk update && apk add --no-cache \
    gcc python3-dev 

WORKDIR /ml_worker
COPY requirements.txt /ml_worker/

RUN pip3 install -r ./requirements.txt --verbose
COPY . /ml_worker/

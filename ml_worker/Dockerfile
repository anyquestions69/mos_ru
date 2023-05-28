FROM python:3.10.4

WORKDIR /ml_worker 

#RUN apt update -y
RUN python -m pip install --upgrade pip

COPY . /ml_worker

RUN pip3 install -r ./requirements.txt --verbose
RUN chmod a+x ./run.sh
RUN chmod +x /ml_worker/wait-for-it.sh

CMD [ "python3", "/ml_worker/rpc-server.py" ]

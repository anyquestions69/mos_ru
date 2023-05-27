#!/bin/bash

exec python3 /ml_worker/rpc-server.py &
exec python3 /ml_worker/handle.py
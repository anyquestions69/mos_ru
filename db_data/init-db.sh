#!/bin/bash
set -e
ser -x

pg_restore -C--dbname "$POSTGRES_DB" /var/lib/postgresql/restore.sql
FROM postgres:12

ADD ./dump.sql /docker-entrypoint-initdb.d/dump.sql

#CMD [ "pg_restore" , "-f /docker-entrypoint-initdb.d/dump.sql"]
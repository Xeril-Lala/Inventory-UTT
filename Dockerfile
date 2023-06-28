FROM mysql
COPY ./env/*.sql /docker-entrypoint-initdb.d/
CMD ["mysqld"]

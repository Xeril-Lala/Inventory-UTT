FROM mysql
ENV MYSQL_ROOT_PASSWORD=admin
COPY ./env/*.sql /docker-entrypoint-initdb.d/
CMD ["mysqld"]

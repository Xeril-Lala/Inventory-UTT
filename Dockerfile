FROM mysql
ENV MYSQL_ROOT_PASSWORD=admin
COPY *.sql /docker-entrypoint-initdb.d/
CMD ["mysqld"]

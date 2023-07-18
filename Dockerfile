FROM mysql
COPY ./env/*.sql /docker-entrypoint-initdb.d/
RUN ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime
RUN echo "America/Los_Angeles" > /etc/timezone
CMD ["mysqld"]


cat setup_mysql_dev.sql | mysql -uroot -p
MYSQL_USER=dev MYSQL_PWD=dev_pwd MYSQL_HOST=localhost MYSQL_DB=dev_db ENV=db python3 -m api.v1.app

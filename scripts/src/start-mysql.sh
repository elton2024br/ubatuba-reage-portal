#!/bin/bash
BASEDIR=/home/runner/workspace/.local/mysql
DATADIR=$BASEDIR/data
SOCKET=$BASEDIR/run/mysql.sock

mkdir -p "$BASEDIR/run"

if [ ! -d "$DATADIR/mysql" ]; then
  echo "Initializing MariaDB data directory with mysql_install_db..."
  mysql_install_db \
    --datadir="$DATADIR" \
    --auth-root-authentication-method=normal \
    --skip-test-db 2>&1

  if [ $? -ne 0 ]; then
    echo "ERROR: mysql_install_db failed" >&2
    exit 1
  fi

  echo "Starting temporary MariaDB to create application database..."
  mariadbd \
    --datadir="$DATADIR" \
    --socket="$SOCKET" \
    --port=3306 \
    --bind-address=127.0.0.1 \
    --innodb-use-native-aio=0 \
    --performance-schema=OFF \
    --log-warnings=0 \
    --innodb-buffer-pool-size=32M &
  TEMP_PID=$!

  for i in $(seq 1 30); do
    if mysql -u root --socket="$SOCKET" -e "SELECT 1" >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  mysql -u root --socket="$SOCKET" -e "CREATE DATABASE IF NOT EXISTS ubatuba_reage;"
  echo "Application database created."

  kill $TEMP_PID 2>/dev/null
  wait $TEMP_PID 2>/dev/null
  echo "MariaDB initialized."
fi

echo "Starting MariaDB..."
exec mariadbd \
  --datadir="$DATADIR" \
  --socket="$SOCKET" \
  --port=3306 \
  --bind-address=127.0.0.1 \
  --innodb-use-native-aio=0 \
  --performance-schema=OFF \
  --log-warnings=0 \
  --innodb-buffer-pool-size=32M

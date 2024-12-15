#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 $host; do
  echo "Waiting for database connection..."
  sleep 2
done

echo "Database is up - executing command"
exec $cmd
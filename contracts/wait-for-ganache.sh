#!/bin/sh
# Wait until Ganache is ready
while ! nc -z ganache 9545; do
  echo "Waiting for Ganache at ganache:9545..."
  sleep 1
done

echo "Ganache is up! Running migrate..."

# Now migrate
truffle migrate --reset --network development

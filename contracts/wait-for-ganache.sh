#!/bin/sh

echo "Waiting for Ganache to be ready..."

while ! nc -z ganache 9545; do
  sleep 1
done

echo "Ganache is up!"


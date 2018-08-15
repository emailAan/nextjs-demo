#!/usr/bin/env bash

docker build --rm -f Dockerfile -t avinty/avinty-epd-agenda:latest .  --build-arg HTTP_PROXY="http://192.168.1.90:8080" --build-arg HTTPS_PROXY="http://192.168.1.90:8080"

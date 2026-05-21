#!/bin/sh
export IMAGE_VERSION="0.0.1"

docker build -t interlan.cr.cloud.ru/shiskitech:$IMAGE_VERSION .
docker push interlan.cr.cloud.ru/shiskitech:$IMAGE_VERSION

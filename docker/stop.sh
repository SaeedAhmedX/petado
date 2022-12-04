#!/bin/bash
dir=$(dirname $(realpath $0));

docker-compose --file $dir/../docker-compose.yml down
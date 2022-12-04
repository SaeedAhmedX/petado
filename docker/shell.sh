#!/bin/bash
dir=$(dirname $(realpath $0));

CONTAINER="$1"

case "$CONTAINER" in
   "server") docker exec -it --user developer petado_server /bin/bash
   ;;
   "mysql") docker exec -it petado_mysql /bin/sh 
   ;;
   "nginx") docker exec -it petado_nginx /bin/sh 
   ;;
esac

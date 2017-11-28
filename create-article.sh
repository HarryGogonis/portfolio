#!/usr/bin/env sh

read -r -p 'Title: ' TITLE
read -r -p 'Category: ' CATEGORY
read -r -p 'Description: ' DESCRIPTION

DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
SHORT_DATE="$(date -u +"%Y-%m-%d")"

URI_PATH="$(echo "$TITLE" | tr "[:upper:]" "[:lower:]" |  sed -e "s/ /-/g" -e "s/[^A-z0-9\-]//g")"
DEST_PATH="pages/articles/$SHORT_DATE-$URI_PATH/"

mkdir $DEST_PATH

sed -e "s/{title}/\"$TITLE\"/" \
  -e "s/{category}/\"$CATEGORY\"/" \
  -e "s/{description}/\"$DESCRIPTION\"/" \
  -e "s/{date}/\"$DATE\"/" \
  -e "s/{path}/\"$URI_PATH\"/" \
  template.md > $DEST_PATH/index.md

echo $DEST_PATH

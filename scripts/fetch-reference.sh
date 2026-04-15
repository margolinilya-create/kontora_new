#!/bin/bash
base="http://kontora.futuguru.com"
mkdir -p /tmp/ref-audit

fetch() {
  local key="$1"
  local path="$2"
  curl -sS --noproxy '*' "${base}${path}" -o "/tmp/ref-audit/${key}.html" 2>/dev/null
  size=$(/usr/bin/wc -c < "/tmp/ref-audit/${key}.html")
  printf "%-16s %-50s %s bytes\n" "$key" "$path" "$size"
}

fetch "home" "/"
fetch "blog" "/tut-sharyat-za-stikeri-i-nakleiki/"
fetch "howto" "/kak-podgotovit-maket-k-pechati/"
fetch "contacts" "/kontakty/"
fetch "catalog" "/catalog/"
fetch "product-tmpl" "/stranica-tovara/"
fetch "p-kontur" "/stikeri-s-konturnoi-rezkoi/"
fetch "p-3d-pack" "/3d-stickerpaki/"
fetch "p-3d-stickers" "/3d-stikeri/"
fetch "p-rect" "/pryamougolnie-i-kvadratnie-nakleiki/"
fetch "p-nadsechka" "/stikeri-s-nadsechkoy/"
fetch "p-big" "/bolshie-stickeri/"
fetch "p-stickerpak" "/stikerpaki/"

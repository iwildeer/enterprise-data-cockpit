#!/bin/bash
# 将 4 组逐帧 PNG 动画转为带透明通道的 WebP，输出到 public/seq/。
# 帧号区间只覆盖旧代码实际会显示的帧（旧 IIFE 播不到序列尾部，
# 尾部文件不转换），文件名统一为 ASCII 零填充数字。
#
# 用法：node scripts/convert-sequences.sh [name...]
#   name ∈ economy triple party risk，缺省全部
set -euo pipefail
cd "$(dirname "$0")/.."

Q=80 ALPHA_Q=90
CONVERT="cwebp -quiet -m 6 -sharp_yuv"

convert_range() { # name src_dir prefix first last pad
  local name=$1 src=$2 prefix=$3 first=$4 last=$5 pad=$6
  local out="public/seq/$name"
  mkdir -p "$out"
  local n=0
  for i in $(seq -f "%0${pad}g" "$first" "$last"); do
    local f="$src/$prefix$i.png"
    [ -f "$f" ] || { echo "  !! 缺帧: $f"; continue; }
    $CONVERT -q "$Q" -alpha_q "$ALPHA_Q" "$f" -o "$out/$i.webp" &
    n=$((n+1))
    if (( n % 16 == 0 )); then wait; fi
  done
  wait
  echo "$name: $n 帧 → $out"
}

if [ $# -eq 0 ]; then set -- economy triple party risk; fi
for name in "$@"; do
  case $name in
    economy) convert_range economy assets/frames            ""          0 297 3 ;;
    triple)  convert_range triple  assets/images/iframes4 "智慧企业_" 0 297 5 ;;
    party)   convert_range party   assets/images/iframes5 "KV_"        0 297 5 ;;
    risk)    convert_range risk   assets/images/iframes6 "智慧企业_" 4 199 5 ;;
    *) echo "unknown sequence: $name"; exit 1 ;;
  esac
done

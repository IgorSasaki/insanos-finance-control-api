#!/bin/sh
. "$(dirname "$0")/common.sh"

pnpm commitlint --edit "$1"

#!/bin/sh
set -euo pipefail

: "${TARGET_REPO:?TARGET_REPO env var required}"
: "${TARGET_TOKEN:?TARGET_TOKEN env var required}"

# Ensure we have all tags
git fetch --tags

# Find commit for PRODUCTION tag and its parent
prod_commit=$(git rev-list -n 1 PRODUCTION)
prev_commit=$(git rev-list -n 1 "${prod_commit}^")

# Determine server URL (defaults to github.com)
server="${GITHUB_SERVER_URL:-https://github.com}"
remote="https://${TARGET_TOKEN}@${server#https://}/${TARGET_REPO}.git"

# Force-push tag to target repository
git push "$remote" "${prev_commit}:refs/tags/PRODUCTION_FROM_THIS_PROJECT" --force

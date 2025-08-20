#!/bin/sh
set -euo pipefail

: "${TARGET_REPO:?TARGET_REPO env var required}"

# Ensure we have all tags
git fetch --tags

# Find commit for PRODUCTION tag and its parent
prod_commit=$(git rev-list -n 1 PRODUCTION)
prev_commit=$(git rev-list -n 1 "${prod_commit}^")

api="https://api.github.com/repos/${TARGET_REPO}/git/refs/tags/PRODUCTION_FROM_THIS_PROJECT"
auth="Authorization: token ${GITHUB_TOKEN}"

# If the tag exists, update it; otherwise create it
if curl -fsS -H "$auth" "$api" >/dev/null 2>&1; then
  curl -L -X PATCH -H "$auth" \
    -H "Content-Type: application/json" \
    -d "{\"sha\":\"${prev_commit}\",\"force\":true}" \
    "$api"
else
  curl -L -X POST -H "$auth" \
    -H "Content-Type: application/json" \
    -d "{\"ref\":\"refs/tags/PRODUCTION_FROM_THIS_PROJECT\",\"sha\":\"${prev_commit}\"}" \
    "https://api.github.com/repos/${TARGET_REPO}/git/refs"
fi

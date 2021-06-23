#!/bin/bash
echo "Start building site"
npm run build
echo "Remove _site folder from _site-branch"
rm -rf _site-branch/_site
echo "Start copy"
cp -R _site _site-branch
echo "End Copy"
cd _site-branch
git add .
git commit -m "Updated: `date +'%Y-%m-%d %H:%M:%S'`"
git push
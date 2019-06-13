#!/usr/bin/env bash
start=`date +%s`

printf "Starting build\n"

composer install

npm install --prefix web
npm run build --prefix web

bin/console doctrine:migrations:migrate --no-interaction

end=`date +%s`
printf "Time: "$((end-start))"s\n"
printf "DONE! \n"
#! /bin/bash

messages=(
    "Oppdatering fra forrige"
    "Sjekk mot git repo"
    "Sist oppdatering før avslutting av dagen"
    "Bugfix og justering"
    "Endring basert fra nettleser/items"
    "Oppdatert"
    "Forbedret"
)



for i in {1..7};
do 
rand_index=$((RANDOM % ${#messages[@]}))
commitMessage="${messages[$rand_index]}"

if git diff-index --quiet HEAD --;
then
echo "$[i] No changes to commit nå"
else
	git add .
	git commit -m "$commitMessage" 
	git push
fi

sleep 60
done

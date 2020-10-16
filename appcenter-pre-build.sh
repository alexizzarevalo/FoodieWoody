GOOGLE_JSON_FILE=$APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json
if [ -e "$GOOGLE_JSON_FILE" ]
then
    echo "Updating Google Json"
    echo "$GOOGLE_JSON" > $GOOGLE_JSON_FILE
    sed -i -e 's/\\"/'\"'/g' $GOOGLE_JSON_FILE
    echo "File content:"
    cat $GOOGLE_JSON_FILE
else
    echo "No se cargo el archivo"
fi
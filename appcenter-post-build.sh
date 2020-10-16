echo "List files in APPCENTER_OUTPUT_DIRECTORY"
ls $APPCENTER_OUTPUT_DIRECTORY

# Verify if application build works
if [ "$AGENT_JOBSTATUS" == "Succeeded" ];
then
	echo "Starting building UI test"
	echo "Compiled project to run UI test"
	# Start metro server npm run start
	# npm install -g appcenter-cli
	npm run start & # Avoid blocking terminal
	gem install xamarin-test-cloud
	echo "Running test in App Center Test"
	# App does not exist at path: /Users/runner/work/1/a/build/app/build/outputs/apk/app-debug.apk 
	# App does not exist at path: /Users/runner/work/1/a/build/android/app/build/outputs/apk/*.apk	
	# App does not exist at path: /Users/runner/work/1/a/build/app-debug.apk
	APPPATH=$APPCENTER_OUTPUT_DIRECTORY/app-release.apk 
	PROJECTDIR=$APPCENTER_OUTPUT_DIRECTORY/features
	appcenter test run calabash --app "foodiewoody/Foodie-Woody" --devices 5f746b78 --app-path $APPPATH --test-series "master" --locale "en_US" --project-dir $PROJECTDIR --token $API_TOKEN --async	
	echo "Post build end test sended"
else
	echo "No test createded because build fails"
fi

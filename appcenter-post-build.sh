# exit when any command fails
set -e

echo ">List files in APPCENTER_OUTPUT_DIRECTORY"
ls $APPCENTER_OUTPUT_DIRECTORY
echo ">List files in Actual directory ."
ls .

# Verify if application build works
if [ "$AGENT_JOBSTATUS" == "Succeeded" ];
then
	echo ">Starting building UI test"
	# echo ">Compiled project to run UI test"
	# Start metro server npm run start
	# npm install -g appcenter-cli
	npm run start & # Avoid blocking terminal
	# echo "Global gem install"
	# gem install xamarin-test-cloud
	echo ">Bundle gem install"
	bundle install
	echo ">Building test server"
	APPPATH=$APPCENTER_OUTPUT_DIRECTORY/app-release.apk 
	bundle exec calabash-android build $APPPATH
	echo ">Running test in App Center Test"
	bundle exec appcenter test run calabash --app "foodiewoody/Foodie-Woody" --devices 5f746b78 --app-path $APPPATH --test-series "master" --locale "en_US" --project-dir ./features --token $API_TOKEN --async
	killall node
	echo ">Post build end test sended"
	exit 0
else
	echo ">No test createded because build fails"
fi	

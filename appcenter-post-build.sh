# exit when any command fails
# set -e

# Verify if application build works
if [ "$AGENT_JOBSTATUS" == "Succeeded" ];
then
	echo ">Starting building UI test"
	npm run start & # Avoid blocking terminal
	# PID=$$ # Save pid process
	echo ">Bundle gem install"
	bundle install
	echo ">Building test server"
	APPPATH=$APPCENTER_OUTPUT_DIRECTORY/app-release.apk 
	bundle exec calabash-android build $APPPATH
	echo ">Login into appcetner using User Token"
	appcenter login --token $USER_TOKEN
	echo ">Running test in App Center Test"
	# Fixed error: empty email address repair removing --token 
	bundle exec appcenter test run calabash --app "foodiewoody/Foodie-Woody" --devices 5f746b78 --app-path $APPPATH --test-series "master" --locale "en_US" --project-dir ./features --async
	echo ">Test successfully send to AppCenter"
	# Last sentence executed before crash
	echo ">Killing process"
	#Fixed Error The STDIO streams did not close within 10 seconds of the exit event from process '/bin/bash'. This may indicate a child process inherited the STDIO streams and has not yet exited.
	#Fixed Error Exit code 143 returned from process: file name '/Users/runner/runners/2.175.2/externals/node/bin/node', arguments '"/Users/runner/work/_tasks/ShellScript_6c731c3c-3c68-459a-a5c9-bde6e6595b5b/2.165.2/shellscript.js"'. 
	pkill -f node # killall node
	echo ">Post build end test sended"
else
	echo ">No test createded because build fails"
fi	

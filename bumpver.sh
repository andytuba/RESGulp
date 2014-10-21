#Edit this to the location of your RES files
SOURCE_DIR=~/Reddit-Enhancement-Suite
 
echo
echo -n  "Please enter the current version of RES: "
read curver
echo -n "Enter the new version number of RES: "
read nextver
echo Bumping files..
echo
 
export curver
export nextver
expot SOURCE_DIR
 
perl -pi -e 's/$ENV{curver}/$ENV{nextver}/g' "$ENV{SOURCE_DIR}/Chrome/manifest.json"
perl -pi -e 's/$ENV{curver}/$ENV{nextver}/g' "$ENV{SOURCE_DIR}/Opera/config.xml"
perl -pi -e 's/$ENV{curver}/$ENV{nextver}/g' "$ENV{SOURCE_DIR}/OperaBlink/manifest.json"
perl -pi -e 's/$ENV{curver}/$ENV{nextver}/g' "$ENV{SOURCE_DIR}/RES.safariextension/Info.plist"
perl -pi -e 's/$ENV{curver}/$ENV{nextver}/g' "$ENV{SOURCE_DIR}/XPI/package.json"
perl -pi -e 's/$ENV{curver}/$ENV{nextver}/g' "$ENV{SOURCE_DIR}/lib/reddit_enhancement_suite.user.js"
perl -pi -e 's/$ENV{curver}/$ENV{nextver}/g' "$ENV{SOURCE_DIR}/package.json"
 
echo Done
echo

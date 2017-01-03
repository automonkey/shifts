#Shifts [![Build Status](https://snap-ci.com/automonkey/shifts/branch/master/build_image)](https://snap-ci.com/automonkey/shifts/branch/master)

Web service to generate calendar data for multiple events at once, like when entering work shifts for a week.

An instance is hosted at [www.shifts.benyon.io](http://www.shifts.benyon.io).

##Running

Run `npm start` to start the node service.

##Test

Run `npm test` to run the tests.

##CI

The script ci-env-setup.sh is included in the project for initialising the environment for automated build jobs. It assumes availability of nvm, and should be sourced as part of the build job (not executed). For example, a test stage might include the following steps:

```
source ci-env-setup.sh
npm test
```

The setup script is sourced due to the way nvm works meaning the nvm command is not accessible from executed scripts.
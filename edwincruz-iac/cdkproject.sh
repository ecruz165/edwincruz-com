#!/bin/bash

#  EXAMPLE HOW TO USE THIS SCRIPT
# ./cdkproject setup edwincruz-com
# ./cdkproject deploy edwincruz-com dev
# ./cdkproject synth edwincruz-com dev
# ./cdkproject destroy edwincruz-com dev

showEnvironmentVariables() {
  echo 'PROJECT_NAME: ' $PROJECT_NAME
  echo 'PROJECT_CONFIG: ' $PROJECT_CONFIG
  echo 'ACCOUNT:' $ACCOUNT
  echo 'REGION:' $REGION
  echo 'PROJECT_KEY:' $PROJECT_KEY
  echo 'PROJECT_ZONE_NAME:' $PROJECT_ZONE_NAME
  echo 'ENV_CONFIG:' $ENV_CONFIG
}

showNameServers() {
  # List name servers
  aws route53 list-hosted-zones | jq -r '.HostedZones[0].Id' | xargs aws route53 get-hosted-zone --id | jq -r '.DelegationSet.NameServers'
}

showExampleUsage() {
  echo "ERROR: Script being used improperly."
  echo "EXPECTING: ./cdkproject.sh cmd project env"
  echo "EXAMPLE 1: ./cdkproject.sh setup edwincruz-com"
  echo "EXAMPLE 2: ./cdkproject.sh deploy edwincruz-com dev"
  exit -1
}

loadEnvironmentVariables() {
  envName=$1
  ACCOUNT=$(echo $(aws sts get-caller-identity | jq -r ".Account"))
  REGION=$(echo $(aws configure list | grep region | awk '{print $2}'))
  PROJECT_KEY=$(cat $PROJECT_CONFIG | jq -r '.projectKey')
  PROJECT_ZONE_NAME=$(cat $PROJECT_CONFIG | jq -r '.projectZoneName')
  ENV_CONFIG=$(cat $PROJECT_CONFIG | jq '.deployEnvironments[] | select(.envName=="'$envName'")|@json')
  ENV_KEY=$(cat $PROJECT_CONFIG | jq -r '.deployEnvironments[] | select(.envName=="'$envName'")| .envKey ')
  echo 'Loading env: ' $ENV_KEY '|' $ENV_CONFIG
}

runSetup() {
  echo 'EXECUTING: ./cdkproject setup '$PROJECT_NAME
  echo 'cdk deploy ' $PROJECT_KEY'CommonHostedZoneStack'  $PROJECT_KEY'CommonCertificateStack'

  # creates hostedZone
  ACCOUNT=$ACCOUNT \
    REGION=$REGION \
    PROJECT_NAME=$PROJECT_NAME \
    PROJECT_KEY=$PROJECT_KEY \
    PROJECT_ZONE_NAME=$PROJECT_ZONE_NAME \
    cdk deploy $PROJECT_KEY'CommonHostedZoneStack' $PROJECT_KEY'CommonCertificateStack'
}

runEnvDestroyCommand() {
  echo 'EXECUTING: ./cdkproject destroy '$PROJECT_NAME
  echo 'cdk destroy ' $PROJECT_KEY'EnvAppStack'

  # creates components to support a environment
  ACCOUNT=$ACCOUNT \
    REGION=$REGION \
    PROJECT_NAME=$PROJECT_NAME \
    PROJECT_KEY=$PROJECT_KEY \
    PROJECT_ZONE_NAME=$PROJECT_ZONE_NAME \
    ENV_CONFIG=$ENV_CONFIG \
    cdk $1 $PROJECT_KEY'EnvAppStack'
}

runCommand() {
  echo 'EXECUTING: ./cdkproject' $1 ' ' $PROJECT_NAME ' ' $ENV_NAME
  echo 'cdk '$1 ' ' $PROJECT_KEY$ENV_KEY'EnvWebsiteBucketsStack ' $PROJECT_KEY$ENV_KEY'EnvAppStack'

  # creates components to support a environment
  ACCOUNT=$ACCOUNT \
    REGION=$REGION \
    PROJECT_NAME=$PROJECT_NAME \
    PROJECT_KEY=$PROJECT_KEY \
    PROJECT_ZONE_NAME=$PROJECT_ZONE_NAME \
    ENV_CONFIG=$ENV_CONFIG \
    cdk $1 $PROJECT_KEY$ENV_KEY'EnvWebsiteBucketsStack' $PROJECT_KEY$ENV_KEY'EnvAppStack'
}

validateCdkCommand() {
  cdkCommands+=("setup","deploy","destroy","synth","diff")

  if [[ " ${cdkCommands[*]} " =~ "$1" ]]; then
    echo 'valid command: ' $1
  else
    echo 'ERROR: Invalid command'
    echo 'Valid values: ' $cdkCommands
    exit -1
  fi
}

validateProjectName() {
  if [ "$PROJECT_NAME" != "$1" ]; then
    echo 'ERROR: Invalid projectName'
    echo 'Valid values: ' $PROJECT_NAME
    exit -1
  else
    echo 'valid projectName: ' $1
  fi
}

validateEnvironments() {
  environments+=("dev","c1","int","test","uat","stage","qa","preprod","production")

  if [ -z "$1" ] || [[ " ${environments[*]} " =~ "$1" ]]; then
    echo 'valid environment: ' $1
  else
    echo 'ERROR: Invalid environment'
    echo 'Valid values: ' $environments
    exit -1
  fi
}

validateCdkCommand $1
validateProjectName $2
validateEnvironments $3

if [ "$PROJECT_NAME" = "$2" ]; then
  loadEnvironmentVariables $3
  showEnvironmentVariables

  if [ "$1" = "setup" ] && [ ! -z "$2" ] && [ -z "$3" ]; then
    echo 'runSetup'
    runSetup
    showNameServers

  elif [ "$1" != "setup" ] && [ ! -z "$1" ] && [ ! -z "$2" ] && [ ! -z "$3" ] && [ -z "$4" ]; then
    echo 'runCommand' $1 $2 $3
    runCommand $1 $2 $3

  else
    showExampleUsage

  fi

else
  showExampleUsage

fi

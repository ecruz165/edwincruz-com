#!/bin/bash

## JUST FOR REFERENCE
## Here is an example of listing all key, values and possibly passing to a shell program parameters
# aws sts get-caller-identity | jq -r 'to_entries[] | @sh "\(.key|tostring)=\(.value|tostring)"'
ENV=$1

run_cdk() {
 echo $ENV
 echo $PROJECT_CONFIG
 cdk deploy ECHttpApiStack --verbose
# ECZipWebsiteContentsStack #ECWebsiteS3BucketStack
  #--parameters env=$ENV --parameters projectConfig=$PROJECT_CONFIG
# S3Bucket  ECVpcStack
 exit
}


init_cdk() {
  # config is picked up from environment variable $PROJECT_CONFIG set by direnv when in project folder
  CONFIG=$PROJECT_CONFIG
  cat $CONFIG | jq -r '.project'
  cat $CONFIG | jq -r '.name'
  cat $CONFIG | jq -r '.prefix'
  aws sts get-caller-identity | jq -r '.Account'
  aws configure list | awk '{print $2}' | tail -1
  cat $CONFIG | jq -r --arg ENVARG "$ENV" '.environments | map(select(.environment==$ENVARG))[0]'
   echo "Do you wish to continue?"
      select yn in "Yes" "No"; do
        case $yn in
          Yes ) run_cdk;;
          No ) exit;;
        esac
      done
}

case $ENV in

  "dev")
    init_cdk;;

  "int")
    init_cdk;;

  "test")
    init_cdk;;

  "stage")
    init_cdk;;

  "qa")
    init_cdk;;

  "production")
    init_cdk;;

  *)
    echo "Script expects one of the following args: dev | int | test | stage | qa | production"
    exit -5;
    ;;

esac

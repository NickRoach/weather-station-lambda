import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();

s3.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

var params = {
  Bucket: process.env.AWS_BUCKET,
  Key: process.env.AWS_FILENAME,
};

function getObject() {
  return s3
    .getObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
    })
    .promise();
}

function convertToJSON(data) {
  return JSON.parse(data.Body.toString("utf-8"));
}

function appendEntry(data) {
  data.push({
    direction: 160,
    speed: 15,
    time: Date.now(),
  });

  return data;
}

function putToS3(data) {
  params.Body = Buffer.from(JSON.stringify(data));

  s3.putObject(params, function (err, returnedData) {
    if (err) console.log(err, err.stack);
    else console.log(returnedData);
  });
}

//get the JSON file, then append the new data that has come in and then put it back to the s3 bucket
getObject().then((data) => putToS3(appendEntry(convertToJSON(data))));

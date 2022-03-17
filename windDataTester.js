let AWS = require("@aws-sdk/client-s3");
let dotenv = require("dotenv");

dotenv.config();

const s3 = new AWS.S3();

s3.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

let params = {
  Bucket: process.env.AWS_BUCKET,
  Key: process.env.AWS_FILENAME,
};

let putParams = {
  Bucket: process.env.AWS_BUCKET,
  Key: process.env.AWS_FILENAME,
};

function getObject() {
  console.log("getObject called");
  return s3
    .getObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
    })
    .promise();
}

function convertToJSON(data) {
  console.log("convertToJSON called");
  return JSON.parse(data.Body.toString("utf-8"));
}

function appendEntry(data, newData) {
  console.log("appendEntry called");
  data.push(newData);
  console.log("Appended data: ", data);
  return data;
}

async function putToS3(data) {
  console.log("putToS3 called");
  putParams.Body = Buffer.from(JSON.stringify(data));

  return s3
    .putObject(putParams, function (err, returnedData) {
      if (err) console.log(err, err.stack);
      else console.log(returnedData);
    })
    .promise();
}

exports.handler = async (event) => {
  console.log("handlerCalled");
  //get the JSON file, then append the new data that has come in and then put it back to the s3 bucket
  return getObject().then((data) =>
    putToS3(appendEntry(convertToJSON(data), event))
  );
};

// console.log(
//   handler({
//     direction: "new",
//     speed: 15,
//     time: Date.now(),
//   })
// );

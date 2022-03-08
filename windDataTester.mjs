import AWS from "aws-sdk";
import jsonfile from "jsonfile";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();

s3.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

var params = {
  Bucket: "weather-station69",
  Key: "windData.json",
};

function getObject() {
  const file = "./windData.json";

  let localData = jsonfile.readFile(file);

  localData.then((data) => appendEntry(data));

  //   s3.getObject(params, function (err, data) {
  //     if (err) console.log(err, err.stack);
  //     // an error occurred
  //     else appendEntry(JSON.parse(data.Body.toString("utf-8")));
  //   });
}

function appendEntry(data) {
  console.log("oldData:", data);
  data.push({
    direction: 160,
    speed: 15,
    time: Date.now(),
  });

  params.Body = Buffer.from(JSON.stringify(data));

  s3.putObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
}

getObject();

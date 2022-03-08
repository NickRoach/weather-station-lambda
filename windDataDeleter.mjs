import jsonfile from "jsonFile";

const file = "./windData.json";

let weatherData = jsonfile.readFile(file);

const addToWeatherData = (dataArray) => {
  dataArray.shift();
  jsonfile.writeFile(file, dataArray, { spaces: 2, EOL: "\r\n" });
};

weatherData.then((obj) => addToWeatherData(obj));

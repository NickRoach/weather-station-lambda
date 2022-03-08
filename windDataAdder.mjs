import jsonfile from "jsonfile";

const file = "./windData.json";

let weatherData = jsonfile.readFile(file);

const addToWeatherData = (dataArray) => {
  dataArray.push({
    direction: 160,
    speed: 15,
    time: Date.now(),
  });
  jsonfile.writeFile(file, dataArray, { spaces: 2, EOL: "\r\n" });
};

weatherData.then((obj) => addToWeatherData(obj));

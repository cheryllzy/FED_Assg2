const url =
  "https://billboard-api2.p.rapidapi.com/hot-100?date=2019-05-11&range=1-10";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1d92ffb23bmshf262547a90a2ec5p1ae019jsnbcac9cee8903",
    "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}

import React from "react";
import cities from "../../lib/city.list.json";

export async function getServerSideProps(context) {
  const cityId = getCity(context.params.city);
  if (!cityId) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${cityId.coord.lat}&lon=${cityId.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
//   console.log(data);

  const city1 = context.params.city;

  //   console.log(cityId)

  return {
    props: {
      city1: city1,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: getHourlyWeather(data.hourly),
    },
  };
}

const getCity = (param) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  // console.log(splitCity)
  // -1 to get the last element of the URL, which is the ID
  const id = splitCity[splitCity.length - 1];
  // console.log(id)

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() === id);
  //id is a number, need to convert to string

  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData) => {
  const current = new Date();
  current.setHours(current.getHours(), 0, 0, 0);
  //displays the hours that are in the rest of the day
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const currentTimeStamp = Math.floor(current.getTime() / 1000);
  const tomorrowTimeStamp = Math.floor(tomorrow.getTime() / 1000);
  const todayData = hourlyData.filter((data) => data.dt < tomorrowTimeStamp);
  return todayData;
};

export default function City({
  city1,
  hourlyWeather,
  currentWeather,
  dailyWeather,
}) {
  return (
    <div>
      <h1>City Page</h1>
      <h2>{city1}</h2>
      {/* {console.log(city)} */}
    </div>
  );
}

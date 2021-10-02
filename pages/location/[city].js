import React from "react";
import cities from "../../lib/city.list.json"

export async function getServerSideProps(context) {
  const cityId = getCity(context.params.city);
  if (!cityId) {
      return {
          notFound: true,
      };
  };

  const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityId.coord.lat}&lon=${cityId.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
      );
  const data = await res.json();

  if(!data) {
      return {
          notFound: true, 
      }
  }
  console.log(data);

  const city1 = context.params.city;

//   console.log(cityId)

  return {
    props: {
      city1: city1,
    },
  };
}

const getCity = param => {
    const cityParam = param.trim();
    const splitCity = cityParam.split("-");
    // console.log(splitCity)
    // -1 to get the last element of the URL, which is the ID
    const id = splitCity[splitCity.length - 1];
    // console.log(id)

    if(!id) {
        return null;
    }

    const city = cities.find(city => city.id.toString() === id);
    //id is a number, need to convert to string 

    if(city) {
        return city;
    } else {
        return null;
    }
}

export default function City({city}) {
  return (
    <div>
      <h1>City Page</h1>
      <h2>{city}</h2>
      {/* {console.log(city)} */}
    </div>
  );
}

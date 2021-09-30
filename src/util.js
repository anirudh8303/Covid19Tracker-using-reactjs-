import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recoveres: {
    hex: "#7dd71d",
    multiplier: 600,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 1000,
  },
};
export const sortData = (data) => {
  const sorteddata = [...data];

  sorteddata.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sorteddata;
};
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div>
          <div
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div>{country.country}</div>
          <div>Cases: {numeral(country.cases).format("0,0")}</div>
          <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
          <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  ));

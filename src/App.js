import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Navigationbar from "./Navigationbar";
import Table from "./Table";
import { sortData } from "./util.js";
import {
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Card,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("World-Wide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://corona.lmao.ninja/v2/countries?yesterday&sort")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://corona.lmao.ninja/v2/countries?yesterday&sort")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sorteddata = sortData(data);
          setMapCountries(data);
          setTableData(sorteddata);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://corona.lmao.ninja/v2/countries?yesterday&sort"
        : `https://corona.lmao.ninja/v2/countries/${countryCode}?yesterday=true&strict=true&query`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  console.log("country info >>", countryInfo);
  return (
    <div className="App">
      <div className="app_nav">
        <Navigationbar />
        <div class="app_divide">
          <div className="app_left">
            <div className="app_header">
              <h2>Select Country</h2>
              <FormControl className="app_dropdown">
                <Select
                  variant="outlined"
                  value={country}
                  onChange={onCountryChange}
                >
                  {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="app_stats">
              <InfoBox
                title="Cases Today:"
                cases={countryInfo.todayCases}
                total={countryInfo.cases}
                color = "red"
              />
              <InfoBox
                title="Recovered Today:"
                cases={countryInfo.todayRecovered}
                total={countryInfo.recovered}
                color="lightgreen"
              />
              <InfoBox
                title="Deaths today:"
                cases={countryInfo.todayDeaths}
                total={countryInfo.deaths}
                color="red"
              />
            </div>
            <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
          </div>
          <div className="app_right">
            <Card>
              <CardContent>
                <h3>Live Cases By Countries</h3>
                <Table countries={tableData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { feature } from "topojson";
import { csv, json } from "d3";

export const loadAndProcessData = () =>
  Promise.all([
    csv("../data/avg_temps.csv"),
    json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json")
  ]).then(([csvData, topoJSONdata]) => {
    const rowByName = csvData.reduce((accumulator, d) => {
      if (d.name === "Fake Data") {
        accumulator["Fake Data"] = d;
      } else {
        accumulator[d.name] = d;
      }
      return accumulator;
    }, {});

    const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

    countries.features.forEach(d => {
      Object.assign(d.properties, rowByName[d.properties.name]);
    });

    let fake = {type: "Feature", properties: {name: "Fake Data"}}
    countries.features.push(fake);
    Object.assign(fake.properties, rowByName["Fake Data"]);
    console.log(countries.features)

    return countries;
  });

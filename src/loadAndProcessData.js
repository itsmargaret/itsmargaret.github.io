import { feature } from 'topojson';
import { csv, json } from 'd3';

export const loadAndProcessData = () => 
  Promise
    .all([
      csv('../data/avg_temps.csv'),
      json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json')
    ])
    .then(([csvData, topoJSONdata]) => {
      const rowByName = csvData.reduce((accumulator, d) => {
        accumulator[d.Name] = d;
        return accumulator;
      }, {});

      const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

      countries.features.forEach(d => {
        Object.assign(d.properties, rowByName[d.properties.name]);
      });

      return countries;
    });
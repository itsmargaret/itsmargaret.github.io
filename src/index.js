import { select, selectAll, scaleOrdinal, schemeSpectral } from "d3";
import { loadAndProcessData } from "./loadAndProcessData";
import { colorLegend } from "./colorLegend";
import { colorMap } from "./colorMap";
// import {yearSlider} from './yearSlider';

document.addEventListener("DOMContentLoaded", function() {
  const svg = select("svg");

  const colorMapG = svg.append("g");

  const colorLegendG = svg.append("g").attr("transform", `translate(40,310)`);

  const colorScale = scaleOrdinal(schemeSpectral[10]);

  //TODO review scale and edit for highs/lows after completing raw data
  // -7.4 - 29.7
  const colorValue = d => {
    if (
      d.properties[slider.property("value")] === undefined ||
      d.properties[slider.property("value")] < -4.2
    ) {
      return 'a';
    } else if (
      d.properties[slider.property("value")] >= -4.2 &&
      d.properties[slider.property("value")] < -.4
    ) {
      return 'b';
    } else if (
      d.properties[slider.property("value")] >= -.4 &&
      d.properties[slider.property("value")] < 3.4
    ) {
      return 'c';
    } else if (
      d.properties[slider.property("value")] >= 3.4 &&
      d.properties[slider.property("value")] < 7.2
    ) {
      return 'd';
    } else if (
      d.properties[slider.property("value")] >= 7.2 &&
      d.properties[slider.property("value")] < 11
    ) {
      return 'e';
    } else if (
      d.properties[slider.property("value")] >= 11 &&
      d.properties[slider.property("value")] < 14.8
    ) {
      return 'f';
    } else if (
      d.properties[slider.property("value")] >= 14.8 &&
      d.properties[slider.property("value")] < 18.6
    ) {
      return 'g';
    } else if (
      d.properties[slider.property("value")] >= 18.6 &&
      d.properties[slider.property("value")] < 22.4
    ) {
      return 'h';
    } else if (
      d.properties[slider.property("value")] >= 22.4 &&
      d.properties[slider.property("value")] < 26.2
    ) {
      return 'i';
    } else if (d.properties[slider.property("value")] >= 26.2) {
      return 'j';
    }
  };

  let selectedColorValue;
  let features;

  const onClick = d => {
    selectedColorValue = d;
    render();
  };

  const slider = select("#slider");
  const range = select("#range");
  const units = selectAll("input[name='units']");
  let unit;

  units.on("change", function() {
    console.log(this.value);
    if (this.value === "celsius") {
      unit = "C";
    } else {
      unit = "F";
    }
    render();
  });

  loadAndProcessData().then(countries => {
    let year;
    features = countries.features;
    render();

    const oninput = function() {
      range.property("innerHTML", slider.property("value"));
      year = slider.property("value");
      render(year);
    };

    //update slider with smooth interpolation
    slider.on("input", () => oninput());
  });

  const render = (year = 1901) => {
    colorScale
      .domain(features.map(colorValue))
      .domain(
        colorScale
          .domain()
          .sort()
          .reverse()
      )
      // console.log(colorScale.domain().sort());
      // use range if you don't want to specify number of colors in legend in ColorScale definition
      // .range(schemeSpectral[10]);

    colorLegendG.call(colorLegend, {
      colorScale,
      circleRadius: 8,
      spacing: 20,
      textOffset: 12,
      backgroundRectWidth: 175,
      onClick,
      selectedColorValue,
      unit
    });

    colorMapG.call(colorMap, {
      features,
      colorValue,
      colorScale,
      selectedColorValue,
      // year,
      slider
    });
  };
});

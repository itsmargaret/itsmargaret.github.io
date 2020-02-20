import {
  select,
  selectAll,
  scaleOrdinal,
  schemeSpectral,
  drag
} from "d3";
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
  // update to -22.3 ? - 29.7
  let colorValue = d => {
    if (
      d.properties[slider.property("value")] === undefined ||
      d.properties[slider.property("value")] < -15
    ) {
      return "a";
    } else if (
      d.properties[slider.property("value")] >= -15 &&
      d.properties[slider.property("value")] < -10
    ) {
      return "b";
    } else if (
      d.properties[slider.property("value")] >= -10 &&
      d.properties[slider.property("value")] < -5
    ) {
      return "c";
    } else if (
      d.properties[slider.property("value")] >= -5 &&
      d.properties[slider.property("value")] < 0
    ) {
      return "d";
    } else if (
      d.properties[slider.property("value")] >= 0 &&
      d.properties[slider.property("value")] < 5
    ) {
      return "e";
    } else if (
      d.properties[slider.property("value")] >= 5 &&
      d.properties[slider.property("value")] < 10
    ) {
      return "f";
    } else if (
      d.properties[slider.property("value")] >= 10 &&
      d.properties[slider.property("value")] < 15
    ) {
      return "g";
    } else if (
      d.properties[slider.property("value")] >= 15 &&
      d.properties[slider.property("value")] < 20
    ) {
      return "h";
    } else if (
      d.properties[slider.property("value")] >= 20 &&
      d.properties[slider.property("value")] < 25
    ) {
      return "i";
    } else if (d.properties[slider.property("value")] >= 25) {
      return "j";
    }
  };

  let selectedColorValue;
  let features;

  const onClick = d => {
    selectedColorValue = d;
    render();
  };

  const slider = select("#slider");
  // const range = select("#range");
  const units = selectAll("input[name='units']");
  let unit;

  units.on("change", function() {
    if (this.value === "celsius") {
      unit = "C";
    } else {
      unit = "F";
    }
    render();
  });

  loadAndProcessData().then(countries => {
    features = countries.features;
    render();

    // const oninput = function() {
    //   range.property("innerHTML", slider.property("value"));
    //   // timer(render).restart(render);
    //   render();
    // };

    // slider.call(
    //   drag()
    //     .on("start.interrupt", function() {
    //       slider.interrupt();
    //     })
    //     .on("start drag", function() {
    //       oninput();
    //     })
    // );

    //update slider with smooth interpolation
    slider.on("change", () => render());
  });

  const render = () => {
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
      .range(schemeSpectral[10]);

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
      slider
    });
  };
});

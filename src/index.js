import { select, selectAll, scaleOrdinal, schemeSpectral } from "d3";
import { loadAndProcessData } from "./loadAndProcessData";
import { colorLegend } from "./colorLegend";
import { colorMap } from "./colorMap";

document.addEventListener("DOMContentLoaded", function() {
  const svg = select("svg");

  const colorMapG = svg.append("g");

  const colorLegendG = svg.append("g").attr("transform", `translate(40,310)`);

  const colorScale = scaleOrdinal(schemeSpectral[10]);

  // update to -17.5 - 29.8 (-20 - 30); include undefined as separate category
  let colorValue = d => {
    if (d.properties[slider.property("value")] > 99 || !d.properties[slider.property("value")]) {
      return "a";
    } else if (d.properties[slider.property("value")] < -13.5) {
      return "b";
    } else if (
      d.properties[slider.property("value")] >= -13.5 &&
      d.properties[slider.property("value")] < -8
    ) {
      return "c";
    } else if (
      d.properties[slider.property("value")] >= -8 &&
      d.properties[slider.property("value")] < -2.5
    ) {
      return "d";
    } else if (
      d.properties[slider.property("value")] >= -2.5 &&
      d.properties[slider.property("value")] < 3
    ) {
      return "e";
    } else if (
      d.properties[slider.property("value")] >= 3 &&
      d.properties[slider.property("value")] < 8.5
    ) {
      return "f";
    } else if (
      d.properties[slider.property("value")] >= 8.5 &&
      d.properties[slider.property("value")] < 14
    ) {
      return "g";
    } else if (
      d.properties[slider.property("value")] >= 14 &&
      d.properties[slider.property("value")] < 19.5
    ) {
      return "h";
    } else if (
      d.properties[slider.property("value")] >= 19.5 &&
      d.properties[slider.property("value")] < 25
    ) {
      return "i";
    } else if (
      d.properties[slider.property("value")] >= 25 &&
      d.properties[slider.property("value")] < 99
    ) {
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
      slider,
      unit
    });
  };
});

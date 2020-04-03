import { select, selectAll, scaleOrdinal, schemeSpectral } from "d3";
import { loadAndProcessData } from "./loadAndProcessData";
import { colorLegend } from "./colorLegend";
import { colorMap } from "./colorMap";

document.addEventListener("DOMContentLoaded", function() {
  const svg = select("svg");

  const colorMapG = svg.append("g");

  const colorLegendG = svg.append("g").attr("transform", `translate(40,310)`);

  const colorScale = scaleOrdinal(schemeSpectral[10]);

  //TODO review scale and edit for highs/lows after completing raw data
  // update to -17.5 - 29.7 (-20 - 30); include undefined as separate category
  let colorValue = d => {
    if (d.properties[slider.property("value")] === "undefined") {
      return "a";
    } else if (
      d.properties[slider.property("value")] < -15
    ) {
      return "b";
    } else if (
      d.properties[slider.property("value")] >= -15 &&
      d.properties[slider.property("value")] < -9.5
    ) {
      return "c";
    } else if (
      d.properties[slider.property("value")] >= -9.5 &&
      d.properties[slider.property("value")] < -4
    ) {
      return "d";
    } else if (
      d.properties[slider.property("value")] >= -4 &&
      d.properties[slider.property("value")] < 1.5
    ) {
      return "e";
    } else if (
      d.properties[slider.property("value")] >= 1.5 &&
      d.properties[slider.property("value")] < 7
    ) {
      return "f";
    } else if (
      d.properties[slider.property("value")] >= 7 &&
      d.properties[slider.property("value")] < 12.5
    ) {
      return "g";
    } else if (
      d.properties[slider.property("value")] >= 12.5 &&
      d.properties[slider.property("value")] < 18
    ) {
      return "h";
    } else if (
      d.properties[slider.property("value")] >= 18 &&
      d.properties[slider.property("value")] < 23.5
    ) {
      return "i";
    } else if (d.properties[slider.property("value")] >= 23.5) {
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

import { geoPath, geoNaturalEarth1, zoom, event } from "d3";

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

export const colorMap = (selection, props) => {
  const { features, colorScale, colorValue, selectedColorValue, slider } = props;

  const gUpdate = selection.selectAll("g").data([null]);
  const gEnter = gUpdate.enter().append("g");
  const g = gUpdate.merge(gEnter);

  gEnter
    .append("path")
    .attr("class", "sphere")
    .attr("d", pathGenerator({ type: "Sphere" }))
    .merge(gUpdate.select(".sphere"))
    .attr("opacity", selectedColorValue ? 0.05 : 1);

  selection.call(
    zoom().on("zoom", () => {
      g.attr("transform", event.transform);
    })
  );

  //update title value depending on radio buttons
  const countryPaths = g.selectAll(".country").data(features);
  const countryPathsEnter = countryPaths
    .enter()
    .append("path")
    .attr("class", "country");
  countryPaths
    .merge(countryPathsEnter)
    .attr("d", pathGenerator)
    .attr("fill", d => colorScale(colorValue(d)))
    .attr("opacity", d =>
      !selectedColorValue || selectedColorValue === colorValue(d) ? 1 : 0.3
    )
    .classed(
      "highlighted",
      d => selectedColorValue && selectedColorValue === colorValue(d)
    )
    .select("title")
    .text(d => d.properties.name + ": " + d.properties[slider.property('value')] + "°C " + slider.property('value'));

  countryPathsEnter
    .append("title")
    .text(d => d.properties.name + ": " + d.properties[slider.property('value')] + "°C " + slider.property('value'));
};

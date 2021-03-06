import { geoPath, geoNaturalEarth1, zoom, event } from "d3";

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

export const colorMap = (selection, props) => {
  const {
    features,
    colorScale,
    colorValue,
    selectedColorValue,
    slider,
    unit
  } = props;

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
    .text(d => {
      let temp;
      if (d.properties[slider.property("value")] > 99) {
        return d.properties.name + ": Data Not Available";
      } else if (unit !== "F") {
        temp = d.properties[slider.property("value")];
      } else {
        temp = (d.properties[slider.property("value")] * 1.8 + 32).toFixed(1);
      }

      return d.properties.name + ": " + temp + "°";
    });
  countryPathsEnter.append("title").text(d => {
    if (d.properties[slider.property("value")] > 99) {
      return d.properties.name + ": Data Not Available";
    } else {
      return (
        d.properties.name +
        ": " +
        d.properties[slider.property("value")] +
        "°C "
      );
    }
  });
};

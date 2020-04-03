export const colorLegend = (selection, props) => {
  const {
    colorScale,
    circleRadius,
    spacing,
    textOffset,
    backgroundRectWidth,
    onClick,
    selectedColorValue, 
    unit
  } = props;

  const backgroundRect = selection.selectAll("rect").data([null]);
  const n = colorScale.domain().length;
  backgroundRect
    .enter()
    .append("rect")
    .merge(backgroundRect)
    .attr("x", -circleRadius * 3)
    .attr("y", -circleRadius * 2)
    .attr("rx", circleRadius * 2)
    .attr("width", backgroundRectWidth)
    .attr("height", spacing * n + circleRadius * 2)
    .attr("fill", "white")
    .attr("opacity", 0.8);

  const groups = selection.selectAll(".tick").data(colorScale.domain());
  const groupsEnter = groups
    .enter()
    .append("g")
    .attr("class", "tick");
  groupsEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(0, ${i * spacing})`)
    .attr("opacity", d =>
      !selectedColorValue || d === selectedColorValue ? 1 : 0.2
    )
    .on("click", d => onClick(d === selectedColorValue ? null : d));
  groups.exit().remove();

  groupsEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("r", circleRadius)
    .attr("fill", colorScale);

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .text(d => {
      if (unit !== "F") {
        if (d === 'a') {
          return "Data Not Available";
        } else if (d === 'b') {
          return "< -15 °C";
        } else if (d === 'c') {
          return "-15 - -9.6 °C";
        } else if (d === 'd') {
          return "-9.5 - -4.1 °C";
        } else if (d === 'e') {
          return "-4 - 1.4 °C";
        } else if (d === 'f') {
          return "1.5 - 6.9 °C";
        } else if (d === 'g') {
          return "7 - 12.4 °C";
        } else if (d === 'h') {
          return "12.5 - 17.9 °C";
        } else if (d === 'i') {
          return "18 - 23.5 °C";
        } else if (d === 'j') {
          return "> 23.5 °C";
        }
      } else {
        if (d === "a") {
          return "Data Not Available";
        } else if (d === "b") {
          return "< 5 °F";
        } else if (d === "c") {
          return "5 - 14.8 °F";
        } else if (d === "d") {
          return "14.9 - 24.7 °F";
        } else if (d === "e") {
          return "24.8 - 34.6 °F";
        } else if (d === "f") {
          return "34.7 - 44.5 °F";
        } else if (d === "g") {
          return "44.6 - 54.4 °F";
        } else if (d === "h") {
          return "54.5 - 64.3 °F";
        } else if (d === "i") {
          return "64.4 - 74.3 °F";
        } else if (d === "j") {
          return "> 74.3 °F";
        }
      }
    })
    .attr("dy", "0.32em")
    .attr("x", textOffset);
};

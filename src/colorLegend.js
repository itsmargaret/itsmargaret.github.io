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
          return "< -13.5 °C";
        } else if (d === 'c') {
          return "-13.5 - -8.1 °C";
        } else if (d === 'd') {
          return "-8 - -2.6 °C";
        } else if (d === 'e') {
          return "-2.5 - 2.9 °C";
        } else if (d === 'f') {
          return "3 - 8.4 °C";
        } else if (d === 'g') {
          return "8.5 - 13.9 °C";
        } else if (d === 'h') {
          return "14 - 19.4 °C";
        } else if (d === 'i') {
          return "19.5 - 25 °C";
        } else if (d === 'j') {
          return "> 25 °C";
        }
      } else {
        if (d === "a") {
          return "Data Not Available";
        } else if (d === "b") {
          return "< 7.7 °F";
        } else if (d === "c") {
          return "7.7 - 17.5 °F";
        } else if (d === "d") {
          return "17.6 - 27.4 °F";
        } else if (d === "e") {
          return "27.5 - 37.3 °F";
        } else if (d === "f") {
          return "37.4 - 47.2 °F";
        } else if (d === "g") {
          return "47.3 - 57.1 °F";
        } else if (d === "h") {
          return "57.2 - 67.0 °F";
        } else if (d === "i") {
          return "67.1 - 77 °F";
        } else if (d === "j") {
          return "> 77 °F";
        }
      }
    })
    .attr("dy", "0.32em")
    .attr("x", textOffset);
};

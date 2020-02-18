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
          return "< -4.2 °C";
        } else if (d === 'b') {
          return "-4.2 - -.5 °C";
        } else if (d === 'c') {
          return "-.4 - 3.3 °C";
        } else if (d === 'd') {
          return "3.4 - 7.1 °C";
        } else if (d === 'e') {
          return "7.2 - 10.9 °C";
        } else if (d === 'f') {
          return "11 - 14.7 °C";
        } else if (d === 'g') {
          return "14.8 - 18.5 °C";
        } else if (d === 'h') {
          return "18.6 - 22.3 °C";
        } else if (d === 'i') {
          return "22.4 - 26.1 °C";
        } else if (d === 'j') {
          return "> 26.1 °C";
        }
      } else {
        if (d === "a") {
          return "< 24.4 °F";
        } else if (d === "b") {
          return "24.4 - 31.1 °F";
        } else if (d === "c") {
          return "31.2 - 37.9 °F";
        } else if (d === "d") {
          return "38.1 - 44.8 °F";
        } else if (d === "e") {
          return "45 - 51.6 °F";
        } else if (d === "f") {
          return "51.8 - 58.5 °F";
        } else if (d === "g") {
          return "58.6 - 65.3 °F";
        } else if (d === "h") {
          return "65.5 - 72.1 °F";
        } else if (d === "i") {
          return "72.3 - 79 °F";
        } else if (d === "j") {
          return "> 79 °F";
        }
      }
    })
    .attr("dy", "0.32em")
    .attr("x", textOffset);
};

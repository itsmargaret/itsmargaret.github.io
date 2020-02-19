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
          return "< -15 °C";
        } else if (d === 'b') {
          return "-15 - -10.1 °C";
        } else if (d === 'c') {
          return "-10 - -5.1 °C";
        } else if (d === 'd') {
          return "-5 - -.1 °C";
        } else if (d === 'e') {
          return "0 - 4.9 °C";
        } else if (d === 'f') {
          return "5 - 9.9 °C";
        } else if (d === 'g') {
          return "10 - 14.9 °C";
        } else if (d === 'h') {
          return "15 - 19.9 °C";
        } else if (d === 'i') {
          return "20 - 25 °C";
        } else if (d === 'j') {
          return "> 25 °C";
        }
      } else {
        if (d === "a") {
          return "< 5 °F";
        } else if (d === "b") {
          return "5 - 13.9 °F";
        } else if (d === "c") {
          return "14 - 22.9 °F";
        } else if (d === "d") {
          return "23 - 31.9 °F";
        } else if (d === "e") {
          return "32 - 40.9 °F";
        } else if (d === "f") {
          return "41 - 49.9 °F";
        } else if (d === "g") {
          return "50 - 58.9 °F";
        } else if (d === "h") {
          return "59 - 67.9 °F";
        } else if (d === "i") {
          return "68 - 77 °F";
        } else if (d === "j") {
          return "> 77 °F";
        }
      }
    })
    .attr("dy", "0.32em")
    .attr("x", textOffset);
};

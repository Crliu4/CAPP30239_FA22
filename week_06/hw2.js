// ring chart for race
// HOW TO FIX LABEL OVERLAPS?????

d3.json('a3cleanedonly2015.json').then((data) => {
    const height = 600,
      width = 600,
      innerRadius = 100,
      outerRadius = 170,
      labelRadius = 190;

    // aggregate race
    var agg0 = d3.rollups(data, (g) => g.length, (d) => d.Race)
        .map((d, _, arr) => [d[0], (100 * d[1]) / d3.sum(arr, (d) => d[1])])
    var agg = Array.from(agg0, ([race, pct]) => ({race, pct}));
    console.log(agg);
  
    const arcs = d3.pie().value(d => d.pct)(agg);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const svg = d3.select("#hw2_chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
      .attr("stroke", "white") // 20-22: making white separators btwn arcs
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => d3.schemeCategory10[i]) // color schemes? 10 colors picked by d3 (accessible?)
      .attr("d", arc);
  
    svg.append("g")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`) // center point of the arc
      .selectAll("tspan")
      .data(d => {
        return [d.data.race, d.data.pct.toFixed(0)];
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i) => `${i * 1.1}em`)
      .attr("font-weight", (d, i) => i ? null : "bold")
      .text(d => d);
  
    svg.append("text")
      .attr("font-size", 25)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text("2015 Police Shootings")
      .style("font-size", 20);
  });
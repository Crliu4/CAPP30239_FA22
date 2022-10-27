let height = 400, // set variables
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart") // select id on html and svg
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('penguins.csv').then(data => {
  
  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.body_mass_g)).nice() // data
    .range([margin.left, width - margin.right]); // range = space data take on page

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
    .range([height - margin.bottom, margin.top]);

// creating x and y axes
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom)) // draw tick in 'negative' way - draw all the way across

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  svg.append("g") // append 'g' html element, fill w/ black
    .attr("fill", "black")
    .selectAll("circle")
    .data(data)
    .join("circle") // join data onto each circle
    .attr("cx", d => x(d.body_mass_g)) // cx, cy -> position circles & give data
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2) // radius of circles
    .attr("opacity", 0.75);

  const tooltip = d3.select("body").append("div") // goes to html and select body tag; to body tag, append new div
    .attr("class", "svg-tooltip") // give that div class of svg-tooltip and apply these two styles --> styles.css
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle") // select all circles on page and wait til mouseover, then add attr (fill red)
    .on("mouseover", function(event, d) {
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) { // for hover-over
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() { // turn mouseover back to black after mouse leaves point
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});
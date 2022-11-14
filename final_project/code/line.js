/* D3 Line Chart */

// pulled out of d3.csv b/c not dependent on the data - performance boost
const height1 = 500,
    width1 = 800,
    margin1 = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#line") // svg gets put on the page before the data loads -- prevents jumping when pg is loading
    .append("svg")
    .attr("viewBox", [0, 0, width1, height1]);

d3.csv('../cleaned_data/ac_med.csv').then(data => {
    // change give current format of date
    let timeParse = d3.timeParse("%Y");
    console.log(data)

    for (let d of data) {
        d.ac_count = +d.ac_count;
        d.med_count = +d.med_count;
        d.year = timeParse(d.year);
    }

    console.log(data);

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.year)) // extent gives min & max, returns as array
        .range([margin1.left, width1 - margin1.right]);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.ac_count)]).nice()
        .range([height1 - margin1.bottom, margin1.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height1 - margin1.bottom})`) // transform translate to put axis in right place
      .call(d3.axisBottom(x).tickSizeOuter(0)); // tick size outer removes weird hanging tick @ end of axis
    
    svg.append("g")
      .attr("transform", `translate(${margin1.left},0)`)
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).tickSizeOuter(0).tickSize(-width1)); // tickFormat = add % to tick labels

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width1 - margin1.right)
      .attr("y", height1)
      .attr("dx", "0.5em")
      .attr("dy", "-0.25em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin1.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Number of acquisitions");

    // put lines on page!
    let line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.ac_count))
        .curve(d3.curveNatural);  // cruve the line

    svg.append('path')
        .datum(data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')



  });
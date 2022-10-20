/* D3 Line Chart */

/* shortcuts:
    cmd / to uncomment/comment
    cmd d to find and replace all
*/ 

// pulled out of d3.csv b/c not dependent on the data - performance boost
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart") // svg gets put on the page before the data loads -- prevents jumping when pg is loading
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-monthly.csv').then(data => {
    // change give current format of date
    let timeParse = d3.timeParse("%Y-%m");

    for (let d of data) {
        d.Value = +d.Value;
        d.Date = timeParse(d.Date);
    }

    // console.log(data);

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Date)) // extent gives min & max, returns as array
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Value)])
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) // transform translate to put axis in right place
      .call(d3.axisBottom(x).tickSizeOuter(0)); // tick size outer removes weird hanging tick @ end of axis
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + '%').tickSize(-width)); // tickFormat = add % to tick labels

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    // put lines on page!
    let line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Value))
        .curve(d3.curveNatural);  // cruve the line

    svg.append('path')
        .datum(data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')



  });
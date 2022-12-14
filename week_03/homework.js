/* Week 3 Homework Bar chart for library visits 
Heavily adapted from Instructor's code
https://github.com/tiffanyfrance/CAPP30239_FA22/blob/main/week_03/script.js
*/

d3.csv("library_visits_jan22.csv").then(data => {
    for (let d of data) {
        d.num = +d.num; //force number of visits (num) to be number
    };

    // declare height, width and margin vars
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // resize element in browser

    // scaleBand for bar chart categories
    let x = d3.scaleBand()
        .domain(data.map(d => d.branch)) // data, returns array
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1);

    // linear b/c num (y) is numerical 
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice() // nice rounds the top num on y axis
        .range([height - margin.bottom, margin.top]);
    
    /* Update: simplfied axes */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "steelblue")
        .attr("x", d => x(d.branch)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.num)) // y position attribute
        .attr("height", d => y(0) - y(d.num)); // this height is the height attr on element
    
    bar.append('text') // add labels to bars
        .text(d => d.num)
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

});
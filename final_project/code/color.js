
// d3.csv('../cleaned_data/watercolors_hex_dropna.csv').then( data => {
d3.csv('../cleaned_data/watercolors_all.csv').then( data => {
    const width = 860,
    height = 500,
    margin = {top: 40, right: 30, bottom: 20, left: 20};

    const svg = d3.select("#color")
        .append("svg")
        .attr("height", height)
        .attr("width", width);

    let timeParse = d3.timeParse("%Y");
    for (let d of data) {
            d.value_x = +d.value_x
            d.value_y = +d.value_y
            d.year = timeParse(d.year); // create new var year
        };
    
    console.log(data)
   
    let x = d3.scaleBand(data.map(d => (d.year)),[margin.left, width - margin.right]);

    let y = d3.scaleLinear([0, 3000],[height - margin.bottom, margin.top]).nice();
    
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y")))// draw tick in 'negative' way - draw all the way across

    svg.append("g") // append 'g' html element, fill w/ black
        .selectAll("g")
        .data(data)
        .join("circle") // join data onto each circle
        .attr("cx", d => x(d.year)) // cx, cy -> position circles & give data
        .attr("cy", d => y(d.value_x))
        .style("fill", d => d.hex)
        .attr("r", 3) // radius of circles
    
});
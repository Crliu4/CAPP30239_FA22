// stacked bar: acquisitions over time by medium
d3.csv('../cleaned_data/ac_med.csv').then( data => {

    const w = 800,
        h = 400,
        m = {top: 40, right: 20, bottom: 20, left: 45};

    const svg = d3.select("#bar")
        .append("svg")
        .attr("viewBox", [0, 0, w, h]);
        
    console.log(data)
    let timeParse = d3.timeParse("%Y");
    // make month d3 time date and counts numerical
    for (let d of data) {
        d.film = +d.film
        d.other = +d.other
        d.painting = +d.painting
        d.paper = +d.paper
        d.photo = +d.photo
        d.sculpture = +d.sculpture
        d.wood = +d.wood
        d.year = timeParse(d.year); // create new var year
    };

    console.log(data)

    let x = d3.scaleBand(data.map(d => (d.year)),[m.left, w - m.right])
    .padding([0.2]);

    // add break in y-axis
    let y = d3.scaleLinear().domain([0, 4000, 38000, d3.max(data, function(d) {
        return d.ac_count})]).range([h - m.bottom, h/4 , m.top]).nice();
    
    svg.append("g")
        .attr("transform", `translate(0,${h - m.bottom})`)
        .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%10)})).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y")))

    svg.append("g")
        .attr("transform", `translate(${m.left},0)`)
        .call(d3.axisLeft(y).tickValues([0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200,
           2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 38000]).tickSize(-w + m.left + m.right))

    // medium subgroups
    const subgroups = ['paper', 'painting', 'wood', 'sculpture', 'photo', 'film', 'other'];
    console.log(subgroups)
    const color = d3.scaleOrdinal(subgroups, d3.quantize(d3.interpolateHcl("rgb(152, 67, 98)", "#f4e153"), 7)); // another type of scale

    const stackedData = d3.stack() // formatting data
        .keys(subgroups)(data);
    
    console.log(stackedData)
    
    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d) // getting nested data
        .join("rect") // building rectangles
        .attr("x", d => x(d.data.year))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width",x.bandwidth())

    let legendGroup = svg
            .selectAll(".legend-group")
            .data(subgroups)
            .join("g")
            .attr("class", "legend-group");
    
          legendGroup
            .append("circle")
            .attr("cx", (d, i) => (10 + (i * 75)))
            .attr("cy",10)
            .attr("r", 3)
            .attr("fill", (d, i) => color(i));
          
          legendGroup
            .append("text")
            .attr("x", (d, i) => (20 + (i * 75)))
            .attr("y",15)
            .text((d, i) => subgroups[i]);
});



d3.csv('../cleaned_data/ac_med.csv').then( data => {

    const w = 860,
        h = 400,
        m = {top: 40, right: 30, bottom: 20, left: 20};

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

    // let y = d3.scaleLinear([0, d3.max(data, d => d.ac_count)],[h - m.bottom, m.top]);
    let y = d3.scaleLinear([0, 2000],[h - m.bottom, m.top]).nice();

    svg.append("g")
        .attr("transform", `translate(0,${h - m.bottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeYear.every(100)).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y")))

    svg.append("g")
        .attr("transform", `translate(${m.left},0)`)
        .call(d3.axisLeft(y).tickSize(-w + m.left + m.right))

    // medium subgroups
    const subgroups = ['film', 'other', 'painting', 'paper', 'photo', 'sculpture', 'wood'];
    console.log(subgroups)
    const color = d3.scaleOrdinal(subgroups,['#e41a1c','#377eb8','#4daf4a', 'pink', 'purple', 'yellow', 'orange']); // another type of scale

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
    
    // Manual legend
    // svg.append("circle").attr("cx",10).attr("cy",10).attr("r", 6).style("fill", "#e41a1c")
    // svg.append("circle").attr("cx",110).attr("cy",10).attr("r", 6).style("fill", "#377eb8")
    // svg.append("circle").attr("cx",205).attr("cy",10).attr("r", 6).style("fill", "#4daf4a")
    // svg.append("text").attr("x", 20).attr("y", 10).text("Other").style("font-size", "15px").attr("alignment-baseline","middle")
    // svg.append("text").attr("x", 130).attr("y", 10).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
    // svg.append("text").attr("x", 225).attr("y", 10).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")

const tooltip = d3.select("body")
    .append("div")
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

let height = 600,
    width1 = 700;

// Read data
d3.csv('../cleaned_data/aa_counts_url.csv').then(data => {
    console.log(data)

    const data1 = {
        children: data.map(item => ({name: item.name, value: +item.artwork_count, img: item.img, color: item.color}))};

    console.log(data1)

    const treemap = data1 => d3.treemap()
        (d3.hierarchy(data1)
        .sum(d => +d.value)
        .sort((a, b) => b.value - a.value));

    console.log(treemap)

    const x = d3.scaleLinear().rangeRound([0, width1]);
    const y = d3.scaleLinear().rangeRound([0, height]);
  
    const format = d3.format(",d");
  
    const svg = d3.select("#treemap")
      .append("svg")
      .attr("viewBox", [0, 0, width1, height]);
  
    let group = svg.append("g")
      .call(render, treemap(data1));
      function render(group, node) {
        d3.select('#breadcrumbs')
          .text(node.ancestors().reverse().map(d => d.data.name).join(" > "))
          .on('click', () => {
            if (node.parent) {
              zoomOut(node);
            }
          });
    
        const gNode = group
            .selectAll("g")
            .data(node.children)
            .join("g");
        
        gNode.filter(d => d.children)
            .attr("cursor", "pointer")
            .on("click", (event, d) => zoomIn(d));
        
        gNode.append("image")
            .attr("id", "img")
            .attr("width", d => x(d.x1 - d.x0))
            .attr("height", d => y(d.y1 - d.y0))
            .attr("href", d => d.data.img);
    
        gNode.append("rect")
            // .attr('fill', "#fff")
            // .attr("fill", "url(#img)")
            .attr("stroke", "black");

        // gNode.append("text")
        //     .append("tspan")
        //     .attr("x", 3)
        //     .attr("y", "1.1em")
        //     .text(d => d.data.name)
        //     .append("tspan")
        //     .attr("x", 3)
        //     .attr("y", "2.3em")
        //     .text(d => format(d.value));

        group.call(position);
      }
    
      function position(group) {
        group.selectAll("g")
            // .attr("width", d => x(d.x1) - x(d.x0))
            // .attr("height", d => y(d.y1) - y(d.y0))
            .attr("transform", d => `translate(${x(d.x0)},${y(d.y0)})`)
            .select("rect");
            // .select("image");
            
      }
    
      d3.selectAll("image") // select all images on page and wait til mouseover, then add text info
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "steelblue");
            tooltip
            .style("visibility", "visible")
            .html(`Artist: ${d.data.name}<br />Number of works: ${d.data.value}`);
      })
        .on("mousemove", function(event) { // for hover-over
            tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
      })
        .on("mouseout", function() { // turn mouseover back to original after mouse leaves point
            d3.select(this).attr("fill", '#fff');
            tooltip.style("visibility", "hidden");
      })
      
    });
/* Bar chart for COVID country cases */

/* then = promise...first read data then do this
d3 reads everything in csv as string */
d3.csv("covid.csv").then(data => {
    //console.log(data);
    for (let d of data) { // loop thru each row of data
        d.cases = +d.cases; // + converts to number
    };

    const height = 600,
        width = 800,
        margin = ({top: 25, right: 30, bottom: 35, left: 50});
    
    // create svg on the page
    let svg = d3.select('#chart')
        .append('svg')
        .attr('viewBox', [0, 0, width, height]); // viewbox = allows svg to be dynamic?

    let x = d3.scaleBand() // scaleBand specific to bar charts
        .domain(data.map(d => d.country))
        .range([margin.left, width - margin.right]) // start where margin ends & go to width of page - margin right
        .padding(0.1);

    let y = d3.scaleLinear() // bc y-axis is numerical
        .domain([0, d3.max(data, d => d.cases)]).nice() // domain = values/data; nice-rounds up max axis val
        // d3 top to bottom 
        .range([height - margin.bottom, margin.top]); // range = space that it takes up 

    const xAxis = g => g
        // transform moves it around on page by 0x and 375 y?
        .attr('transform', `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = g => g
        .attr('transform', `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y));
    
    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    let bar = svg.selectAll('bar')
        .append('g')
        .data(data)
        .join('g') // take data and join to element on the page
        .attr('class', 'bar');
    
    bar.append('rect') // inside the bar group, append a rectangle  
        .attr('fill', 'steelblue')
        .attr('x', d => x(d.country))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.cases))
        .attr('height', d => y(0) - y(d.cases))

});






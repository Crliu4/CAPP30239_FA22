// Histogram & Joins

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('climate.json').then((data) => {      
    console.log(data)

    const x = d3.scaleLinear()
        .range([margin.left, width - margin.right])
        .domain([0,65]);
  
    const y = d3.scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0,10]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const binGroups = svg.append("g")
        .attr("class", "bin-group");
    console.log(binGroups);

    function updateChart(m) {
        const bins = d3.bin()
            .thresholds(10)
            .value(d => d.average)(data[m]); // using data[object of that month]

        binGroups.selectAll("g")
            .data(bins, d => d.x0)
        .join( // extended join for when data changes
            enter => { // enter 
            let g = enter.append("g")

            g.append("rect")
                .attr("x", d => x(d.x0) + padding / 2)
                .attr("y", height - margin.bottom)
                .attr("width", d => x(d.x1) - x(d.x0) - padding)
                .attr("height", 0)
                .attr("fill", "steelblue")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length))
                .attr("height", d => height - margin.bottom - y(d.length));

            g.append("text")
                .text(d => d.length)
                .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
                .attr("y", height - margin.bottom - 5)
                .attr("text-anchor", "middle")
                .attr("fill", "#333")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },
            update => { // if no update - doesn't change things shared btwn enter and exit data
            update.select("rect")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length)) // changing y pos and height of bars based on new data
                .attr("height", d => height - margin.bottom - y(d.length));

            update.select("text") // changing text of bars based on new data
                .text(d => d.length)
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },
            exit => {
            exit.select("rect") // exit - taking old bars off the page - animation down
                .transition()
                .duration(750)
                .attr("height", 0)
                .attr("y", height - margin.bottom);

            exit.select("text")
                .text("");

            exit.transition()
                .duration(750)
                .remove();
            }
        );

        svg.selectAll("foreignObject").remove(); // nicer way to do annotation

        let temp = d3.mean(data[m], d => d.average).toFixed(1); // get mean of average var; toFixed(# decimals)
        let str = `The average temperature in 
                    <b style="text-transform:capitalize;">${m} 2022</b> was 
                    <b>${temp}℉</b>.`

        svg.append("foreignObject") // manually placed annotation
          .attr("x", 10)
          .attr("y", 100)
          .attr("width", 120)
          .attr("height", 100)
          .append('xhtml:div')
          .append("p")
          .html(str);
    }

    updateChart("january");

    d3.selectAll("select") // using an event (selecting this dropdown
        .on("change", function (event) { // when that dropdown changes (mousemove, hover, browser events, etc)
            const m = event.target.value; // how to get value in the html month value
            updateChart(m); 
        });
});
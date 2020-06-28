// Define SVG area dimensions
var svgWidth = 690;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv...puts into parameter 'stateData'
d3.csv("assets/data/data.csv").then(function(stateData) {

    // Print the state data
    // console.log(stateData);
    // });
  
// go through state data and cast each of the healthcare and poverty data points to values
stateData.forEach(function(data){
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
});

const xValue = d => d.poverty;
const yValue = d => d.healthcare;

// scale x to chart width
var xScale = d3.scaleLinear()
    .domain(d3.extent(stateData, xValue))
    .range([0, chartWidth])
 
// scale y to chart height
var yScale = d3.scaleLinear()
    .domain(d3.extent(stateData, yValue))
    .range([chartHeight, 0])

// create axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

// build x axis in the 'g' tag
chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .style("font-size", "18px")
    .call(xAxis);

// build y axis in the 'g' tag
chartGroup.append("g")
    .style("font-size", "18px")
    .call(yAxis);


// add circles to plot
// var circlesGroup = 
// chartGroup.selectAll(".stateCircle")
chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .classed("stateCircle", true)
    // .attr("cx", (d, i) => xScale(d.poverty))
    // .attr("cy", (d, i) => yScale(d.healthcare))
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "9")
    .attr("opacity", ".5");

// put text in circles
chartGroup.selectAll("text.text-circles")
    .data(stateData)
    .enter()
    .append("text")
    .classed("stateText", true)
    .text(d => d.abbr)
    .attr("x", (d, i) => xScale(d.poverty))
    .attr("y", (d, i) => yScale(d.healthcare))
    .attr("dy",5)
    .attr("text-anchor","middle")
    .attr("font-size","9px");

// set x axis label
chartGroup.append("text")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + chartMargin.bottom/2)
    .attr("dy", "1em")
    .classed("aText", true)
    .text("In Poverty (%)");

// set y axis label
chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (chartHeight / 2))
    .attr("y", 0 - chartMargin.left)
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Lacks Healthcare (%)");

// }).catch(function(error) {
//     console.log(error);
});

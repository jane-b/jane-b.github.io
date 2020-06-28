// create function to show metadata for specific sample ID
function showMetadata(sample_id){

    // read json data
    d3.json("../data/samples.json").then((data) => {

        // create variable to hold data filtered for specific sample ID
        var filtered_data = data.metadata.filter(d => d.id == sample_id);
        
        // create 'info' variable to hold filtered metadata
        var info = d3.select("#sample-metadata");
        // reset:
        info.html("");

        // update filtered metadata
        Object.entries(filtered_data[0]).forEach(([key, value]) => {
            info.append("p").text(`${key}: ${value}`);
        });
    
})};

showMetadata(940);


// create function to show bar chart for specific sample ID
function barChart(sample_id){
    
    // 1. Use the D3 library to read in `samples.json`.
    d3.json("../data/samples.json").then((data) => {
        
        // create variable to hold data filtered for specific sample ID
        var filtered_data = data.metadata.filter(d => d.id == sample_id);
        

        var x_values = filtered_data.map(f => f.sample_values).slice(0, 10).reverse();
        var y_values = filtered_data.map(f => f.otu_ids).slice(0, 10).reverse().map(id => "OTU" + id);
        var hover_text = filtered_data.map(f => f.otu_labels).slice(0, 10);

        //  Create the Traces
        var trace1 = {
            x: x_values,
            y: y_values,
            text: hover_text,
            type: "bar",
            orientation: "h"
        };
    
        // Create the data array for the plot
        var bar_data = [trace1];
    
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", bar_data);
    });
};

barChart(940);


// create function to show buuble chart for specific sample ID
function bubbleChart(sample_id){
    
    // 1. Use the D3 library to read in `samples.json`.
    d3.json("../data/samples.json").then((data) => {
        
        // create variable to hold data filtered for specific sample ID
        var filtered_data = data.metadata.filter(d => d.id == sample_id);
        

        var x_values = filtered_data.map(f => f.otu_ids);
        var y_values = filtered_data.map(f => f.sample_values);
        var hover_text = filtered_data.map(f => f.otu_labels);

        //  Create the Traces
        var trace1 = {
            x: x_values,
            y: y_values,
            text: hover_text,
            type: "scatter",
            mode: "markers",
            marker: {
                size: [y_values],
                color: [x_values]
            }
        };
    
        // Create the data array for the plot
        var bubble_data = [trace1];

        // Show bottom axis label, per homework image file
        var layout = {
            xaxis:{title: "OTU ID"}
        };
    
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bubble", bubble_data, layout);
    });
};

bubbleChart(940);

//____________________________________

// started (and stopped) to create dropdown based on Day 2, Example 8 (copied below)...


// start with default plot
// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     Plotly.newPlot("plot", data);
//   }
  
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
    
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
    
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
  
//     if (dataset === 'dataset1') {
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//     }
  
//     if (dataset === 'dataset2') {
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//     }
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }
  
//   init();


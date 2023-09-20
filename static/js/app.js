
// save API endpoint URL

const APIurl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Fetch the JSON data and console log it


d3.text(APIurl).then(function(APIresponse) {
    
    var allData = JSON.parse(APIresponse);
    console.log("Dataset as JSON object: ", allData);

    const idList = allData.names;
    console.log(`ID list: ${idList}`);

    let samplesList = allData.samples;
    console.log(`Samples list: ${samplesList}`);

    

    // define dropdown menu for easy reference with call to call dropdownSelection() when a new sample ID is selected

    let dropdownMenu = d3.select("#selDataset");

    dropdownMenu.on("change", dropdownSelection);


    // populate dropdown menu options

    var defaultOptionName;

    dropdownMenu.selectAll("option")
    .data(idList)
    .enter()
    .append("option")
    .attr('value', x => x)
    .property("selected", x => x === defaultOptionName)
    .text(x => x);


    function dropdownSelection() {

        // capture ID selection from dropdown menu
        var selectedID = dropdownMenu.property("value");
        console.log(`Selected ID = ${selectedID}`);

        // get sample data for that specific ID
        var selectedSample = samplesList.filter(sample => sample.id == selectedID)[0];
        console.dir(`Selected ID's sample/data: ${selectedSample.values}`);

        // define arrays containing OTU IDs, OTU labels, and sample values for top 10 OTUs by sample value
        var top10OTUIDs = selectedSample.otu_ids.slice(0,10).map(x => "OTU " + x).reverse();
        var top10OTUlabels = selectedSample.otu_labels.slice(0,10).reverse();
        var top10OTUvalues = selectedSample.sample_values.slice(0,10).reverse();

        // log to the console
        console.log(`OTU IDs for top 10 OTUs by sample value: ${top10OTUIDs}`);
        console.log(`OTU labels for top 10 OTUs by sample value: ${top10OTUlabels}`);
        console.log(`Sample values for top 10 OTUs by sample value: ${top10OTUvalues}`);

        // define trace for horizontal bar chart
        var trace1 = {
            x: top10OTUvalues,
            y: top10OTUIDs,
            text: top10OTUlabels,
            name: "Top 10 OTUs by Sample Value",
            type: "bar",
            orientation: "h"
        };

        // set traces/data to be plotted
        var traces = [trace1];

        // set layout
        var layout = {
        title: "Top 10 OTUs by sample value",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
        };

        // render plot to <div id="bar"≥
        Plotly.newPlot("bar", traces, layout);

    // closing definition of dropdownSelection() function
    }

    // call dropdownSelection function to initialize a chart before user makes a selection
    dropdownSelection();

// closing .then and definition of function within it, following d3.json() API call
});
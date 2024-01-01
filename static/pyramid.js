function fetchDataAndUpdatePyramidChart() {
  am5.ready(function () {
    fetch('/get-pyramidchart')
      .then(response => response.json())
      .then(data => {
        updatePyramidChart(data);
      })
      .catch(error => console.error('Error:', error));
  });
}

function updatePyramidChart(data_df) {
  console.log(data_df)
  // Create root element
  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv_pyramid");
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
    var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
      layout: root.verticalLayout
    }));
    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
    var series = chart.series.push(am5percent.PyramidSeries.new(root, {
      orientation: "vertical",
      valueField: "value",
      categoryField: "class"
    }));
    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
    series.data.setAll(data_df);
    
    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear();
    
    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginTop: 15,
      marginBottom: 15
    }));
    
    legend.data.setAll(am5.array.copy(series.dataItems).reverse());
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    
    }); // end am5.ready()
  

}

document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdatePyramidChart();
});

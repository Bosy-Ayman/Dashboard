function fetchDataAndUpdatePieChart() {
  am5.ready(function () {
    fetch('/get-piechart')
      .then(response => response.json())
      .then(data => {
        updatePieChart(data);
      })
      .catch(error => console.error('Error:', error));
  });
}

function updatePieChart(data_df) {
  // Create root element
  var rootPieChart = am5.Root.new("chartdiv_pie");

  // Set themes
  rootPieChart.setThemes([
    am5themes_Animated.new(rootPieChart)
  ]);

  // Create chart
  var chart = rootPieChart.container.children.push(am5percent.PieChart.new(rootPieChart, {
    innerRadius: am5.percent(50)
  }));

  // Create series
  var series = chart.series.push(am5percent.PieSeries.new(rootPieChart, {
    valueField: "value",
    categoryField: "class", 
    alignLabels: false
  }));

  series.labels.template.setAll({
    textType: "circular",
    centerX: 0,
    centerY: 0,
  });

  // Create legend
  var legend = chart.children.push(am5.Legend.new(rootPieChart, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    marginTop: 15,
    marginBottom: 15,
  }));

  // Pass the data directly to the series
  series.data.setAll(data_df);

  // Play initial series animation
  series.appear(1000, 100);
}

document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdatePieChart();
});

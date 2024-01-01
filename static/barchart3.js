function fetchDataAndUpdateBarChart3() {
  am5.ready(function () {
    fetch('/get-barchart3')
      .then(response => response.json())
      .then(data => {
        updateBarChart3(data);
      })
      .catch(error => console.error('Error:', error));
  });
}

function updateBarChart3(data_df) {
  console.log(data_df)
  // Create root element
  var rootBarChart = am5.Root.new("chartdiv_bar3");

  // Set themes
  rootBarChart.setThemes([
    am5themes_Animated.new(rootBarChart)
  ]);

  // Create chart
  var chart = rootBarChart.container.children.push(am5xy.XYChart.new(rootBarChart, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true,
    paddingLeft: 0,
    paddingRight: 1
  }));

  // Add cursor
  var cursor = chart.set("cursor", am5xy.XYCursor.new(rootBarChart, {}));
  cursor.lineY.set("visible", false);

  // Create axes
  var xRenderer = am5xy.AxisRendererX.new(rootBarChart, {
    minGridDistance: 30,
    minorGridEnabled: true
  });

  xRenderer.labels.template.setAll({
    rotation: 90,
    centerY: am5.p50,
    centerX: am5.p50,
  });

  xRenderer.grid.template.setAll({
    location: 1
  });

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(rootBarChart, {
    maxDeviation: 0.3,
    categoryField: "class",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(rootBarChart, {})
  }));

  var yRenderer = am5xy.AxisRendererY.new(rootBarChart, {
    strokeOpacity: 0.1
  });

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(rootBarChart, {
    maxDeviation: 0.3,
    renderer: yRenderer
  }));

  // Create series
  var series = chart.series.push(am5xy.ColumnSeries.new(rootBarChart, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "class",
    tooltip: am5.Tooltip.new(rootBarChart, {
      labelText: "{valueY}"
    })
  }));

  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  xAxis.data.setAll(data_df);
  series.data.setAll(data_df);

  // Make stuff animate on load
  series.appear(1000);
  chart.appear(1000, 100);
}

document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdateBarChart3();
});

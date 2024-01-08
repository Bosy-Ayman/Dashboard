function fetchDataAndUpdatebarChart2() {
  fetch('/get_Partitioned_BarChart')
    .then(response => response.json())
    .then(data => {
      updateChart2(data);
    })
    .catch(error => console.error('Error:', error));
}

function updateChart2(data_df) {
  am5.ready(function () {
    var rootbarChart2 = am5.Root.new("chartdiv_bar2");
    rootbarChart2.setThemes([
      am5themes_Animated.new(rootbarChart2)
    ]);

    var chart = rootbarChart2.container.children.push(am5xy.XYChart.new(rootbarChart2, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: rootbarChart2.horizontalLayout,
      paddingLeft: 0
    }));

    var legendData = [];
    var legend = chart.children.push(
      am5.Legend.new(rootbarChart2, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        marginLeft: 20,
        y: 20,
        layout: rootbarChart2.verticalLayout,
        clickTarget: "none"
      })
    );

    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(rootbarChart2, {
      categoryField: "state",
      renderer: am5xy.AxisRendererY.new(rootbarChart2, {
        minGridDistance: 10,
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(rootbarChart2, {})
    }));

    yAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      location: 0.5
    });

    var data = data_df.map(item => ({
      state: item.state,
      sales: item.sales,
      region: item.city
    }));

    yAxis.data.setAll(data);

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(rootbarChart2, {
      renderer: am5xy.AxisRendererX.new(rootbarChart2, {}),
      tooltip: am5.Tooltip.new(rootbarChart2, {})
    }));

    var series = chart.series.push(am5xy.ColumnSeries.new(rootbarChart2, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "sales",
      categoryYField: "state",
      tooltip: am5.Tooltip.new(rootbarChart2, {
        pointerOrientation: "horizontal"
      })
    }));

    series.columns.template.setAll({
      tooltipText: "{categoryY}: [bold]{valueX}[/]",
      width: am5.percent(90),
      strokeOpacity: 0
    });

    series.columns.template.adapters.add("fill", function (fill, target) {
      if (target.dataItem) {
        switch (target.dataItem.dataContext.region) {
          case "Midwest":
            return chart.get("colors").getIndex(0);
          case "Northeast":
            return chart.get("colors").getIndex(1);
          case "South":
            return chart.get("colors").getIndex(2);
          case "Southeast":
            return chart.get("colors").getIndex(3);
          case "West":
            return chart.get("colors").getIndex(4);
        }
      }
      return fill;
    });

    series.data.setAll(data);

    function createRange(label, category, color) {
      var rangeDataItem = yAxis.makeDataItem({
        category: category
      });

      var range = yAxis.createAxisRange(rangeDataItem);

      // rangeDataItem.get("label").setAll({
      //   fill: color,
      //   text: label,
      //   location: 1,
      //   fontWeight: "bold",
      //   dx: -130
      // });

      // rangeDataItem.get("grid").setAll({
      //   stroke: color,
      //   strokeOpacity: 1,
      //   location: 1
      // });

      // rangeDataItem.get("tick").setAll({
      //   stroke: color,
      //   strokeOpacity: 1,
      //   location: 1,
      //   visible: true,
      //   length: 130
      // });

      legendData.push({ name: label, color: color });
    }

    createRange("Midwest", "Illinois", chart.get("colors").getIndex(0));
    createRange("Northeast", "New York", chart.get("colors").getIndex(1));
    createRange("South", "Texas", chart.get("colors").getIndex(2));
    createRange("Southeast", "Florida", chart.get("colors").getIndex(3));
    createRange("West", "California", chart.get("colors").getIndex(4));

    legend.data.setAll(legendData);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(rootbarChart2, {
      xAxis: xAxis,
      yAxis: yAxis
    }));

    series.appear();
    chart.appear(1000, 100);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdatebarChart2();
});

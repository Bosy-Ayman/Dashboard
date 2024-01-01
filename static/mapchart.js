// function fetchDataAndUpdateMapChart() {
//   // Fetch sales data
//   fetch('/get_MapChart')
//     .then(response => response.json())
//     .then(salesData => {
//       // Combine salesData with predefined coordinates
//       const combinedData = combineData(salesData);
      
//       // Update chart with combined data
//       updateChart(combinedData);
//     })
//     .catch(error => console.error('Error fetching sales data:', error));
// }

// function combineData(salesData) {
//   // Define coordinates for cities
//   const cityCoordinates = {
//     'Chicago': { lat: 41.8781, long: -87.6298 },
//     'Indianapolis': { lat: 39.7684, long: -86.1581 },
//     'Des Moines': { lat: 41.5868, long: -93.6250 },
//     'Wichita': { lat: 37.6872, long: -97.3301 },
//     'Detroit': { lat: 42.3314, long: -83.0458 },
//     // Add more cities as needed
//   };

//   // Combine data based on matching city
//   const combinedData = salesData.map(sale => ({
//     ...cityCoordinates[sale.city],
//     sales: sale.sales,
//     city: sale.city,
//     state: sale.state,
//   }));

//   return combinedData;
// }

// function updateChart(data) {
//   console.log(data);

//   // Your existing chart update logic goes here
  
//   // For example, you can use data to add bubbles to the map
//   am5.ready(function() {
//     // ... (your existing chart initialization logic)

//     // Create a MapImageSeries for displaying bubbles
//     var bubbleSeries = chart.series.push(
//       am5maps.MapImageSeries.new(root)
//     );

//     // Create MapImage objects for each data point
//     data.forEach(item => {
//       var bubble = bubbleSeries.mapImages.create();
//       bubble.latitude = item.lat;
//       bubble.longitude = item.long;
//       bubble.value = item.sales; // Use sales data for the bubble size
//       bubble.tooltipText = `${item.city}, ${item.state}\nSales: ${item.sales}`;
//     });

//     // ... (rest of your existing code)
//   });
// }

// document.addEventListener('DOMContentLoaded', function () {
//   fetchDataAndUpdateMapChart();
// });

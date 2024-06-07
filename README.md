# Adidas Dashboard
![image](https://github.com/PoussyAyman/Dashboard/assets/112729185/a4b75669-cdd6-4b70-9964-c15365495461)

## Design Phase

### Define:

**Client Title:** Administrator

**Available Information:**
- Retailer
- Retailer ID
- Region
- State
- City
- Product
- Price per Unit
- Units Sold
- Total Sales
- Operating Profit
- Operating Margin
- Sales Method

**Required Questions Answered by the Dashboard:**
- Which product is the most profitable?
- Which product is the least profitable?
- Which region and state have the highest or lowest total sales?
- How does the market share analysis look?
- Which states contribute the most to Adidas sales?
- Which unit is the most or least sold product?
- Which retailers carry the largest share of Adidas products?
- What is the distribution of Adidas products across different retailers?

### Charts in the Dashboard:

**1. Pie Chart:**
- **Source Code:** [Donut Chart](https://www.amcharts.com/demos/donut-chart/)
- **Chart Type:** Pie Chart
- **Description:** Displays the percentage of market share per retailer. 
  - **Insights:** West Gear has the highest market share, Kohl’s has the lowest.
- **Reason for Selection:** Suitable for comparing data.
- **Critique:** Shows only percentage, not real numbers.

**2. Bar Chart (Total Sales):**
- **Source Code:** [Column with Rotated Series](https://www.amcharts.com/demos/column-with-rotated-series/)
- **Chart Type:** Bar Chart
- **Description:** Shows total sales per product.
  - **Insights:** Men’s street footwear has the highest sales, women’s athletic footwear has the lowest.
- **Reason for Selection:** Suitable for comparing data.
- **Critique:** Product titles on the x-axis are at a 90-degree angle, making them harder to read.

**3. Bar Chart (Operating Profit):**
- **Source Code:** [Column with Rotated Series](https://www.amcharts.com/demos/column-with-rotated-series/)
- **Chart Type:** Bar Chart
- **Description:** Shows operating profit per product.
  - **Insights:** Men’s street footwear has the highest profit, women’s athletic footwear has the lowest.
- **Reason for Selection:** Suitable for comparing data.
- **Critique:** Product titles on the x-axis are at a 90-degree angle, making them harder to read.

**4. Pyramid Chart:**
- **Source Code:** [Pyramid Chart](https://www.amcharts.com/demos/pyramid-chart/)
- **Chart Type:** Pyramid Chart
- **Description:** Displays the percentage of units sold per product.
  - **Insights:** Men’s Apparel has the highest percentage of units sold, Women’s Street Footwear has the lowest.
- **Reason for Selection:** Suitable for comparing data.
- **Critique:** Shows only percentage, not real numbers.

**5. Partitioned Bar Chart:**
- **Source Code:** [Partitioned Bar Chart](https://www.amcharts.com/demos/partitioned-bar-chart/)
- **Chart Type:** Partitioned Bar Chart
- **Description:** Shows total sales per region and state.
  - **Insights:** Maine state has the highest total sales, Florida has the lowest.
- **Reason for Selection:** Suitable for comparing data across regions and states.
- **Critique:** Showing the region might not be important.

## Source Codes and Functions

**Pie Chart Source Code:**
- `/get-piechart`: Retrieves data from SQL database (`adidas_data`) to generate a pie chart of market share per retailer.
- Uses Pandas to execute SQL query, processes the data, and returns it in JSON format for front-end visualization.

**Bar Chart Source Code (Total Sales):**
- `/get-barchart`: Retrieves data from SQL database (`adidas_data`) to generate a bar chart of total sales per product.
- Uses Pandas to execute SQL query, processes the data, and returns it in JSON format for front-end visualization.

**Bar Chart Source Code (Operating Profit):**
- `/get-barchart3`: Retrieves data from SQL database (`adidas_data`) to generate a bar chart of operating profit per product.
- Uses Pandas to execute SQL query, processes the data, and returns it in JSON format for front-end visualization.

**Pyramid Chart Source Code:**
- `/get-pyramidchart`: Retrieves data from SQL database (`adidas_data`) to generate a pyramid chart of units sold per product.
- Uses Pandas to execute SQL query, processes the data, and returns it in JSON format for front-end visualization.

**Partitioned Bar Chart Source Code:**
- `/get_Partitioned_BarChart`: Retrieves data from SQL database (`adidas_data`) to generate a partitioned bar chart of total sales per region and state.
- Uses Pandas to execute SQL query, processes the data, and returns it in JSON format for front-end visualization.

## Frontend Integration

**HTML (index.html):**
- Contains meta information, links to AM5 library and themes, external stylesheet (`style.css`), and a favicon.
- Includes header with Adidas logo and title, container elements for different charts with corresponding titles.
- Script references for chart implementations are included at the end.

**CSS (style.css):**
- Styles for chart div containers (`#chartdiv_pie`, `#chartdiv_bar`, `#chartdiv_bar2`, `#chartdiv_bar3`, `#chartdiv_line`).
- Header styling with flex display, background color, padding, and border-radius.
- Adidas logo styling for width and margin.
- Title (`h1`) and subtitle (`h2`) styling for font family, size, color, text transformation, and letter spacing.

**Flask Application (server.py):**
- Initializes a SQLite database connection using `data.db`.
- Reads data from a CSV file (`Adidas.csv`), converts it into a Pandas DataFrame, and stores it in the SQLite database table `adidas_data` using SQLAlchemy.
- Sets up a route (`/`) that renders the `index.html` template.

## Suggested Future Work
- Implementing a line chart to show the total profit or sales per month.
- Implementing a map chart to show the frequency of profit compared to the region and state.
- Adding a drop-down menu to navigate between the total sales or profit of each product for the partitioned bar chart.

## How to Run
- Install necessary packages.
- Run the code using the run button or terminal with the command: `python server.py`.

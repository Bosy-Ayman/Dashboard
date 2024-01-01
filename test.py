# from flask import Flask, jsonify, render_template 
# import sqlite3
# import pandas as pd
# from sqlalchemy import create_engine
# from sqlite3 import Error

# def create_connection(db_file):
#     """ create a database connection to a SQLite database """
#     conn = None
#     try:
#         conn = sqlite3.connect(db_file)
#     except Error as e:
#         print(e)
#     return conn

# df = pd.read_csv("Adidas.csv")
# connection = create_connection('data.db')
# df.to_sql('adidas_data', connection, if_exists='replace')
# connection.close()

# db_url = 'sqlite:///data.db'
# engine = create_engine(db_url, echo=True)

# unit_sold = pd.read_sql("""
#    SELECT
#     "Product",
#     SUM(REPLACE("Units Sold", ',', '')) AS "Units Sold"
# FROM
#     "adidas_data"
# GROUP BY
#     "Product";

# """, engine)
# total_sales = pd.read_sql("""
#     SELECT
#         Product,
#         SUM(REPLACE(REPLACE(`Total Sales`, ',', ''), '$', '')) AS `Total Sales`
#     FROM
#         adidas_data
#     GROUP BY
#         Product
# """, engine)

# Operating_Profit = pd.read_sql("""
#     SELECT
#         Product,
#         SUM(REPLACE(REPLACE(`Operating Profit`, ',', ''), '$', '')) AS `Operating Profit`
#     FROM
#         adidas_data
#     GROUP BY
#         Product
# """, engine)
# Market_share = pd.read_sql("""
#     SELECT
#         Retailer,
#         SUM(REPLACE(REPLACE(`Total Sales`, ',', ''), '$', '')) AS `Total Sales`
#     FROM
#         adidas_data
#     GROUP BY
#         Retailer
#     """, engine)
# # price = pd.read_sql("""
# #     SELECT
# #         Product,
# #         SUM(REPLACE(REPLACE(`Price per Unit`, ',', ''), '$', '')) AS `Price per Unit`
# #     FROM
# #         adidas_data
# #     GROUP BY
# #         Product
# #     """, engine)
# loc = pd.read_sql("""
#     SELECT
#         City,State,
#         SUM(REPLACE(REPLACE(`Price per Unit`, ',', ''), '$', '')) AS `Price per Unit`
#     FROM
#         adidas_data
#     GROUP BY
#         City,State
#     """, engine)
# count = pd.read_sql("""
#    SELECT
#     Region,
#     State,
#     SUM(REPLACE(REPLACE(`Price per Unit`, ',', ''), '$', '')) AS `Total Sales`
# FROM
#     adidas_data
# GROUP BY
#     Region, State

#     """, engine)
# print(total_sales)
# print(unit_sold)
# print(Operating_Profit)
# print(loc)
# print(count)
# date = pd.read_sql("""
#     SELECT
#         `Invoice Date` AS `Date`,
      
#         SUM(REPLACE(REPLACE(`Operating Profit`, ',', ''), '$', '')) AS `Operating Profit`
#     FROM
#         adidas_data
#     GROUP BY
#          `Date`;
#     """, engine)
# print(date)

# print(date)
# @app.route('/get_MapChart')
# def get_MapChart():
#     count = pd.read_sql("""
#    SELECT
#     Region,
#     State,
#     City,
#     SUM(REPLACE(REPLACE(`Price per Unit`, ',', ''), '$', '')) AS `Total Sales`
#     FROM
#     adidas_data
#     GROUP BY
#     Region, State,City

#     """, engine)
    
#     classes = count["Region"].values
#     state= count["State"].values
#     values = count["Total Sales"].value_counts().index
#     city = count["City"].values
#     data = []
#     for i in range(len(classes)):
#         data.append({"city":classes[i],"sales":int(values[i]),"state":state[i],"city":city[i]})
#     return jsonify(data)
# @app.route('/get-linechart')
# def get_Linechart():
#     # Prepare data for chart
#     date = pd.read_sql("""
#     SELECT
#         Day, Month,Year as 'Day', 'Month','Year'
      
#         SUM(REPLACE(REPLACE(`Operating Profit`, ',', ''), '$', '')) AS `Operating Profit`
#     FROM
#         adidas_data
#     GROUP BY
#          'Day', 'Month','Year';
#     """, engine)
#     classes = date["Date"].values
#     values = date["Operating Profit"].values
#     data = []
#     for i in range(len(classes)):
#         data.append({"date":classes[i],"value":int(values[i])})
#     return jsonify(data)

# date = pd.read_sql("""
#     SELECT
#         Day, Month,Year as 'Day', 'Month','Year'
      
#         SUM(REPLACE(REPLACE(`Operating Profit`, ',', ''), '$', '')) AS `Operating Profit`
#     FROM
#         adidas_data
#     GROUP BY
#          'Day', 'Month','Year';
#     """, engine)
# print(date)
# @app.route('/get-linechart')
# def get_Linechart():
#     query = """
#     SELECT
#         `Invoice Date` AS `Date`,
#         SUM(REPLACE(REPLACE(`Operating Profit`, ',', ''), '$', '')) AS `Operating Profit`
#     FROM
#         adidas_data
#     GROUP BY
#         `Date`;
#     """
#     date = pd.read_sql(query, engine)

#     # Process the data for the chart
#     classes = date["Date"]
#     values = date["Operating Profit"].values
#     data = []
#     for i in range(len(classes)):
#         date_str = classes[i]
#         timestamp = datetime.strptime(date_str, "%m/%d/%Y").timestamp()
#         data.append({"date": int(timestamp * 1000), "value": int(values[i])})

#     # Return the data as JSON
#     return jsonify(data)

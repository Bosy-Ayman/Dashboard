from flask import Flask, jsonify, render_template 
import sqlite3
import pandas as pd
from sqlalchemy import create_engine
from sqlite3 import Error
from datetime import datetime
def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn

df = pd.read_csv("Adidas.csv")
connection = create_connection('data.db')
df.to_sql('adidas_data', connection, if_exists='replace')
connection.close()

db_url = 'sqlite:///data.db'
engine = create_engine(db_url, echo=True)


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get-piechart')
def get_piechart():
    Market_Share = pd.read_sql("""
    SELECT
        Retailer,
        SUM(REPLACE(REPLACE(`Total Sales`, ',', ''), '$', '')) AS `Total Sales`
    FROM
        adidas_data
    GROUP BY
        Retailer
    """, engine)
    
    classes = Market_Share["Retailer"].values  # Use values to get the array of values
    values = Market_Share["Total Sales"].values
    
    data = []
    for i in range(len(classes)):
        data.append({"class": classes[i], "value": int(values[i])})
    
    return jsonify(data)

@app.route('/get-barchart')
def get_barchart():
    
    price = pd.read_sql("""
    SELECT
        Product,
        SUM(REPLACE(REPLACE(`Total Sales`, ',', ''), '$', '')) AS `Total Sales`
    FROM
        adidas_data
    GROUP BY
        Product
    """, engine)
    
    classes = price["Product"].value_counts().index
    values = price["Total Sales"].values
    data = []
    for i in range(len(classes)):
        data.append({"class":classes[i],"value":int(values[i])})
    return jsonify(data)



@app.route('/get_Partitioned_BarChart')
def get_Partitioned_BarChart():
    # Prepare data for chart
    
    count = pd.read_sql("""
   SELECT
    Region,
    State,
    SUM(REPLACE(REPLACE(`Price per Unit`, ',', ''), '$', '')) AS `Total Sales`
    FROM
    adidas_data
    GROUP BY
    Region, State

    """, engine)
    
    classes = count["Region"].values
    state= count["State"].values
    values = count["Total Sales"].value_counts().index

    data = []
    for i in range(len(classes)):
        data.append({"city":classes[i],"sales":int(values[i]),"state":state[i]})
    return jsonify(data)


@app.route('/get-barchart3')
def get_barchart3():
    sales = pd.read_sql("""
    SELECT
        Product,
        SUM(REPLACE(REPLACE(`Operating Profit`, ',', ''), '$', '')) AS `Operating Profit`
    FROM
        adidas_data
    GROUP BY
        Product
    """, engine)
    classes = sales["Product"].value_counts().index
    values2 =sales["Operating Profit"].values
    data = []
    for i in range(len(classes)):
            data.append({"class":classes[i],"value":int(values2[i])})
    return jsonify(data)


@app.route('/get-linechart')
def get_Linechart():
    query = """
    SELECT
        `Invoice Date` AS `Date`,
        SUM(REPLACE(REPLACE(`Total Sales`, ',', ''), '$', '')) AS `Total Sales`
    FROM
        adidas_data
    GROUP BY
        `Date`;
    """
    date = pd.read_sql(query, engine)

    # Process the data for the chart
    classes = date["Date"]
    values = date["Total Sales"].values
    data = []
    for i in range(len(classes)):
        date_str = classes[i]
        timestamp = datetime.strptime(date_str, "%m/%d/%Y").timestamp()
        data.append({"date": int(timestamp * 1000), "value": int(values[i])})

    # Return the data as JSON
    return jsonify(data)

@app.route('/get-pyramidchart')
def get_pyramidchart():
    sales = pd.read_sql("""
    SELECT
        Product,
        count(REPLACE(REPLACE(`Units Sold`, ',', ''), '$', '')) AS `Units Sold`
    FROM
        adidas_data
    GROUP BY
        Product
    """, engine)
    classes = sales["Product"].value_counts().index
    values2 =sales["Units Sold"].values
    data = []
    for i in range(len(classes)):
            data.append({"class":classes[i],"value":int(values2[i])})
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=3000)

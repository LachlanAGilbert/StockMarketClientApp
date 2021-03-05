//import external functions
import React from 'react';

//the function being exported displaying a welcome message and image
export default function Home() {
    return (
      <div id = "Home">
        <h1>Stocks Galore</h1>
        <p id="Welcome">
        Welcome to the Stocks Galore. Here you can view a multitude of 
        stocks and their current status in the stock market. To view, 
        all stocks click on the All Stocks tab above. To view the latest 
        stocks for specific symbol click on the Search Stocks button above. 
        To see a record of a particular stock symbol first login or register 
        and then click the Authenticated Search option above. Click the first 
        option on the right to register an account and the final option to login.
        </p>
        <img 
        src="https://i.ytimg.com/vi/UcE3TkroWC4/maxresdefault.jpg"
        id = 'stockMarketImage'
        alt = 'stock Market'/>
      </div>
    )
  }
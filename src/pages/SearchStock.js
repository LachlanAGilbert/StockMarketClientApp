//import external functions
import React from 'react';
import { useState, useEffect } from "react"

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from 'reactstrap';

//define the columns
let columns = [
  { headerName: "Timestamp", field: "timestamp" },
  { headerName: "Symbol", field: "symbol" },
  { headerName: "Name", field: "name" },
  { headerName: "Industry", field: "industry" },
  { headerName: "Open", field: "open" },
  { headerName: "Low", field: "low" },
  { headerName: "High", field: "high" },
  { headerName: "Close", field: "close" },
  { headerName: 'Volume', field: "volume" }
]

//define the url
function getData(search) {
  const url = `http://131.181.190.87:3000/stocks/` + (search ? `${search}` : '');

  //throw error 
  const error = code => {
    throw new Error(code);
  };

  //return the data retrieved from the API
  return fetch(url)
    .then(res => (res.status > 404 ? error(res.status) : res))
    .then(res => res.json())
    .then(res => {
      console.log(res);
      columns.timestamp = res.timestamp;
      columns.symbol = res.symbol;
      columns.name = res.name;
      columns.industry = res.industry;
      columns.open = res.open;
      columns.low = res.low;
      columns.high = res.high;
      columns.close = res.close;
      columns.volume = res.volumes;
    })
}

//create delay for the search of the data
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
}

//use data decides which data is going to be displayed
function useData(search) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(
    () => {
      setLoading(true);
      getData(debouncedSearch)
        .then(stock => {
          setStock(stock);
          setLoading(false);
        })
        .catch(e => {
          setError(e);
          setLoading(false);
        });

    }, [debouncedSearch]
  );
  return {
    stock,
    loading,
    error,
  }
}

//searchBar is used to create the searchbar used in the application
function SearchBar(props) {
  const [searchStock, setSearchStock] = useState('');

  return (
    <div>
      <input
        aria-labelledby="search-button"
        type="text"
        name="search"
        id='search'
        value={searchStock}
        onChange={e => {
          setSearchStock(e.target.value);
          props.onSearch(e.target.value);
        }}
      />
      <Button onClick={e => {
        setSearchStock("");
        props.onSearch("");
      }}
      >
        Clear
            </Button>
    </div>
  )
}

//
function Stock({ title, searchTerm }) {
  if (!searchTerm) {
    return (
      <p>{title}</p>
    )
  }

  return (
    <p>hi</p>
  );
}

//the function being exported
export default function SearchStock() {
  //define useStates
  const [search, setSearch] = useState("");
  const { stock, loading } = useData(search);

  //define the row data
  const rowData = [
    {
      timestamp: columns.timestamp,
      symbol: columns.symbol,
      name: columns.name,
      industry: columns.industry,
      open: columns.open,
      low: columns.low,
      high: columns.high,
      close: columns.close,
      volume: columns.volume
    }]

  //if the input is blank then prompt the user to enter a input
  if (search === '') {
    //the html code which the react app diplays
    return (
      <div>
        <h1>Search Stock</h1>
        <p id="searchInstructions">
          To search via symbol enter the symbol into the search bar below.
            </p>
        <SearchBar onSearch={value => setSearch(value)} />
        <br></br>
        <p id='searchStockErrorMessage'>Please enter a value into the search bar</p>
      </div>
    )
  }

  //if the symbol entered doesn't exist propmt the use to enter an different symbol
  if (columns.symbol !== search) {
    //the html code which the react app displays
    return (
      <div>
        <h1>Search Stock</h1>
        <p id="searchInstructions">
          To search via symbol enter the symbol into the search bar below.
            </p>
        <SearchBar onSearch={value => setSearch(value)} />
        <br></br>
        <p id='searchStockErrorMessage'>No entry for this symbol in stocks database. Please enter a valid symbol.</p>
      </div>
    )
  }

  //else return the data
  else {
    //the html code which the react app displays
    return (
      <div>
        <h1>Search Stock</h1>
        <p id="searchInstructions">
          To search via symbol enter the symbol into the search bar below.
        </p>
        <SearchBar onSearch={value => setSearch(value)} />
        <div id='searchResults'>

          {!loading ? (
            stock && stock.length > 0 ? (
              stock.map(stock => (
                <Stock key={stock.symbol} searchTerm={search} />
              ))
            ) : (
                <div
                  className="ag-theme-balham"
                  style={{
                    height: "80px",
                    width: "100%"
                  }}>

                  <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}


                  />
                </div>
              )
          ) : (
              <p>Loading ...</p>

            )}
        </div>
        <br></br>
        <p
          id="searchStockInfo">
          The latest result for {columns.name} was recorded on {columns.timestamp}.
          For that timestamp the market open with a value of {columns.open} and close with a value of {columns.close}.
          Over the duration of the day, the stocked peaked with a value of {columns.high} and was at its lowest with a value of {columns.low}.
          The volume of this stock sits at {columns.volume} units.
        </p>
      </div>
    )
  }
}
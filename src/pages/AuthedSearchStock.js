//import all of the node functions
import React from 'react';
import { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//define columns
let columns = [
    { headerName: "Timestamp", field: "timestamp" },
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
    { headerName: "Open", field: "open" },
    { headerName: "Low", field: "low" },
    { headerName: "High", field: "high" },
    { headerName: "Close", field: "close" },
    { headerName: 'Volume', field: "volumes" }
]

//declare the export function
export default function AuthedSearch() {
    //define use states
    const [rowData, setRowData] = useState([]);
    const token = localStorage.getItem('token');
    const [dropdownOpen, setOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const [timeframe, setTimeFrame] = useState('');

    const toggle = () => setOpen(!dropdownOpen);

    //define the url
    const url = `http://131.181.190.87:3000/stocks/authed/` + (search ? `${search}` : 'A') + `?from=` + (start ? `${start}` : '2019-11-06T14:00:00.000Z') + `&to=` + (end ? `${end}` : '2020-03-24T14:00:00.000Z')

    //define the header for autherization
    const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }

    //iniciate the use effect to retrieve the data from the API
    useEffect(() => {
        fetch(url, { headers })
            .then(res => res.json())
            .then(res =>
                res.map(stocks => {
                    return {
                        timestamp: stocks.timestamp,
                        symbol: stocks.symbol,
                        name: stocks.name,
                        industry: stocks.industry,
                        open: stocks.open,
                        low: stocks.low,
                        high: stocks.high,
                        close: stocks.close,
                        volumes: stocks.volumes
                    }
                })
            )
            .then(inputs => setRowData(inputs))
    })


    //create the array for the data to be user in the graph
    let graphData =
        [["TimeStamp", "Close Value"]]

    for (let i = rowData.length - 1; i >= 0; i--) {
        graphData.push([rowData[i].timestamp, parseFloat(rowData[i].close)])
    }

    //define the options for the graph
    const options = {
        title: `Close value for Stock ` + (search ? `${search}` : 'A') + `${timeframe}`,
        curveType: "function"

    }

    //if we no connected to the server prompt the user to login
    if (rowData[0] == null) {
        return (
            <div>
                <h1>Authenticated Search of Stocks</h1>
                <br></br>
                <p id="notLoggedIn">
                    please ensure you are logged in.
                </p>
            </div>
        )
    }

    //if the is nothing enter prompt the use to enter a value
    if (search === '') {
        return (
            <div>
                <h1>Authenticated Search of Stocks</h1>
                <p
                    id="searchInstructions">
                    Before searching please login. To search enter the symbol you wish to look for.
                    To select the date please choose one of the options from the drop down button bellow.
                </p>
                <div
                    id="authedSearchSearchBar">
                    <div>
                        <label>Symbol:</label>
                        <input
                            id="authedSearchSymbol"
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                            }}></input>
                        <br></br>
                        <p>Please enter a value into the search bar above.</p>
                    </div>
                </div>
            </div>
        )
    }

    //if the symbols dont match the results then diplay that the symbol doesn't exist
    if (rowData[0].symbol !== search) {
        return (
            <div>
                <h1>Authenticated Search of Stocks</h1>
                <p
                    id="searchInstructions">
                    Before searching please login. To search enter the symbol you wish to look for.
                    To select the date please choose one of the options from the drop down button bellow.
                </p>
                <div
                    id="authedSearchSearchBar">
                    <div>
                        <label>Symbol:</label>
                        <input
                            id="authedSearchSymbol"
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                            }}></input>
                        <br></br>
                        <p>Please ensure a valid stock symbol has been entered</p>
                    </div>
                </div>
            </div>
        )
    }

    //else show the data
    else {
        //the html code which the react app displays
        return (
            <div>
                <h1>Authenticated Search of Stocks</h1>
                <p
                    id="searchInstructions">
                    Before searching please login. To search enter the symbol you wish to look for.
                    To select the date please choose one of the options from the drop down button bellow.
            </p>
                <div
                    id="authedSearchSearchBar">
                    <div>
                        <label>Symbol:</label>
                        <input
                            id="authedSearchSymbol"
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                            }}></input>
                    </div>
                    <Button onClick={e => {
                        setSearch('');
                    }}>
                        Clear
                </Button>
                    <div>
                        <br></br>
                        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret>
                                Dates
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={e => {
                                    setStart('2019-11-06T14:00:00.000Z')
                                    setEnd('2020-03-24T14:00:00.000Z')
                                    setTimeFrame('with timeframe of November 2019 to March 2020')
                                }}>All</DropdownItem>

                                <DropdownItem onClick={e => {
                                    setStart('2019-11-06T14:00:00.000Z')
                                    setEnd('2019-11-30T14:00:00.000Z')
                                    setTimeFrame('with timeframe of November 2019')
                                }}>November 2019</DropdownItem>

                                <DropdownItem onClick={e => {
                                    setStart('2019-12-01T14:00:00.000Z')
                                    setEnd('2019-12-31T14:00:00.000Z')
                                    setTimeFrame('with timeframe of December 2019')
                                }}>December 2019</DropdownItem>

                                <DropdownItem onClick={e => {
                                    setStart('2020-01-01T14:00:00.000Z')
                                    setEnd('2020-01-31T14:00:00.000Z')
                                    setTimeFrame('with timeframe of January 2020')
                                }}>January 2020</DropdownItem>

                                <DropdownItem onClick={e => {
                                    setStart('2020-02-01T14:00:00.000Z')
                                    setEnd('2020-02-29T14:00:00.000Z')
                                    setTimeFrame('with timeframe of February 2020')
                                }}>February 2020</DropdownItem>

                                <DropdownItem onClick={e => {
                                    setStart('2020-03-01T14:00:00.000Z')
                                    setEnd('2020-03-24T14:00:00.000Z')
                                    setTimeFrame('with timeframe of March 2020')
                                }}>March 2020</DropdownItem>

                                <DropdownItem onClick={e => {
                                    setStart('2019-11-06T14:00:00.000Z')
                                    setEnd('2019-12-31T14:00:00.000Z')
                                    setTimeFrame('with timeframe of November 2019 to December 2019')
                                }}>2019</DropdownItem>

                                <DropdownItem onClick={e => {
                                    setStart('2020-01-01T14:00:00.000Z')
                                    setEnd('2020-03-24T14:00:00.000Z')
                                    setTimeFrame('with timeframe of January 2020 to March 2020')
                                }}>2020</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                </div>
                <div
                    className="ag-theme-balham"
                    id="authedStocks"
                    style={{
                        height: "300px"
                    }}>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={rowData}
                        pagination={true}
                        paginationPageSize={10}
                    />
                </div>
                <Chart
                    chartType="LineChart"
                    width='90%'
                    height='400px'
                    data={graphData}
                    options={options}
                />
                <br></br>
            </div>
        )
    }
}
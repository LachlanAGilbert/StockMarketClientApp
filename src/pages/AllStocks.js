//import external functions
import React from 'react';
import { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//declare the columns
const columns = [
  { headerName: "Name", field: "name", sortable: true },
  { headerName: "Symbol", field: "symbol", sortable:true },
  { headerName: "Industry", field: "industry" }
]

//function being exported
export default function AllStock() {
  //create useStates
  const [rowData, setRowData] = useState([]);
  const [dropdownOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  //define a toggle value for the dropdown
  const toggle = () => setOpen(!dropdownOpen);

  //define the url
  const url = `http://131.181.190.87:3000/stocks/symbols` + (search ? `?industry=${search}` : '');

  //useEffect used to retrieve the data from the API
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data =>
        data.map(stocks => {
          return {
            name: stocks.name,
            symbol: stocks.symbol,
            industry: stocks.industry
          };
        })
      )
      .then(inputs => setRowData(inputs));
  }, [url]);

  //the html code which the react app displays
  return (
    <div>
      <h1>All Stocks</h1>

      <p id="allHowSearch">
        Scroll through all the Stocks or search by industry by clicking on the Industries button and selecting the relevant industry.
      </p>

      <div
        className="ag-theme-balham"
        id="allStock"
        style={{
          height: "600px",
          width: "620px"
        }}>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            Industries
            </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={value => setSearch('')}>All</DropdownItem>
            <DropdownItem onClick={value => setSearch('Health%20Care')}>Health Care</DropdownItem>
            <DropdownItem onClick={value => setSearch('Industrials')}>Industrials</DropdownItem>
            <DropdownItem onClick={value => setSearch('Consumer%20Discretionary')}>Consumer Discretionary</DropdownItem>
            <DropdownItem onClick={value => setSearch('Information%20Technology')}>Information Technology</DropdownItem>
            <DropdownItem onClick={value => setSearch('Consumer%20Staples')}>Consumer Staples</DropdownItem>
            <DropdownItem onClick={value => setSearch('Utilities')}>Utilities</DropdownItem>
            <DropdownItem onClick={value => setSearch('Financials')}>Financials</DropdownItem>
            <DropdownItem onClick={value => setSearch('Real%20Estate')}>Real Estate</DropdownItem>
            <DropdownItem onClick={value => setSearch('Materials')}>Materials</DropdownItem>
            <DropdownItem onClick={value => setSearch('Energy')}>Energy</DropdownItem>
            <DropdownItem onClick={value => setSearch('Telecommunication%20Services')}>Telecommunication Services</DropdownItem>

          </DropdownMenu>
        </ButtonDropdown>
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={25}
        />
      </div>
    </div>
  )
}
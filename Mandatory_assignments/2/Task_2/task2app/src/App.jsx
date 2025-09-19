import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.jsx";
import SearchBar from "./SearchBar.jsx";
import Pagination from "./Paginiation.jsx";
import PageSize from "./Pagesize.jsx";

function App() {
    /* Create state:
        - apiData: List containing dictionaries of countries from API.
        - searchQuery: The query parameter that should be added to &search=
        - pageNumber: The page that is requested
        - pageSize: Amount of entries per page
  */

    const [apiData, setApiData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(); // Default = No search query
    const [pageNumber, setPageNumber] = useState(1); //Default = Page 1
    const [pageSize, setPageSize] = useState(10); //Default = size of 10

    useEffect(() => {
        // All parameters are appended to this URL.
        let apiQuery = "https://dhis2-app-course.ifi.uio.no/api?";

        // If searchQuery isn't empty add &search=searchQuery to the API request.
        if (searchQuery) {
            apiQuery = apiQuery + "&search=" + searchQuery;
        }

        // Add what page we are requesting to the API request.
        apiQuery = apiQuery + "&page=" + pageNumber + "&pageSize=" + pageSize;

        // Query data from API.
        console.log("Querying: " + apiQuery);
        fetch(apiQuery)
            .then((results) => results.json())
            .then((data) => {
                // Then add response to state.
                setApiData(data);
            });
    }, [searchQuery, pageNumber, pageSize]); // Array containing which state changes that should re-reun useEffect()

    return (
        <div className="App">
            <h1>Country lookup</h1>
            <SearchBar
                setSearchQuery={setSearchQuery}
                setPageNumber={setPageNumber}
            />
            <Table apiData={apiData} />
            <PageSize currentSize={pageSize} setPageSize={setPageSize}/>
            <Pagination
                currentPage={pageNumber}
                setPageNumber={setPageNumber}
                apiData={apiData}
            />
        </div>
    );
}

export default App;

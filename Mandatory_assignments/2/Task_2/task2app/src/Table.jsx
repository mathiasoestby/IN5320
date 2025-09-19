import "./Table.css";

function Table(props) {
    const tableHeaders = [
        "Country",
        "Continent",
        "Population",
        "Population Growth",
    ];

    const [prevSortHeader, prevSortDirection] = props.sortBy?.split(":")
    const headerIcon = prevSortDirection === "ASC"? "⬇️":"⬆️" 
    

    const handleClick = (header) => {
        
        let direction = "ASC"
        if (prevSortHeader === header) {
            // Toggle sort direction if the same header is clicked
            direction = prevSortDirection === "DESC" ? "ASC" : "DESC"
        }
        props.setSortBy(`${header}:${direction}`);
    };

    if (!props.apiData.results) {
        // If the API request isn't completed return "loading...""
        return <p>Loading...</p>;
    }    
    return (
            <table>
                <thead>
                    <tr>
                    {tableHeaders.map((header) => {
                        return (
                            <th
                                key={header}
                                onClick={() =>
                                    handleClick(header.replace(/\s+/g, ""))
                                }
                            >
                                {header}{" "}
                                {prevSortHeader === header.replace(" ", "")
                                    ? headerIcon
                                    : ""}
                            </th>
                        );
                    })}
                    </tr>
                </thead>
                <tbody>
                    {props.apiData.results.map((data) => {
                        return (
                            <tr key={data.Country}>
                                {tableHeaders.map((header) => {
                                    // Iterate headers to generate each cell; 
                                    // header text (whitespace removed) matches data property names
                                    const propKey = header.replace(/\s+/g, ""); //remove whitespace
                                    return <td key={propKey}>{data[propKey]}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

export default Table;

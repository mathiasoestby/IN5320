function Table(props) {
    console.log(props.apiData);

    if (!props.apiData.results) {
        // If the API request isn't completed return "loading...""
        return <p>Loading...</p>;
    } else {
        // Write your code here:
        return (
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Continent</th>
                        <th>Population</th>
                        <th>Population Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {props.apiData.results.map((data) => {
                        return (
                            <tr key={data["Country"]}>
                                <td>{data.Country}</td>
                                <td>{data.Continent}</td>
                                <td>{data.Population}</td>
                                <td>{data.PopulationGrowth}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default Table;

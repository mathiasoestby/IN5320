function PageSize(props) {
    return (
        <>
            <label htmlFor="pagesize">Page size:</label>
            <select 
                name="pagesize" 
                id="pagesize"
                value={props.PageSize}
                onChange={(e) => props.setPageSize(e.target.value)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </>
    );
}

export default PageSize;

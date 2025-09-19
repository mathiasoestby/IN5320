import { useState } from "react";

function SearchBar(props) {
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setSearchQuery(searchValue);
        props.setPageNumber(1);
    };

    const onChange = (e) => setSearchValue(e.target.value);

    return (
        <search>
            <form action="" onSubmit={handleSubmit}>
                <input
                    name="searchfield"
                    type="search"
                    value={searchValue}
                    onChange={onChange}
                />
                <button type="submit">Search</button>
            </form>
        </search>
    );
}

export default SearchBar;

function Pagination(props) {
    if (!props.apiData.pager) {
        return <>...</>;
    }

    const currentPage = props.currentPage;
    const maxPage = props.apiData.pager.pageCount;

    const handleClickPrev = (e) => {
        if (currentPage == 0) return;
        props.setPageNumber((current) => current - 1);
    };

    const handleClickNext = (e) => {
        if (currentPage >= props.maxPage) return;
        props.setPageNumber((current) => current + 1);
    };

    return (
        <nav>
            {currentPage > 1 && (
                <button id="prevBtn" type="button" onClick={handleClickPrev}>
                    Previous
                </button>
            )}
            <button className="currBtn" type="button">
                {currentPage}
            </button>
            {currentPage < maxPage && (
                <button
                    className="nextBtn"
                    type="button"
                    onClick={handleClickNext}
                >
                    Next
                </button>
            )}
        </nav>
    );
}

export default Pagination;

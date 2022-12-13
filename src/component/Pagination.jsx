import Box from '@mui/material/Box';
import ReactPaginate from 'react-paginate';
import { ROW_PER_PAGE } from '../utils/constants';

const Pagination = ({ currentPage, onCurrentPage, apiData }) => {

    const handlePageChange = (event) => {
        onCurrentPage(event.selected + 1)
    }

    return (
        <Box className='pagination'>
            <ReactPaginate
                nextLabel='>'
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                forcePage={currentPage - 1}
                pageCount={Math.ceil(apiData.length / ROW_PER_PAGE)}
                previousLabel='<'
                pageClassName="pagination__page--item mr-2"
                pageLinkClassName="pagination__page--item typo-normal"
                previousClassName="pagination__page--item"
                previousLinkClassName="pagination__page--item"
                nextClassName="pagination__page--item"
                nextLinkClassName="pagination__page--item"
                breakLabel="..."
                breakClassName="pagination__page--item"
                breakLinkClassName="pagination__page--item typo-normal"
                containerClassName="pagination__page d-flex justify-center"
                activeClassName="active"
            />
        </Box>
    )
}


export default Pagination
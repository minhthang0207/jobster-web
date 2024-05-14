import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { changePage } from '../features/allJobs/allJobsSlice'
const PageBtnContainer = () => {
  const { page, numOfPages } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    dispatch(changePage(newPage))
  }

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    dispatch(changePage(newPage))
  }

  return (
    <Wrapper>
      {/* Prev button */}
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft /> prev
      </button>

      {/* page */}
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      {/* Next button */}
      <button type="button" className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
export default PageBtnContainer

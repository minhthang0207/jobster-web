import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice'
import { useMemo, useState } from 'react'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs)
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }

  const debounce = () => {
    console.log('run debounce')
    let timeOutID
    clearTimeout(timeOutID)
    return (e) => {
      setLocalSearch(e.target.value)
      timeOutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Search Form</h4>
        <div className="form-center">
          {/* Search  position*/}
          <FormRow
            type="text"
            name="search"
            handleChange={optimizedDebounce}
            value={localSearch}
          />

          {/* Search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />

          {/* Search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />

          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            type="submit"
            className="btn btn-block btn-danger"
            disabled={isLoading}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer

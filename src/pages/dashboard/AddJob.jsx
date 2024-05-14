import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow, FormRowSelect } from '../../components/'
import { toast } from 'react-toastify'
import {
  clearValues,
  handleChange,
  createJob,
  editJob,
} from '../../features/job/jobSlice'
import { useEffect } from 'react'

const AddJob = () => {
  const user = useSelector((store) => store.user.user)
  const dispatch = useDispatch()
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job)

  const handleSubmit = (e) => {
    e.preventDefault()
    if ((!position || !company, !jobLocation)) {
      toast.error('Please fill all fields')
      return
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      )
      return
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }))
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChange({ name, value }))
  }

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }))
    }
  }, [])
  return (
    <Wrapper>
      <form className="form">
        {/* Title */}
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        <div className="form-center">
          {/* Position */}
          <FormRow
            type="input"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* Company */}
          <FormRow
            type="input"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />

          {/* Job Location */}
          <FormRow
            type="input"
            name="jobLocation"
            value={jobLocation}
            labelText="job location"
            handleChange={handleJobInput}
          />

          {/* Status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* Job Type */}
          <FormRowSelect
            labelText="job type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* Button */}
          <div className="btn-container">
            {/* Clear btn */}
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            {/* Submit btn */}
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob

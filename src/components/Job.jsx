import Wrapper from '../assets/wrappers/Job'
import { Link } from 'react-router-dom'
import JobInfo from './JobInfo'
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteJob, setEditJob } from '../features/job/jobSlice'
const Job = ({
  company,
  createdAt,
  createdBy,
  jobLocation,
  jobType,
  position,
  status,
  updatedAt,
  _id,
}) => {
  const dispatch = useDispatch()
  const date = moment(createdAt).format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <Link
            to="/add-job"
            className="btn edit-btn"
            onClick={() =>
              dispatch(
                setEditJob({
                  editJobId: _id,
                  position,
                  company,
                  jobLocation,
                  jobType,
                  status,
                })
              )
            }
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => dispatch(deleteJob(_id))}
          >
            Delete
          </button>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Job

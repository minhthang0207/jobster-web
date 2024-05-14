import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { logoutUser } from '../user/userSlice'
import { clearValues } from './jobSlice'
export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}
export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  console.log(jobId)
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`)
    thunkAPI.dispatch(getAllJobs())
    // console.log(resp)
    const msg = 'Deleted success'
    return msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = customFetch.patch(`/jobs/${jobId}`, job)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

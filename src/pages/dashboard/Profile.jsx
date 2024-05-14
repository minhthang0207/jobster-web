import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useState } from 'react'
import FormRow from '../../components/FormRow'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user)
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })
  const dispatch = useDispatch()
  const { name, email, lastName, location } = userData

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location) {
      console.log('Please Fill Out All Fields')
    }
    dispatch(updateUser(userData))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            value={lastName}
            labelText="last name"
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile

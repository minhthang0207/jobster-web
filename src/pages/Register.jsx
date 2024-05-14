import { Logo, FormRow } from '../components/index'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
const Register = () => {
  const [values, setValues] = useState(initialState)
  const { isLoading, user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast.warning('Please fill all field')
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }))
      return
    }
    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        return navigate('/')
      }, 2000)
    }
  }, [user])
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        {values.isMember ? <h3>login</h3> : <h3>register</h3>}

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="input"
            name="name"
            handleChange={handleChange}
            value={values.name}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          handleChange={handleChange}
          value={values.email}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          handleChange={handleChange}
          value={values.password}
        />
        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <button
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }}
        >
          {isLoading ? 'loading...' : 'demo'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'register' : 'login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register

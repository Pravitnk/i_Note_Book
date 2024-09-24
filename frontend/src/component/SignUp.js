import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
// useNavigate hook is use to redirect client to the Homepage

const SignUp = (props) => {
  // const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cPassword: '' })
  let history = useNavigate();

  //funcuin to submit the form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    //api call
    const { name, email, password, cPassword } = credentials // takes this all element out if credentials
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, cPassword })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken); //->save the authtoken in a localstorage
      props.showAlert('account created successfully please Login ', 'success');
      history("/login");
    }
    else {
      props.showAlert('Invalid Credentials ', 'danger');
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <div className='container item-center'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label"><h4>Name</h4></label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="name" name='name' onChange={onChange} placeholder='Enter your Full Name' />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label"><h4>Email</h4></label>
          <div className="col-sm-5">
            <input type="email" className="form-control" id="email" name='email' onChange={onChange} placeholder='Enter your Email' />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2 col-form-label"><h4>Password</h4></label>
          <div className="col-sm-5">
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required placeholder='Enter your Password' />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="cPassword" className="col-sm-2 col-form-label"><h4> Confirm Password</h4></label>
          <div className="col-sm-5">
            <input type="password" className="form-control" id="cPassword" name='cPassword' onChange={onChange} minLength={5} required placeholder='Confirm Password' />
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">SingUp</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp

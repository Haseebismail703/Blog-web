import React, { useState ,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { getAuth, signInWithEmailAndPassword, auth,provider, signInWithPopup, GoogleAuthProvider } from '../Config/C'
import 'aos/dist/aos.css'
import Aos from 'aos';
function Signin() {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  let Signin = () => {
    if (email == '' && password == '') {
      swal('Error', 'Enter a value', "error")
    }
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          swal("Good job!", "You Successfully sign in", "success")
          const user = userCredential.user;
          // console.log(user);
          setEmail('')
          setpassword('')
          navigate('/All')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log(errorMessage);
          swal('Somthing wrong', `${errorMessage}`, "error")
          setEmail('')
          setpassword('')
        });
    }
  }

  useEffect(() => {
    Aos.init({duration : 2000})
  }, [])

  let google = ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    navigate('/All')
    swal("Good job!", "You Successfully sign in", "success")
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    swal('Somthing wrong', `${errorMessage}`, "error")
  });
}
  return (

    <div className='div'>
      
      <hr />
      <section >
        <button data-aos="flip-up" className="bb">
          <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z" /></svg>
          <Link className='link' as={Link} to="/"><span>Back</span></Link>
        </button>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center div justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img data-aos="fade-up-right" src="https://cdn.create.vista.com/api/media/small/576417570/stock-photo-business-graph-computer-mug-tree-icon-business-data-market-elements" className='img-fluid' alt="image not found" />
            </div>
            <div data-aos="fade-up-left" className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"><span>Sign </span>In</h1>
              {/* Email input */}
              <div  className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">Email address</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form1Example13" className="form-control form-control-lg" />
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">Password</label>
                <input value={password} required type="password" onChange={(e) => setpassword(e.target.value)} id="form1Example23" className="form-control form-control-lg" />
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">

              </div>
              {/* Submit button */}
              <button  onClick={Signin} className="btn custom-btn btn-primary btn-lg btn-block">Sign in </button>     {''}
              <Button  as={Link} to={'/signup'} className="btn btn2 custom-btn btn- btn-lg btn-block">Creat new account</Button>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              {/*  */}
              <div >
              <Button onClick={google} className=" btn width btn-dark btn-lg btn-block "  >
                <svg viewBox="0 0 256 262" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
                  <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                  <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                  <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                  <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                </svg>
                <span style={{ marginLeft: 10 }}>Sign in with Google </span>

              </Button></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Signin
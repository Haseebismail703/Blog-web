import React from 'react'
import { useEffect } from 'react'
import '../style/Home.css'
import Navb from '../Components/Navbar'
import 'aos/dist/aos.css'
import Aos from 'aos';
function Contact() {
  useEffect(() => {
    Aos.init({duration : 2000})
  }, [])
  return (
    <>
    <Navb/><br />
    <div  className='contactus'  >
   <div className="contact3  py-5">
  <div className="row m-3 no-gutters">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="card-shadow">
            <img data-aos="fade-right"
              src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div data-aos="fade-left" className="contact-box ml-3">
            <h1 className="font-weight-light mt-2">Quick Contact</h1>
            
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Message"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    type="submit"
                    className="btn btn-danger-gradiant mt-3 text-white border-0 px-3 py-2"
                  >
                    <span> SUBMIT</span>
                  </button>
                </div>
              </div>
           
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card mt-4 border-0 mb-4">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail pl-0">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Address</h6>
                    <p className="">
                     Shershah
                      Karachi
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Phone</h6>
                    <p className="">
                      251 546 944
                      
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Email</h6>
                    <p className="">
                      haseebismail703@gmail.com
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    </>
  )
}

export default Contact
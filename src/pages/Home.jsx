import { Button, Image, Card, CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import img from '../Image/Blog-intro.jpg'
import '../style/Home.css'
import i from '../Image/i.png'
import m from '../Image/m.png'
import g from '../Image/g.png'
import Foter from '../Components/Foter'
import Navb from '../Components/Navbar'
import Loader from '../Components/Loader'
import Aos from 'aos';
import 'aos/dist/aos.css'
function Home() {
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <div className='pic'>
      {loader ? <Loader /> :
        <>
          <Navb />
          <div className="container px-5 pb-5">
            <div className="row gx-5 align-items-center">
              <div className="col-xxl-5">
                <div className="text-center text-xxl-start">
                  <div className="badge bg-gradient-primary-to-secondary text-white mb-4">

                  </div>


                  <div data-aos="fade-right" className="fs-3  p text-muted">
                    <p>Mastering the Art of Blogging with Ease</p>
                  </div>

                  <h1 className="display-3 fw-bolder mb-5">
                    <div data-aos="fade-left">
                      <span className="text-gradient d-inline">
                        Get online and grow fast
                      </span>
                    </div>
                  </h1>


                  <div data-aos="flip-up" className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                    <Button as={Link} to="/Signup" className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" >Sign up Now </Button>
                    <Button as={Link} to="/Signin" className="btn btn-secondary btn-lg px-5 py-3 fs-6 fw-bolder" >Sign in now</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="zoom-in">
            <center>
              <Image className='img' src={img} fluid />
            </center>
          </div>

          {/* card  */}
          {/* <center> */}
          <>
            <div className="main  m-5 ">

              <h1 data-aos="flip-up"  >How to Publish your'e First Blog</h1>
              <ul className="cards">
                <li className="cards_item" data-aos="fade-right"
                  data-aos-offset="100"
                  data-aos-easing="ease-in-sine"


                >
                  <div className="card">
                    <div className="card_image">
                      <center>
                        <img className='imgg' src={i} />
                      </center>
                    </div>

                    <div >
                      <center >
                        <div className="card_content" >
                          <h2 className="card_title">Creat a new account</h2>
                          <p className="card_text">
                            Click Sign up button and enter your'e email and password
                          </p>
                        </div>
                      </center>
                    </div>
                  </div>
                </li>




                <li className="cards_item" data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000">
                  <div className="card">
                    <div className="card_image" >
                      <center>
                        <img className='imgg' src={m} />
                      </center>
                    </div>
                    <div className="card_content">
                      <center>
                        <h2 className="card_title">Update youre profile</h2>
                        <p className="card_text">
                          Click profile icon and save your'e personal information
                        </p>
                      </center>
                    </div>
                  </div>
                </li>
                <li className="cards_item"  data-aos="fade-left"
                  data-aos-offset="100"
                  data-aos-easing="ease-in-sine">
                  <div className="card">
                    <div className="card_image">
                      <center>
                        <img className='imgg' src={g} />
                      </center>
                    </div>
                    <div className="card_content">
                      <center>
                        <h2 className="card_title">Publish your'e Blog</h2>
                        <p className="card_text">
                          Click the create now button write and publish your'e blog
                        </p>
                      </center>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </>
          <Foter />

        </>
      }
    </div>
  )


}

export default Home
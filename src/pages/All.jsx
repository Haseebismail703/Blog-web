import { useState, useEffect } from 'react'
import { collection, getDocs, db, auth, query, where } from '../Config/C'
import Modal from 'react-bootstrap/Modal';
import Navb from '../Components/Navbar'
import Loader from '../Components/Loader'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Aos from 'aos';
import 'aos/dist/aos.css'
import '../style/Card.css'
import swal from 'sweetalert';
function All() {
  const [data, setData] = useState([])
  const [go, setgo] = useState(false)
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [items, setitems] = useState('')
  const [loader, setloader] = useState(true)
  const [serch, setserch] = useState('All')
  const [all, setall] = useState(false)
  const user = auth.currentUser

  let btn = () => {
    if (serch == '') {
      swal('Error', 'Enter a value', "error")
    } else if (serch === 'All') {
      setloader(false)
      setall(true)
      getAll()
      setloader(true)
    }
    else {
      setloader(false)
      setall(true)
      get()
      setloader(true)
    }
  }


  let get = async () => {
    const q = query(collection(db, "blog"), where("category", "==", serch))
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(docs);
    setloader(false)
    setserch('')

  }

  let getAll = async () => {
    const querySnapsho = await getDocs(collection(db, "blog"));
    const docs = querySnapsho.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setData(docs);
    setloader(false)
  }


  useEffect(() => {
    if (all == true) {
      get()
    } else if (all == false) {
      getAll()
    }
    Aos.init({ duration: 2000 })
  }, [])

  // console.log(data);

  let All = () => {
    setloader(false)
    setall(true)
    getAll()
    setloader(true)
  }
  return (

    <div  >
      {loader == true ?
        <Loader /> :

        <div className='All' >
          <Navb />
          <br /><br /><br />


          <>

            <center>
              <InputGroup className="mb-1 inp">
                <Form.Control
                  value={serch}
                  onChange={(e) => setserch(e.target.value)}
                  placeholder="Enter Category"
                  aria-describedby="basic-addon2"
                />
                <Button onClick={btn} variant="outline-dark" id="button-addon2">
                  Search
                </Button>



              </InputGroup>
            </center>

            <div data-aos="flip-up" className='mb-1'  >
              {data.length == 0 ? <h1>No data available</h1> : <h1>All blog's</h1>}
            </div><br /><br />
            {data.length == 0 && <center> <Button onClick={All} variant="primary" size="lg">
               All Blog
            </Button></center>}


            <div data-aos="fade-right" className="main">
              <ul className="cards">
                {data.map((item, index) => (
                  <li className="cards_item " key={index}>
                    <div className="card">
                      <div className="card_image">
                        {item.url ? <img className='img' src={item.url} /> :
                          <img className='img' src='https://img.freepik.com/free-psd/3d-rendering-search-engine-background_23-2150562441.jpg?w=740&t=st=1709459229~exp=1709459829~hmac=621c4f49c21c871d1f0d7e449adb7f09f5548de8429f2ac88c9c209ad018d1bb' />
                        }
                      </div>
                      <div className="card_content-all">
                        <h5>{item.category ? item.category : 'No Category'}</h5>
                        <h2 className="card_title">{item.Tittle.slice(0, 26)}{'==>'}</h2><br />
                        <p className="card_text">
                          {item.textArea.slice(0, 25)}{'==>'}
                        </p>




                        <div className="cards__footer">
                          <div className="users">

                            {item.profile ?
                              <img
                                src={item.profile}
                                alt="user__image"
                                className="users__image"
                              />
                              : <img
                                src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-5590850-4652486.png"
                                alt="user__image"
                                className="users__image"
                              />
                            }
                            <div className="users__info">
                              <h5>{item.userName == '' ? 'No name' : item.userName}</h5>
                              <small>{item.Time}</small>
                            </div>
                          </div>
                        </div>




                        <button onClick={() => { setitems(item); setLgShow(true) }} className="btn card_btn">Read More</button>
                      </div>
                    </div>
                  </li>
                ))
                }
              </ul>
            </div>


            <h3 className="made_by">Made with Haseeb ♡</h3>
          </>

          <>





            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <center>
                <Modal.Header closeButton>
                  <div className="cards__footer">
                    <div className="users">
                      {items.profile ?
                        <img
                          src={items.profile}
                          alt="user__image"
                          className="users__image"
                        /> :

                        <img
                          src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-5590850-4652486.png"
                          alt="user__image"
                          className="users__image"
                        />
                      }

                      <div className="users__info">
                        <h3 className='small'> {items.userName}</h3>
                        {/* <small className='small'>data</small> */}
                      </div>
                    </div>

                  </div>
                </Modal.Header>
                <Modal.Body>

                  <h1>{items.Tittle}</h1>
                  <h5>{items.category ? items.category : ''}</h5>
                  {items.url ?

                    <img className='all-img' src={items.url} alt="" />
                    :
                    <img
                      className='all-img'
                      src="https://img.freepik.com/free-psd/3d-rendering-search-engine-background_23-2150562441.jpg?w=740&t=st=1709459229~exp=1709459829~hmac=621c4f49c21c871d1f0d7e449adb7f09f5548de8429f2ac88c9c209ad018d1bb"
                      alt="Not found" />

                  }

                  <br /><br />
                  <p>
                    {items.textArea}

                  </p>

                </Modal.Body>
              </center>
              <p className='post-date' >Posted Date:{items.Time} </p>
            </Modal>
          </>


        </div>

      }




    </div>
  )
}

export default All














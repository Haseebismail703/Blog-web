import { useState, useEffect } from 'react';
import { collection, getDocs, db, query, where, auth, onAuthStateChanged, deleteDoc, doc, updateDoc, storage, ref, uploadBytesResumable, getDownloadURL } from "../Config/C";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Navb from '../Components/Navbar'
import Loader from '../Components/Loader'
import '../style/Home.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
function Example() {
    //   bootstrape state or function
    const [show, setShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const handleShow = () => { setShow(true) }
    const handleClose = () => { setShow(false) }


    //   my state 
    const [data, setData] = useState([]);
    const [uid, setUid] = useState(null);
    const [item, setitem] = useState('')
    const [edit, setEdit] = useState('')
    const [tittle, settitle] = useState('')
    const [area, setarea] = useState('')
    const [loader, setLoader] = useState(false)
    const [img, setimg] = useState('')
    const [category, setcategory] = useState('')
    const [opt, setopt] = useState([])


    let U = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
            }
        })

    }


    const getUserData = async (uid) => {
        setLoader(true)
        const q = query(collection(db, "blog"), where("user", "==", uid));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(docs);
        setLoader(false)
    }
    let getoption = async () => {
        // setloader(false)
        const querySnapsho = await getDocs(collection(db, "cat"));
        const docs = querySnapsho.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setopt(docs);
        // setloader(true)

    }
    let handleedit = async () => {
        setShow(false)
        const uid = auth.currentUser.uid.slice(0, 6)
        if (img.type) {
            setLoader(true)
            const storageRef = ref(storage, `post/${uid}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');

                            break;
                    }
                },
                (error) => {

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        const washingtonRef = doc(db, "blog", edit.id);
                        await updateDoc(washingtonRef, {
                            Tittle: tittle,
                            textArea: area,
                            category: category,
                            url: downloadURL,
                            Time: new Date().toLocaleString(),
                        });


                    });
                }
            );
            window.location.reload()
            // setLoader(false)
        } else {


            setLoader(true)
            const washingtonRef = doc(db, "blog", edit.id);
            await updateDoc(washingtonRef, {
                Tittle: tittle,
                textArea: area,
                category: category,
                Time: new Date().toLocaleString(),
            })
            window.location.reload()
            // setLoader(false)

        }

    }

    let Delete = async (id) => {
        setLoader(true)
        await deleteDoc(doc(db, "blog", id))
        getUserData(uid)
        setLoader(false)
    }

    useEffect(() => {
        U()
        if (uid) {
            getUserData(uid);
            getoption()
        }
        Aos.init({ duration: 800 })
    }, [uid]);

    return (
        <div className='All'>
            {loader ? <Loader /> :
                <>
                    <Navb />
                    <br /><br /><br />
                    <div data-aos="flip-up" className='creat'>


                        <Button variant="primary" as={Link} to={'/Post'} >
                            + Create a post
                        </Button>
                    </div>
                    {data.length > 0 &&
                        data.map((item, index) => (
                            <ul key={index}>

                                <Card data-aos="zoom-in-down" className='m-2'>
                                    <Card.Header>
                                        <Nav variant="tabs">
                                            <Nav.Item>
                                                <h4>{item.Tittle}</h4>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {item.textArea}
                                        </Card.Text>
                                        <Button className='m-2' variant="primary" onClick={() => { handleShow(item); setEdit(item) }}>Edit</Button>
                                        <Button onClick={() => { Delete(item.id); }} className='m-2' variant="danger">Delete</Button>
                                        <Button onClick={() => { setLgShow(true); setitem(item) }} variant="secondary">View</Button>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Posted Date {item.Time} </small>
                                    </Card.Footer>
                                </Card>

                            </ul>
                        ))
                    }


                    {/* Edit modal */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Edit Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        defaultValue={edit.Tittle}
                                        onChange={(e) => settitle(e.target.value)}
                                    />
                                </Form.Group>


                                <Form.Group className="mob-file" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Select</Form.Label>
                                    <Form.Select
                                        defaultValue={edit.category}
                                        onChange={(e) => setcategory(e.target.value)}
                                        className="form-control mob-file "
                                    >
                                        <option value=''>Select</option>
                                        {/* <option value="Food blogs">Food blogs</option>
                                        <option value="Travel blogs">Travel blogs</option>
                                        <option value="Health ">Health </option>
                                        <option value="Lifestyle">Lifestyle</option>
                                        <option value="Personal blogs">Personal blogs</option> */}

                                        {opt.map((item) => (
                                            // <ul key={item.id}>
                                            <option key={item.id} value={item.cat}>{item.cat}</option>
                                            //  </ul>
                                        ))

                                        }
                                    </Form.Select>
                                </Form.Group>



                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        autoFocus
                                        onChange={(e) => setimg(e.target.files[0])}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Edit Textarea</Form.Label>
                                    <Form.Control defaultValue={edit.textArea} onChange={(e) => setarea(e.target.value)} as="textarea" rows={3} />
                                </Form.Group>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleedit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    {/* view */}
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <center>


                            <Modal.Body>
                                <h1>{item.Tittle}</h1>
                                <h5>{item.category}</h5>
                                {item.url ?

                                    <img className='all-img' src={item.url} alt="" />
                                    :
                                    <img className='all-img' src="https://img.freepik.com/free-psd/3d-rendering-search-engine-background_23-2150562441.jpg?w=740&t=st=1709459229~exp=1709459829~hmac=621c4f49c21c871d1f0d7e449adb7f09f5548de8429f2ac88c9c209ad018d1bb" alt="Not found" />

                                }

                                <br /><br />
                                <p>
                                    {item.textArea}

                                </p>
                            </Modal.Body>
                        </center>
                    </Modal>
                </>
            }
        </div>
    );
}

export default Example;

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { collection, getDocs, addDoc, db, auth, storage, ref, uploadBytesResumable, getDownloadURL, serverTimestamp } from '../Config/C'
import Navb from '../Components/Navbar'
import Loader from '../Components/Loader'
import Aos from 'aos';
import 'aos/dist/aos.css'
function Post() {
  const [title, settitle] = useState('')
  const [img, setimg] = useState('')
  const [area, setarea] = useState('')
  const [loader, setloader] = useState(true)
  const [category, setcategory] = useState('')
  const [opt, setopt] = useState([])
  // console.log(img.type)
  const navigat = useNavigate()
  let publish = async () => {
    setloader(false)
    const user = auth.currentUser.uid
    const userName = auth.currentUser.displayName
    const profile = auth.currentUser.photoURL
    const uid = auth.currentUser.uid.slice(0, 6)

    if (img.type) {
      const mountainsRef = ref(storage, `post/${uid}`);
      const uploadTask = uploadBytesResumable(mountainsRef, img);
      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              // console.log('Upload is paused');
              break;
            case 'running':
              // console.log('Upload is running');
              break;
          }
        },
        (error) => {

        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log('File available at', downloadURL);
            try {
              const docRef = await addDoc(collection(db, "blog"), {
                url: downloadURL,
                Tittle: title,
                textArea: area,
                user: user,
                userName: userName,
                profile: profile,
                category: category,
                Time: new Date().toLocaleString(),
              });
              // console.log("Document written with ID: ", docRef.id);
              setloader(true)
              navigat('/userdas')
            } catch (e) {
              // console.error("Error adding document: ", e);
            }
          });
        }
      );
    } else {
      try {
        const docRef = await addDoc(collection(db, "blog"), {
          Tittle: title,
          textArea: area,
          user: user,
          userName: userName,
          profile: profile,
          category: category,
          Time: new Date().toLocaleString(),

        });
        // console.log("Document written with ID: ", docRef.id);
        setloader(true)
        navigat('/userdas')
      } catch (e) {
        // console.error("Error adding document: ", e);
      }
    }

  }




  
  let getoption = async () => {
    setloader(false)
    const querySnapsho = await getDocs(collection(db, "cat"));
    const docs = querySnapsho.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setopt(docs);
    setloader(true)

  }


  useEffect(() => {
    getoption()
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <>
      {loader ?
        <div>
          <Navb />

          <center>
            <br /><br /><br />
            <div data-aos="flip-left" className='m-5 w-50'>

              <h1 data-aos="fade-right" >Creat a new post</h1>

              <>
                <div className="form-group">
                  <label htmlFor="">Title</label>
                  <div className="input-group">
                    <input onChange={(e) => settitle(e.target.value)} id="text" name="text" type="text" className="form-control m-3 " />
                  </div>
                </div>




                <div className="form-group">
                  <label htmlFor="">Select</label>
                  <div className="input-group">
                    <Form.Select
                      value={category}
                      onChange={(e) => setcategory(e.target.value)}
                      className="form-control m-3"
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
                  </div>
                </div>






                <div className="form-group m-3">
                  <label htmlFor="text1">Select image</label>
                  <input defaultValue={img} accept='.jpg,.png' onChange={(e) => setimg(e.target.files[0])} id="text1" name="text1" type="file" className="form-control" />
                </div>
                <div className="form-group m-3">
                  <label htmlFor="">Write a text</label>
                  <textarea
                    id=""
                    name=""
                    cols={40}
                    rows={3}
                    className="form-control"
                    defaultValue={""}
                    onChange={(e) => setarea(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Button onClick={publish} className="btn btn-primary m-3">
                    Publish now
                  </Button>
                  <Button as={Link} to={'/Userdas'} className="btn btn-secondary m-3">
                    Cancel
                  </Button>
                </div>
              </>

            </div>
          </center>
        </div>
        : <Loader />}

    </>


  )
}

export default Post
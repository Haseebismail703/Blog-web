import React, { useEffect, useState } from 'react'
import '../style/Home.css'
import Navb from '../Components/Navbar'
import Loader from '../Components/Loader'
import 'aos/dist/aos.css'
import Aos from 'aos';
import { auth, onAuthStateChanged, getAuth, updateProfile, setDoc, doc, db, getStorage, ref, uploadBytesResumable, getDownloadURL, storage, updateDoc } from '../Config/C'
function Profile() {
  const [data, setdata] = useState('')
  const [value, setvalue] = useState(true)
  const [name, setName] = useState('')
  const [newPhoneNumber, setnumber] = useState('')
  const [user, setuser] = useState('')
  const [img, setimg] = useState('')
  const [loader, setLoader] = useState(true)
  const last = user && user.metadata.lastSignInTime.slice(0, 16)
  let get = () => onAuthStateChanged(auth, (user) => {
    setLoader(false)
    if (user) {
      setuser(user)
      // const uid = user.uid
      // console.log(user);

    } else {
      setLoader(false)
    }
  });

  useEffect(() => {
    setLoader(false)
    get()
    setLoader(false)
    Aos.init({ duration: 2000 })
  }, [])

  // console.log(user);

  let update = () => {
    if (img.type) {
      setLoader(true)
      const storageRef = ref(storage, `profile/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
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

          getDownloadURL(uploadTask.snapshot.ref).then((profile) => {
            // console.log('File available at', profile);
            setvalue(true)
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              displayName: name,
              phoneNumber: newPhoneNumber,
              photoURL: profile,
            }).then(async () => {
              const uid = auth.currentUser.uid
              const washingtonRef = doc(db, "users", uid);
              await updateDoc(washingtonRef, {
                displayName: name,
                phoneNumber: newPhoneNumber,
                photoURL: profile,
              });

            setLoader(false)
              get()
            }).catch((error) => {

            });
          });
        }
      );
    } else {
      setLoader(true)
      updateProfile(auth.currentUser, {
        displayName: name,
        phoneNumber: newPhoneNumber,
      }).then(async () => {
        const uid = auth.currentUser.uid
        const washingtonRef = doc(db, "users",uid);
        await updateDoc(washingtonRef, {
          displayName: name,
          phoneNumber: newPhoneNumber,
        });
        setLoader(false)
        get()
      }).catch((error) => {

      });

    }

  }

  return (
    <div>
      {user &&
        loader == true ? <Loader /> :
        <>

          <Navb />
          <br /><br />
          <div data-aos="fade-right" className="container rounded bg-white mt-5 mb-5">

            <div className="row m-5">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  {user.photoURL == '' ?
                    <img
                      className="rounded-circle profile mt-5"
                      width="150px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    />

                    :

                    <img
                      className="rounded-circle profile mt-5"
                      width="150px"
                      src={user.photoURL}
                    />
                  }



                  <div className="input--file">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <circle cx={12} cy={12} r="3.2" />
                        <path d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                        <path d="M0 0h24v24h-24z" fill="none" />
                      </svg>
                    </span>
                    <input onClick={() => setvalue(false)} onChange={(e) => setimg(e.target.files[0])} name="Select File" type="file" />
                  </div>



                  <span className="font-weight-bold">{user && user.displayName}</span>
                  <span><br />
                    Last Seen
                  </span>
                  <span className="text-black-50">{last}</span>

                </div>
              </div>
              <div className="col-md-7 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>


                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        // onClick={() => setvalue(false)}
                        placeholder={user && user.displayName}
                        onChange={(e) => {setName(e.target.value); setvalue(false)}}
                        defaultValue={user.displayName}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        disabled
                        title='email does not changable'
                        defaultValue={user ? user.email : ''}

                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        defaultValue={'********'}
                        disabled
                      />
                    </div>

                    {/* <div className="col-md-12">
                      <label className="labels">Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={user ? user.phoneNumber : ''}
                        onClick={() => setvalue(false)}
                        onChange={(e) => setnumber(e.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="mt-5 text-center">

                    {value ?
                      <button disabled className="btn btn-primary profile-button" type="button">
                        Update
                      </button> :


                      <button onClick={update} className="btn btn-primary profile-button" type="button">
                        Save Profile
                      </button>}


                    {/* } */}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </>

      }
    </div>
  )
}

export default Profile
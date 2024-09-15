import React, { useState } from "react";
import {Link , useNavigate} from "react-router-dom"
import Style from "../App.module.css";
import { ToastContainer , toast , Bounce } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

function CreateAccountPage() {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNo, setUserPhoneNo] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userCity , setUserCity] = useState("");
    const [userState, setUserState] = useState("");
    const [userPostelCode, setUserPostelCode] = useState("");
    const navigate = useNavigate();

    const createAccount = async () =>{

        if(userName && userEmail && userPhoneNo && userPassword && userConfirmPassword && userAddress && userCity && userState && userPostelCode){

            try {

                await axios.post("http://localhost:3000/createAccount" , {userName,userEmail,userPhoneNo,userPassword,userConfirmPassword,userAddress,userCity,userState,userPostelCode})
                .then((res)=>{

                   
                        toast.success('Account created successfully! Please login', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme:"colored",
                            transition: Bounce,
                            progress: undefined,
                            className: Style.customToast
                          });

                          setTimeout(()=>{
                            navigate("/");
                          },5000);
                    



                }).catch((err)=>{

                    if(err.response && err.response.status === 401){
                        toast.error('Email Address already exits! Please login', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme:"colored",
                            transition: Bounce,
                            progress: undefined,
                            className: Style.customToast
                          });
                    } else if (err.response && err.response.status === 402){
                        toast.error('Phone Number already exits! Please login', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme:"colored",
                            transition: Bounce,
                            progress: undefined,
                            className: Style.customToast
                          });
                    } else if(err.response && err.response.status === 403){
                        toast.error('Password and confirm Password are not equal', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme:"colored",
                            transition: Bounce,
                            progress: undefined,
                            className: Style.customToast
                          });
                    } 

                });
                
            } catch (error) {
                toast.error('External error! Failed to create account', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme:"colored",
                    transition: Bounce,
                    progress: undefined,
                    className: Style.customToast
                  });
            }



        }else{

            toast.warn('All Fields are Required!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:"colored",
                transition: Bounce,
                progress: undefined,
                className: Style.customToast
              });

        }






        
    }
    
    return (
    <>
       <div className={Style.mainDiv}>
        <div className={Style.loginDiv}>
          <div className={Style.loginDiv1}>
            <h1 className={Style.loginDiv1Heading}>
              Empowering Artisans, Connecting{" "}
              <span className={Style.marketSpan}>Market.</span>
            </h1>
          </div>

          <div className={Style.createAccountDiv2}>
            <p className={Style.loginDiv2Para1}>Join the</p>
            <p className={Style.loginDiv2Para2}>
              Udyog<span className={Style.martSpan}>Mart</span>
            </p>
            <p className={Style.loginDiv2Para3}>
              Please enter your details
            </p>

            <div className={Style.emailLoginDiv}>
            <p>Name</p>
              <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>Email</p>
              <input type="text" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>Phone No.</p>
              <input type="text" value={userPhoneNo} onChange={(e)=>setUserPhoneNo(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>Password</p>
              <input type="text" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>Confirm Password</p>
              <input type="text" value={userConfirmPassword} onChange={(e)=>setUserConfirmPassword(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>Address</p>
              <input type="text" value={userAddress} onChange={(e)=>setUserAddress(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>City</p>
              <input type="text" value={userCity} onChange={(e)=>setUserCity(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>State</p>
              <input type="text" value={userState} onChange={(e)=>setUserState(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>Postal Code</p>
              <input type="text" value={userPostelCode} onChange={(e)=>setUserPostelCode(e.target.value)}/>
            </div>


            <div className={Style.loginBtnDiv}>
                <button onClick={createAccount}>Create Account</button>
            </div>

            <div className={Style.loginBtnDiv}>
                <p>Already have an account?</p>
                <Link to="/" className={Style.createAccountLink}>Back to login</Link>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default CreateAccountPage;

import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import Style from "../App.module.css";
import { ToastContainer , toast , Bounce } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {

  const [loginEmail , setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {

    if(loginEmail && loginPassword){

      try {
        await axios.post("http://localhost:3000/loginUser",{loginEmail,loginPassword})
        .then((res)=>{

          if(res.status === 200){
            toast.success('Welcome to UdyogMart! logged in successfully', {
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

            localStorage.setItem("userEmail",loginEmail);

            setTimeout(()=>{
              navigate("/mainPage");
            },5000);
          }

        }).catch((err)=>{

          if(err.response && err.response.status === 401){
            toast.error('Account not found! Please Create Account', {
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
          } else if(err.response && err.response.status === 402){
            toast.error('Password is incorrect! Please try again', {
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
        toast.error('Failed to login! External Error Occurred', {
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

      toast.warn('All Fields are required!', {
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
            Login to Support Local {" "}
              <span className={Style.marketSpan}>Craft.</span>
            </h1>
          </div>

          <div className={Style.loginDiv2}>
            <p className={Style.loginDiv2Para1}>Welcome to</p>
            <p className={Style.loginDiv2Para2}>
              Udyog<span className={Style.martSpan}>Mart</span>
            </p>
            <p className={Style.loginDiv2Para3}>
              Please enter your login credentials
            </p>

            <div className={Style.emailLoginDiv}>
            <p>Email Id</p>
              <input type="text" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
            </div>

            <div className={Style.passwordLoginDiv}>
            <p>Password</p>
              <input type="text" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
            </div>

            <div className={Style.loginBtnDiv}>
                <button onClick={loginUser}>login</button>
            </div>

            <div className={Style.loginBtnDiv}>
                <p>Don't have an account?</p>
                <Link to="/createAccountPage" className={Style.createAccountLink}>Create Account</Link>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default LoginPage;

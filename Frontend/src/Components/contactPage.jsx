import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function ContactPage() {
  const [contactUsName, setContactUsName] = useState("");
  const [contactUsEmail, setContactUsEmail] = useState("");
  const [contactUsMessage, setContactUsMessage] = useState("");

  const navigate = useNavigate();

    function gotoProfileSection(){
        navigate("/profilePage");
    }

  const submitContactUsForm = async () => {
    if (contactUsName && contactUsEmail && contactUsMessage) {
      try {
        const response = await axios.post(
          "http://localhost:3000/submitContactUsForm",
          { contactUsName, contactUsEmail, contactUsMessage }
        );
        if (response.status === 200) {
          toast.warn("Thank you! we will contact you shortly", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce,
            progress: undefined,
            className: Style.customToast,
          });
        }
      } catch (error) {
        toast.warn("Sorry! An error occurred ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
          progress: undefined,
          className: Style.customToast,
        });
      }
    } else {
      toast.warn("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
        progress: undefined,
        className: Style.customToast,
      });
    }
  };

  return (
    <>
      <div className={Style.mainDiv}>
        {/* ---- Navbar Div ---- */}

        <div className={Style.navBarDiv}>
          <div className={Style.logoDiv}>
            <p>
              Udyog<span className={Style.martSpan}>Mart</span>
            </p>
          </div>

          <div className={Style.navBarElements}>
            <Link className={Style.linkElement} to="/mainPage">
              Home
            </Link>
            <Link className={Style.linkElement} to="/productPage">
              Products
            </Link>
            <Link className={Style.linkElement} to="/contactPage">
              Contact
            </Link>
          </div>

          <div className={Style.otherElementsDiv}>
            <Link className={Style.linkElementBulkBuyer} to="/bulkBuyer">Bulk Buyers</Link>
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              color="black"
              className={Style.fontAwesomeLogo}
              onClick={gotoProfileSection}
            />
          </div>
        </div>

        <div className={Style.section1Contactus}>
          <div className={Style.section1InnerDivContactus}>
            <p className={Style.section2InnerDiv2Para}>
              | Contact<span className={Style.careSpan}> Us</span>
            </p>
            <h1 className={Style.section2InnerDiv2Heading}>
              Please enter your <span className={Style.careSpan}>details.</span>
            </h1>

            <div className={Style.contactUsEmailDiv}>
              <p>Please provide your name</p>
              <input
                type="text"
                className={Style.contactUsInput}
                value={contactUsName}
                onChange={(e) => setContactUsName(e.target.value)}
              />
            </div>

            <div className={Style.contactUsEmailDiv}>
              <p>Please provide your Email</p>
              <input
                type="text"
                className={Style.contactUsInput}
                value={contactUsEmail}
                onChange={(e) => setContactUsEmail(e.target.value)}
              />
            </div>

            <div className={Style.contactUsEmailDiv}>
              <p>Your message here</p>
              <textarea
                type="text"
                className={Style.contactUsTextArea}
                value={contactUsMessage}
                onChange={(e) => setContactUsMessage(e.target.value)}
              />
            </div>

            <div className={Style.contactUsEmailDiv}>
              <button
                className={Style.contactUsSubmitBtn}
                onClick={submitContactUsForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ContactPage;

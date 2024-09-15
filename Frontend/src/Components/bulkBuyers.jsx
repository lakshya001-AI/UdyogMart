import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Style from "../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer , toast , Bounce } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

function BulkBuyers() {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmailAddress, setBuyerEmailAddress] = useState("");
  const [buyerPhoneNumber, setBuyerPhoneNumber] = useState("");
  const [buyerCurrentAddress, setBuyerCurrentAddress] = useState("");

  // Seller details
  const [sellerDetails, setSellerDetails] = useState(null);

  const sendRequestToSeller = async () => {
    if (
      productName &&
      productQuantity &&
      buyerName &&
      buyerEmailAddress &&
      buyerPhoneNumber &&
      buyerCurrentAddress
    ) {
      try {
        await axios
          .post("http://localhost:3000/matchProducts", {
            productName,
            productQuantity,
            buyerName,
            buyerEmailAddress,
            buyerPhoneNumber,
            buyerCurrentAddress,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Great! We've located a seller for you", {
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
              setSellerDetails(res.data.sellerDetails);
            }
          })
          .catch((err) => {
            toast.error("Sorry! An internal error occurred", {
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
          });
      } catch (error) {
        toast.error("Sorry! An external error occurred", {
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
    } else {
      toast.warn("All fields are requirred", {
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
  };


  const sendRequest = async () => {
    try {
      const sellerName = sellerDetails.sellerName;
      const sellerContactNo = sellerDetails.sellerPhone;

      if (
        productName &&
        productQuantity &&
        buyerName &&
        buyerEmailAddress &&
        buyerPhoneNumber &&
        buyerCurrentAddress &&
        sellerName &&
        sellerContactNo
      ) {
        const requestDataObj = {
          productName: productName,
          productQuantity: productQuantity,
          buyerName: buyerName,
          buyerEmailAddress: buyerEmailAddress,
          buyerPhoneNumber: buyerPhoneNumber,
          buyerCurrentAddress: buyerCurrentAddress,
          sellerName: sellerName,
          sellerContactNo: sellerContactNo,
        };

        try {
          const res = await axios.post(
            "http://localhost:3000/sendRequestToseller",
            {
              requestDataObj,
            }
          );

          if (res.status === 200) {
            // Send SMS after successful request
            const apiUrl = "https://www.fast2sms.com/dev/bulkV2";
            const apiKey = "NOYQosOf7q45XdUTiipvLqMVCyiq7k1HnW1Rkb3BglP0ePOaJxp16zwOkQKb";

            const message = `You have a new buyer request!\n\nBuyer Details:\nName: ${buyerName}\nPhone: ${buyerPhoneNumber}\nAddress: ${buyerCurrentAddress}\nProduct: ${productName}\nQuantity: ${productQuantity}`;

            const cleanedSellerContactNo = sellerContactNo.replace(/\D/g, ""); // Remove non-digit characters
            const numericSellerContactNo = Number(cleanedSellerContactNo); // Convert to a number

            const params = new URLSearchParams({
              authorization: apiKey,
              message: message,
              language: "english",
              route: "q",
              numbers: numericSellerContactNo,
            });

            const url = `${apiUrl}?${params.toString()}`;

            fetch(url, { method: "GET" })
              .then((response) => response.json())
              .then((data) => {
                toast.success("Request sent successfully and message sent to the seller!", {
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
              })
              .catch((error) => {

                toast.error("Request sent successfully, but failed to send SMS to the seller.", {
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

              });
          }
        } catch (error) {
          toast.error("An internal error occurred", {
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
      } else {
        toast.warn("All fields are requirred", {
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
    } catch (error) {
      toast.error("An external error occurred", {
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
      console.log(error);
    }
  };

  const navigate = useNavigate();

    function gotoProfileSection(){
        navigate("/profilePage");
    }

  return (
    <>
      <div className={Style.mainDiv}>
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
            <Link className={Style.linkElementBulkBuyer} to="/bulkBuyer">
              Bulk Buyers
            </Link>
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              color="black"
              className={Style.fontAwesomeLogo}
              onClick={gotoProfileSection}
            />
          </div>
        </div>

        {/* --- Bulk Buyer Form ----- */}
        <div className={Style.bulkBuyerFormDiv}>
          <div className={Style.bulkBuyerFormDiv1}>
            <h1 className={Style.bulkBuyerHeading}>
              Please enter the details.
            </h1>
            <div className={Style.inputDivBulkBuyer}>
              <p>Product Name</p>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className={Style.inputDivBulkBuyer}>
              <p>Product Quantity</p>
              <input
                type="text"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>

            <div className={Style.inputDivBulkBuyer}>
              <p>Your Name</p>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
            </div>

            <div className={Style.inputDivBulkBuyer}>
              <p>Your Email Address</p>
              <input
                type="text"
                value={buyerEmailAddress}
                onChange={(e) => setBuyerEmailAddress(e.target.value)}
              />
            </div>

            <div className={Style.inputDivBulkBuyer}>
              <p>Your Phone Number</p>
              <input
                type="text"
                value={buyerPhoneNumber}
                onChange={(e) => setBuyerPhoneNumber(e.target.value)}
              />
            </div>

            <div className={Style.inputDivBulkBuyer}>
              <p>Your Current Address</p>
              <input
                type="text"
                value={buyerCurrentAddress}
                onChange={(e) => setBuyerCurrentAddress(e.target.value)}
              />
            </div>

            <div className={Style.inputDivBulkBuyer}>
              <button
                className={Style.submitBtnBulkBuyers}
                onClick={sendRequestToSeller}
              >
                Submit
              </button>
            </div>
          </div>
          <div className={Style.bulkBuyerFormDiv2}>
            {sellerDetails ? (
              <div className={Style.foundSellerDiv}>
                <div className={Style.sellerDetailsDiv}>
                  <p className={Style.sellerName}>{sellerDetails.sellerName}</p>
                  <p>{`City: ${sellerDetails.sellerCity} | State: ${sellerDetails.sellerState}`}</p>
                  <p>{`Product: ${sellerDetails.sellerProductName}`}</p>
                  <button
                    className={Style.sendRequestBtn}
                    onClick={sendRequest}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            ) : (
              <div className={Style.noSellerFoundDiv}>
                <p>
                  No sellers found. Please enter details to get the sellers.
                </p>
              </div>
            )}
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default BulkBuyers;

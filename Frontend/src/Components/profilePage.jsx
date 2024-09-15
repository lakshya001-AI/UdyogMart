import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  function gotoProfileSection() {
    navigate("/profilePage");
  }

  function logoutUser() {
    navigate("/");
  }

  // user detail useEffect
  useEffect(() => {
    async function getUserDetail() {
      try {
        const userEmail = localStorage.getItem("userEmail");

        const response = await axios.post(
          "http://localhost:3000/getUserDetails",
          { userEmail }
        );

        setEmail(userEmail);
        if (response.status === 200) {
          setUserName(response.data.userName);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUserDetail();
  }, []);

  // --------------- Seller Accepted Requests ----------------- //
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAcceptedRequest() {
      setLoading(true); // Start loading
      try {
        const userEmail = localStorage.getItem("userEmail");
        let response = await axios.post(
          "http://localhost:3000/getAcceptedRequests",
          { userEmail }
        );

        if (response.data) {
          setAcceptedRequests(response.data.acceptedRequests);
        }
      } catch (error) {
        console.log("Error: ", error);
        setError("Failed to fetch accepted requests.");
      } finally {
        setLoading(false); // Stop loading
      }
    }

    getAcceptedRequest();
  }, []);
  

  // --------------- seller Rejected Requests --------------- //
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [loadingRejected, setLoadingRejected] = useState(false);
  const [errorRejected, setErrorRejected] = useState(null);

  useEffect(() => {
    async function getRejectedRequest() {
      setLoadingRejected(true); // Start loading
      try {
        const userEmail = localStorage.getItem("userEmail");
        let response = await axios.post(
          "http://localhost:3000/getRejectedRequests",
          { userEmail }
        );
        if (response.data) {
          setRejectedRequests(response.data.rejectedRequests); // Update state with rejected requests
        }
      } catch (error) {
        console.log("Error: ", error);
        setErrorRejected("Failed to fetch rejected requests.");
      } finally {
        setLoadingRejected(false); // Stop loading
      }
    }
    getRejectedRequest();
  }, []);

  // ------------------- Add to Cart Details --------------- //
  const [addToCartDetails, setAddToCartDetails] = useState([]);
  useEffect(() => {
    async function getTheCartDetails() {
      try {
        const userEmail = localStorage.getItem("userEmail");
        let response = await axios.post(
          "http://localhost:3000/getCartDetails",
          { userEmail }
        );
        if (response.status === 200) {
          console.log(response.data.cartDetails);
          setAddToCartDetails(response.data.cartDetails);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTheCartDetails();
  }, []);

  // ------------------- Remove Product from cart --------------- //
  const removeProductFromCart = async (removeProductName) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      let response = await axios.post(
        "http://localhost:3000/removeProductFromCart",
        { userEmail, removeProductName }
      );
      if (response.status === 200) {
        toast.success("Product removed from cart", {
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
      toast.error("Oops! Something went wrong, try again.", {
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

        <div className={Style.section1Profile}>
          <div className={Style.profileDivMain}>
            <div className={Style.profileInfoDiv}>
              <div className={Style.userInfoDiv}>
                <p className={Style.userNamePara}>{userName}</p>
                <p className={Style.userEmailPara}>{email}</p>
              </div>

              <div className={Style.logoutBtnDiv}>
                <button className={Style.logoutBtn} onClick={logoutUser}>
                  logout
                </button>
              </div>
            </div>

            {/* ------ div for add to cart ------------ */}

            <div className={Style.addToCartAndOtherDetailDiv}>
              {/* <div className={Style.addToCartDiv}>

              </div> */}

              <div className={Style.requestAcceptedDiv}>
                <h1 className={Style.orderHeading}>Orders</h1>
              </div>

              <div className={Style.requestAcceptedDiv}>
                <h1 className={Style.orderHeading}>My Cart</h1>
                {addToCartDetails.length > 0 ? (
                  addToCartDetails.map((request, index) => (
                    <div key={index} className={Style.addToCartProductDiv}>
                      <div className={Style.productImageDivAddToCart}>
                        <img
                          src={`http://localhost:5000/uploads/${request.imageName}`}
                          className={Style.addToCartImage}
                        />
                      </div>
                      <div className={Style.cartItemDetailsDiv}>
                        <p className={Style.productNameCart}>
                          {request.addToCartProductName}
                        </p>
                        <p className={Style.productDescriptionCart}>{`${
                          request.addToCartProductDescription
                            ? request.addToCartProductDescription
                                .split(" ")
                                .slice(0, 6)
                                .join(" ")
                            : ""
                        } .....`}</p>
                        <p
                          className={Style.productPriceCart}
                        >{`₹ ${request.addToCartProductPrice}`}</p>
                        <div className={Style.cartButtonsDiv}>
                          <button>Buy Now</button>
                          <button
                            onClick={(e) =>
                              removeProductFromCart(
                                request.addToCartProductName
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={Style.noAcceptedRequestDiv}>
                    <p>Your Cart is Empty.</p>
                  </div>
                )}
              </div>

              <div className={Style.requestAcceptedDiv}>
                <h1 className={Style.orderHeading}>Seller Accepted Requests</h1>
                {/* {acceptedRequests.length > 0 ? (
                  acceptedRequests.map((request, index) => (
                    <div key={index} className={Style.requestItem}>
                      <p>
                        <strong>Seller:</strong> {request.sellerName}
                      </p>
                      <p>
                        <strong>Buyer:</strong> {request.buyerName}
                      </p>
                      <p>
                        <strong>Product:</strong>{" "}
                        {request.sellerAcceptedProduct}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {request.AcceptRequest}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={Style.noAcceptedRequestDiv}>
                    <p>No Accepted requested found.</p>
                  </div>
                )} */}
                {loading ? (
                  <div className={Style.loadingDiv}>
                    <p>Loading accepted requests...</p>
                  </div>
                ) : error ? (
                  <div className={Style.errorDiv}>
                    <p>{error}</p>
                  </div>
                ) : acceptedRequests.length > 0 ? (
                  acceptedRequests.map((request, index) => (
                    <div key={index} className={Style.requestItem}>
                      <p>
                        <strong>Seller:</strong> {request.sellerName}
                      </p>
                      <p>
                        <strong>Buyer:</strong> {request.buyerName}
                      </p>
                      <p>
                        <strong>Product:</strong>{" "}
                        {request.sellerAcceptedProduct}
                      </p>
                      <p>
                        <strong>Status:</strong> {request.AcceptRequest}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={Style.noAcceptedRequestDiv}>
                    <p>No accepted requests found.</p>
                  </div>
                )}
              </div>

              <div className={Style.rejectAccepted}>
                <h1 className={Style.orderHeading}>Seller Rejected Requests</h1>
                {loadingRejected ? (
                  <div className={Style.loadingDiv}>
                    <p>Loading rejected requests...</p>
                  </div>
                ) : errorRejected ? (
                  <div className={Style.errorDiv}>
                    <p>{errorRejected}</p>
                  </div>
                ) : rejectedRequests.length > 0 ? (
                  rejectedRequests.map((request, index) => (
                    <div key={index} className={Style.requestItem}>
                      <p>
                        <strong>Seller:</strong> {request.sellerName}
                      </p>
                      <p>
                        <strong>Buyer:</strong> {request.buyerName}
                      </p>
                      <p>
                        <strong>Product:</strong>{" "}
                        {request.sellerAcceptedProduct}
                      </p>
                      <p>
                        <strong>Status:</strong> {request.AcceptRequest}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={Style.noAcceptedRequestDiv}>
                    <p>No Rejected Requests found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ProfilePage;

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Style from "../App.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { ToastContainer , toast , Bounce } from 'react-toastify';
// import axios from "axios";
// import 'react-toastify/dist/ReactToastify.css';

// function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//     function gotoProfileSection(){
//         navigate("/profilePage");
//     }

//   useEffect(() => {
//     const getUdyogSetuProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/products");
//         setProducts(response.data.products);
//       } catch (error) {
//         console.log("Error: ", error);
//       }
//     };

//     getUdyogSetuProducts();
//   }, []);

//   const addToCartProducts = async (imageName,addToCartProductName,addToCartProductDescription,addToCartProductPrice)=>{
//     try {
//       const userEmail = localStorage.getItem("userEmail");
//       let response = await axios.post("http://localhost:3000/addToCartDetails", {imageName,addToCartProductName,addToCartProductDescription,addToCartProductPrice,userEmail});
//       if(response.status===200){
//         toast.success("Cart updated! check profile", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme:"colored",
//           transition: Bounce,
//           progress: undefined,
//           className: Style.customToast
//         });
//       }
      
//     } catch (error) {

//       if(error.response && error.response.status === 401){
//         toast.warn("Product is already in your cart", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme:"colored",
//           transition: Bounce,
//           progress: undefined,
//           className: Style.customToast
//         });
//       }else{

      

//       toast.error("Oops! Something went wrong, try again.", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme:"colored",
//         transition: Bounce,
//         progress: undefined,
//         className: Style.customToast
//       });

//     }

    
//     }
//   }

//   // --------------- Testing the RazorPAy ------------------ //

//   const handlePayment = async (amount) => {
//     if (!amount) {
//       alert('Please enter an amount');
//       return;
//     }

//     try {
//       // Call your backend to create an order
//       const response = await fetch('http://localhost:3000/api/payment/create-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount }),
//       });
//       const data = await response.json();

//       // Configure Razorpay options
//       const options = {
//         key: 'rzp_test_XujaIUo4PBMSYv', // Your test Key ID
//         amount: data.amount,
//         currency: data.currency,
//         name: 'UdyogMart',
//         description: 'UdyogMart E-commerce Platform for Nano and micro Entrepreneurs',
//         order_id: data.id,
//         handler: function (response) {
//           alert('Payment successful');
//           // Optionally send payment details to your server
//         },
//         prefill: {
//           name: 'Your Name',
//           email: 'your.email@example.com',
//           contact: '9999999999',
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       alert("Error Occurred");
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className={Style.mainDiv}>
//         {/* ---- Navbar Div ---- */}

//         <div className={Style.navBarDiv}>
//           <div className={Style.logoDiv}>
//             <p>
//               Udyog<span className={Style.martSpan}>Mart</span>
//             </p>
//           </div>

//           <div className={Style.navBarElements}>
//             <Link className={Style.linkElement} to="/mainPage">
//               Home
//             </Link>
//             <Link className={Style.linkElement} to="/productPage">
//               Products
//             </Link>
//             <Link className={Style.linkElement} to="/contactPage">
//               Contact
//             </Link>
//           </div>

//           <div className={Style.otherElementsDiv}>
//             <Link className={Style.linkElementBulkBuyer} to="/bulkBuyer">Bulk Buyers</Link>
//             <FontAwesomeIcon
//               icon={faUser}
//               size="lg"
//               color="black"
//               className={Style.fontAwesomeLogo}
//               onClick={gotoProfileSection}
//             />
//           </div>
//         </div>

//         <div className={Style.section1ProductSection}>
          
//               {products.length > 0 ? (
//                 products.map((ele, index) => (
//                   <div key={index} className={Style.productDiv}>
//                     <img src={`http://localhost:5000/uploads/${ele.photo}`} alt="" className={Style.productImage}/>
//                     <p className={Style.productName}>{ele.ProductName}</p>
//                     <p className={Style.productDescription}>{`${ele.productDescription ? ele.productDescription.split(" ").slice(0, 6).join(" ") : ''} .....`}</p>
//                     <p className={Style.productPrice}>{`₹ ${ele.ProductPrice}`}</p>
//                     <p className={Style.cityAndStateInfo}>{`City: ${ele.City} | State: ${ele.State}`}</p>

//                     <div className={Style.buyNowBtnDiv}>
//                     <button className={Style.addToCartBtn} onClick={(e)=>addToCartProducts(ele.photo,ele.ProductName,ele.productDescription,ele.ProductPrice)}>Add to Cart</button>
//                       <button className={Style.buyNowBtn} onClick={(e)=>handlePayment(500)}>Buy Now</button>
//                     </div>
//                   </div> 
//                 ))
//               ) : (
//                 <li>No products found</li>
//               )}
          
//         </div>
//         <ToastContainer/>
//       </div>
//     </>
//   );
// }

// export default ProductPage;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    quantity: '',
    address: '',
    city: '',
    state: ''
  });
  const navigate = useNavigate();

  function gotoProfileSection() {
    navigate("/profilePage");
  }

  useEffect(() => {
    const getUdyogSetuProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getUdyogSetuProducts();
  }, []);

  const addToCartProducts = async (imageName, addToCartProductName, addToCartProductDescription, addToCartProductPrice) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      let response = await axios.post("http://localhost:3000/addToCartDetails", {
        imageName,
        addToCartProductName,
        addToCartProductDescription,
        addToCartProductPrice,
        userEmail
      });
      if (response.status === 200) {
        toast.success("Cart updated! check profile", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
          progress: undefined,
          className: Style.customToast
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warn("Product is already in your cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
          progress: undefined,
          className: Style.customToast
        });
      } else {
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
          className: Style.customToast
        });
      }
    }
  };

  // --------------- Testing the Razorpay ------------------ //
  const handlePayment = async (amount) => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();

      const options = {
        key: 'rzp_test_XujaIUo4PBMSYv', // Your test Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'UdyogMart',
        description: 'UdyogMart E-commerce Platform for Nano and Micro Entrepreneurs',
        order_id: data.id,
        handler: function (response) {
          alert('Payment successful');
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Error Occurred");
      console.log(error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirmPurchase = () => {
    closeModal();
    handlePayment(500); // You can customize the amount here
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

        <div className={Style.section1ProductSection}>
          {products.length > 0 ? (
            products.map((ele, index) => (
              <div key={index} className={Style.productDiv}>
                <img src={`http://localhost:5000/uploads/${ele.photo}`} alt="" className={Style.productImage} />
                <p className={Style.productName}>{ele.ProductName}</p>
                <p className={Style.productDescription}>{`${ele.productDescription ? ele.productDescription.split(" ").slice(0, 6).join(" ") : ''} .....`}</p>
                <p className={Style.productPrice}>{`₹ ${ele.ProductPrice}`}</p>
                <p className={Style.cityAndStateInfo}>{`City: ${ele.City} | State: ${ele.State}`}</p>

                <div className={Style.buyNowBtnDiv}>
                  <button className={Style.addToCartBtn} onClick={(e) => addToCartProducts(ele.photo, ele.ProductName, ele.productDescription, ele.ProductPrice)}>Add to Cart</button>
                  <button className={Style.buyNowBtn} onClick={openModal}>Buy Now</button>
                </div>
              </div>
            ))
          ) : (
            <li>No products found</li>
          )}
        </div>

        {/* Modal for entering purchase details */}
        {showModal && (
          <div className={Style.modalOverlay}>
            <div className={Style.modalContent}>
              <h2 className={Style.enterProductDetails}>Enter Purchase Details</h2>
              <form>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  State:
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </form>
              <div className={Style.modalButtons}>
                <button className={Style.modalCancelBtn} onClick={closeModal}>
                  Cancel
                </button>
                <button className={Style.modalConfirmBtn} onClick={confirmPurchase}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
}

export default ProductPage;


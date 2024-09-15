const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const connectUdyogSetuDatabase = require("./MongoDB/connectSetu");
const connectUdyogMartDatabase = require("./MongoDB/connect");
const createUdyogMartUserModel = require("./MongoDB/userSchema");
const createUdyogSetuUserModel = require("./MongoDB/userUdyogSetu");
const createUdyogMartContactUsModel = require("./MongoDB/contactUs");
const paymentRoutes = require("./routes/payment");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/api/payment', paymentRoutes);

(async () => {
  // Connect to both databases
  const udyogSetuConnection = await connectUdyogSetuDatabase();
  const udyogMartConnection = await connectUdyogMartDatabase();

  // Initialize models using the respective connections
  const userModel = await createUdyogSetuUserModel(udyogSetuConnection);
  const userMartModel = await createUdyogMartUserModel(udyogMartConnection);
  const contactUsModel = await createUdyogMartContactUsModel(
    udyogMartConnection
  );

  app.get("/", (req, res) => {
    res.send("Hello this is udyogMart Backend");
  });

  // Now you can use the models for routes
  app.get("/products", async (req, res) => {
    try {
      // Fetch all users and return their products
      const users = await userModel.find({});
      const products = users.map((user) => user.products).flat(); // Extract and flatten the products array
      res.json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/createAccount", async (req, res) => {
    try {
      const {
        userName,
        userEmail,
        userPhoneNo,
        userPassword,
        userConfirmPassword,
        userAddress,
        userCity,
        userState,
        userPostelCode,
      } = req.body;

      if (userPassword !== userConfirmPassword) {
        return res.status(403).send({ message: "Password mismatch Error" });
      }

      const eUser = await userMartModel.findOne({ EmailAddress: userEmail });
      const pUser = await userMartModel.findOne({ PhoneNumber: userPhoneNo });

      if (eUser) {
        return res
          .status(401)
          .send({ message: "Email Address already exists! Please login" });
      }

      if (pUser) {
        return res
          .status(402)
          .send({ message: "Phone Number already exists! Please login" });
      }

      const hashPassword = await bcrypt.hash(userPassword, 10);

      await userMartModel.create({
        FullName: userName,
        EmailAddress: userEmail,
        PhoneNumber: userPhoneNo,
        Password: hashPassword,
        ConfirmPassword: hashPassword,
        Address: userAddress,
        City: userCity,
        State: userState,
        PostalCode: userPostelCode,
      });

      res.status(200).send({ message: "Account Created Successfully" });
    } catch (error) {
      res.status(500).send({ message: "An external error occurred" });
    }
  });

  app.post("/loginUser", async (req, res) => {
    try {
      const { loginEmail, loginPassword } = req.body;

      const user = await userMartModel.findOne({ EmailAddress: loginEmail });

      if (user) {
        const comparePassword = await bcrypt.compare(
          loginPassword,
          user.ConfirmPassword
        );
        if (comparePassword) {
          res.status(200).send({ message: "login successfully" });
        } else {
          return res.status(402).send({ message: "Password is incorrect" });
        }
      } else {
        return res
          .status(401)
          .send({ message: "Account not Found! Please create Account" });
      }
    } catch (error) {
      res.status(500).send({ message: "External Error Occurred" });
    }
  });

  app.post("/submitContactUsForm", async (req, res) => {
    try {
      const { contactUsName, contactUsEmail, contactUsMessage } = req.body;
      const submitted = await contactUsModel.create({
        cName: contactUsName,
        cEmail: contactUsEmail,
        cMessage: contactUsMessage,
      });
      if (submitted) {
        res.status(200).send({ message: "Contactus form submitted" });
      }
    } catch (error) {
      res.status(500).send({ message: "An error occurred, Please try again" });
    }
  });

  app.post("/matchProducts", async (req, res) => {
    try {
      const {
        productName,
        productQuantity,
        buyerName,
        buyerEmailAddress,
        buyerPhoneNumber,
        buyerCurrentAddress,
      } = req.body;

      // const buyerObject = {
      //   productName:productName,
      //   productQuantity:productQuantity,
      //   buyerName:buyerName,
      //   buyerEmailAddress:buyerEmailAddress,
      //   buyerPhoneNumber:buyerPhoneNumber,
      //   buyerCurrentAddress:buyerCurrentAddress
      // }

      // Fetch all users from the udyogSetu database
      const users = await userModel.find({});

      // Traverse through the users and match the product
      let matchingProduct = null;
      let sellerDetails = null;

      users.forEach((user) => {
        user.products.forEach((product) => {
          if (product.ProductName === productName) {
            matchingProduct = product;
            sellerDetails = {
              sellerProductName: product.ProductName,
              sellerName: product.userName,
              sellerPhone: product.mobileNumber,
              sellerAddress: product.Address,
              sellerCity: product.City,
              sellerState: product.State,
            };
          }
        });
      });

      if (sellerDetails) {
        // Return the seller details if the product is found
        res.status(200).json({ sellerDetails });
      } else {
        // If no matching product is found
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error finding the seller:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/sendRequestToseller", async (req, res) => {
    try {
      const { requestDataObj } = req.body;

      const {
        sellerName,
        sellerContactNo,
        buyerName,
        buyerEmailAddress,
        buyerPhoneNumber,
        buyerCurrentAddress,
        productName,
        productQuantity,
      } = requestDataObj;

      // Find the seller in the database using sellerName and sellerContactNo
      const seller = await userModel.findOne({
        name: sellerName,
        "products.mobileNumber": sellerContactNo, // Assuming the phone number is stored under the products field
      });

      if (!seller) {
        return res.status(404).send({ message: "Seller not found" });
      }

      // Create a buyer request object
      const buyerRequest = {
        buyerName: buyerName,
        buyerEmailAddress: buyerEmailAddress,
        buyerPhoneNumber: buyerPhoneNumber,
        buyerCurrentAddress: buyerCurrentAddress,
        productName: productName,
        productQuantity: productQuantity,
      };

      // Push the buyer request to the seller's buyerRequest field
      seller.buyerRequest.push(buyerRequest);

      // Save the updated seller document
      await seller.save();

      res.status(200).send({ message: "Buyer request sended" });
    } catch (error) {
      console.error("Error saving buyer request:", error);
      res.status(500).send({ message: "An error occurred" });
    }
  });

  app.post("/getUserDetails", async (req, res) => {
    try {
      const { userEmail } = req.body;
      const user = await userMartModel.findOne({ EmailAddress: userEmail });
      if (user) {
        const userName = user.FullName;
        const emailUser = user.EmailAddress;
        res.status(200).send({ userName, emailUser });
      }
    } catch (error) {
      res.status(500).send({ message: "An error occurred" });
    }
  });

  // app.post("/getAcceptedRequests", async (req, res) => {
  //   try {
  //     const { userEmail } = req.body;

  //     // Find user by their email
  //     const user = await userModel.findOne({
  //       "sellerAcceptRequest.buyerEmail": userEmail,
  //     });

  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     // Get the accepted requests
  //     const acceptedRequests = user.sellerAcceptRequest.filter(
  //       (request) => request.AcceptRequest === "Request Accepted"
  //     );

  //     // Push the accepted requests to userMartModel
  //     const userMart = await userMartModel.findOne({ EmailAddress: userEmail });

  //     // if (userMart) {
  //     //   // sellerAcceptedRequest:{type:Array, default: []},
  //     //   userMart.sellerAcceptedRequest.push(acceptedRequests);
  //     //   await userMart.save();
  //     // }

  //     // Send the accepted requests back to the frontend
  //     res.status(200).json({ acceptedRequests });
  //   } catch (error) {
  //     console.error("Error fetching accepted requests:", error);
  //     res.status(500).json({ message: "Server error" });
  //   }
  // });

  app.post("/getAcceptedRequests", async (req, res) => {
    try {
      const { userEmail } = req.body;
  
      // Find all sellers who have accepted the request from the buyer
      const sellers = await userModel.find({
        "sellerAcceptRequest.buyerEmail": userEmail,
      });
  
      if (sellers.length === 0) {
        return res.status(404).json({ message: "No accepted requests found" });
      }
  
      // Collect all accepted requests across multiple sellers
      let acceptedRequests = [];
  
      sellers.forEach((seller) => {
        const filteredRequests = seller.sellerAcceptRequest.filter(
          (request) => request.AcceptRequest === "Request Accepted"
        );
        acceptedRequests.push(...filteredRequests); // Merge all accepted requests
      });
  
      // Push the accepted requests to the userMartModel for the buyer
      // const userMart = await userMartModel.findOne({ EmailAddress: userEmail });
  
      // if (userMart) {
      //   userMart.sellerAcceptedRequest.push(...acceptedRequests);
      //   await userMart.save();
      // }
  
      // Send the collected accepted requests back to the frontend
      res.status(200).json({ acceptedRequests });
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  



  // app.post("/getRejectedRequests", async (req, res) => {
  //   try {
  //     const { userEmail } = req.body;

  //     // Find user by their email
  //     const user = await userModel.findOne({
  //       "sellerRejectRequest.buyerEmail": userEmail,
  //     });

  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     // Get the accepted requests
  //     const rejectedRequests = user.sellerRejectRequest.filter(
  //       (request) => request.AcceptRequest === "Request Rejected"
  //     );

      

  //     // Push the accepted requests to userMartModel
  //     const userMart = await userMartModel.findOne({ EmailAddress: userEmail });

  //     // if (userMart) {
  //     //   // sellerAcceptedRequest:{type:Array, default: []},
  //     //   userMart.sellerRejectRequest.push(rejectedRequests);
  //     //   await userMart.save();
  //     // }

  //     // Send the accepted requests back to the frontend
  //     res.status(200).json({ rejectedRequests });
  //   } catch (error) {
  //     console.error("Error fetching accepted requests:", error);
  //     res.status(500).json({ message: "Server error" });
  //   }
  // });

  app.post("/getRejectedRequests", async (req, res) => {
    try {
      const { userEmail } = req.body;
  
      // Find all users (sellers) who have rejected the request from the buyer's email
      const sellers = await userModel.find({
        "sellerRejectRequest.buyerEmail": userEmail,
      });
  
      if (!sellers || sellers.length === 0) {
        return res.status(404).json({ message: "No sellers found with rejected requests" });
      }
  
      // Accumulate rejected requests from all sellers
      const allRejectedRequests = [];
  
      sellers.forEach((seller) => {
        const rejectedRequests = seller.sellerRejectRequest.filter(
          (request) => request.AcceptRequest === "Request Rejected"
        );
        allRejectedRequests.push(...rejectedRequests);
      });
  
      // Send the combined rejected requests back to the frontend
      res.status(200).json({ rejectedRequests: allRejectedRequests });
    } catch (error) {
      console.error("Error fetching rejected requests:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  



  app.post("/addToCartDetails", async (req, res) => {
    try {
      const {
        imageName,
        addToCartProductName,
        addToCartProductDescription,
        addToCartProductPrice,
        userEmail,
      } = req.body;
  
      // Find the user's cart in userMartModel
      const userMart = await userMartModel.findOne({ EmailAddress: userEmail });
  
      if (!userMart) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Check if the product is already in the cart
      const isProductInCart = userMart.addToCartProducts.some(
        (product) => product.addToCartProductName === addToCartProductName
      );
  
      if (isProductInCart) {
        // If product is already in cart, send a message
        return res.status(401).send({ message: "Product already in cart", cartDetails: userMart.addToCartProducts });
      }
  
      // If the product is not in the cart, create the cart object
      const cartObject = {
        imageName: imageName,
        addToCartProductName: addToCartProductName,
        addToCartProductDescription: addToCartProductDescription,
        addToCartProductPrice: addToCartProductPrice,
      };
  
      // Push the new product to the cart
      userMart.addToCartProducts.push(cartObject);
      await userMart.save();
  
      // Return the updated cart details
      res.status(200).send({ message: "Item added to cart", cartDetails: userMart.addToCartProducts });
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      res.status(500).send({ message: "An error occurred" });
    }
  });


  app.post("/getCartDetails",async (req, res)=>{
    try {
      const {userEmail} = req.body;
      const userMart = await userMartModel.findOne({ EmailAddress: userEmail });
      const cartDetails = await userMart.addToCartProducts;
      res.status(200).send({message:"Got the Cart Product",cartDetails});
    } catch (error) {
      res.status(500).send({message:"An error occurred"});
    }
  });


  app.post("/removeProductFromCart", async (req, res) => {
    try {
      const { userEmail, removeProductName } = req.body;
  
      // Find the user by their email address
      const userMart = await userMartModel.findOne({ EmailAddress: userEmail });
  
      if (!userMart) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Filter out the product that needs to be removed
      const updatedCart = userMart.addToCartProducts.filter(
        (product) => product.addToCartProductName !== removeProductName
      );
  
      // Update the user's cart with the filtered cart
      userMart.addToCartProducts = updatedCart;
      await userMart.save();
  
      // Send success response
      res.status(200).send({ message: "Product removed from cart", cartDetails: updatedCart });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).send({ message: "An error occurred while removing the product from the cart" });
    }
  });
  
  

  // Start the server
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

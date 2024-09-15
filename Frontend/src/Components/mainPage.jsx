import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function MainPage() {
  const imageRefs = useRef([]);
  const navigate = useNavigate();

  function gotoProfileSection() {
    navigate("/profilePage");
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(Style.visible);
            observer.unobserve(entry.target); // Stop observing once the animation has started
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      if (imageRefs.current) {
        imageRefs.current.forEach((img) => {
          if (img) observer.unobserve(img);
        });
      }
    };
  }, []);

  const divRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(Style.visible);
            observer.unobserve(entry.target); // Stop observing after animation starts
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the div is visible
    );

    divRefs.current.forEach((div) => {
      if (div) observer.observe(div);
    });

    return () => {
      divRefs.current.forEach((div) => {
        if (div) observer.unobserve(div);
      });
    };
  }, []);

  const imageRefs1 = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.dataset.direction === "left") {
              entry.target.classList.add(Style.visibleLeft);
            } else {
              entry.target.classList.add(Style.visibleRight);
            }
            observer.unobserve(entry.target); // Stop observing once the animation starts
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    imageRefs1.current.forEach((image) => {
      if (image) observer.observe(image);
    });

    return () => {
      imageRefs1.current.forEach((image) => {
        if (image) observer.unobserve(image);
      });
    };
  }, []);

  const sectionRefs = useRef([]);
  const paraRefs = useRef([]);

  useEffect(() => {
    const options = {
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(Style.visible5); // Add visibility class to div
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    sectionRefs.current.forEach((div) => {
      if (div) observer.observe(div);
    });

    const handleParaIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(Style.visible5); // Add visibility class to paragraphs
          observer.unobserve(entry.target);
        }
      });
    };

    const paraObserver = new IntersectionObserver(
      handleParaIntersection,
      options
    );

    paraRefs.current.forEach((para) => {
      if (para) paraObserver.observe(para);
    });

    return () => {
      sectionRefs.current.forEach((div) => {
        if (div) observer.unobserve(div);
      });
      paraRefs.current.forEach((para) => {
        if (para) paraObserver.unobserve(para);
      });
    };
  }, []);

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

        {/* ---- section 1 ---- */}
        <div className={Style.section1}>
          <div className={Style.section1InnerDiv}>
            <div className={Style.section1InnerDiv1}>
              <h1 className={Style.section1InnerDiv1Heading}>
                Handcrafted with Heart, Delivered with{" "}
                <span className={Style.careSpan}>Care.</span>
              </h1>
              <p className={Style.section1InnerDiv1Para}>
                Every product on UdyogMart tells a story of skill, dedication,
                and tradition. We bring you a curated collection of handcrafted
                goods directly from local artisans across India. By shopping
                with us, you not only get high-quality, authentic items but also
                contribute to the livelihoods of small-scale entrepreneurs who
                craft with care and pride.
              </p>
              <button className={Style.getStartedBtn}>Get Started</button>
            </div>

            <img
              src="https://media.istockphoto.com/id/1491551245/photo/female-manager-showing-thumbs-up-sign-in-textile-industry.jpg?s=612x612&w=0&k=20&c=xAesg6rdQFCOgjroq2dVRTEDV6-2KMa8HCi9oIlsbcA="
              alt=""
              className={Style.section1InnerDivImg}
            />
          </div>
        </div>

        {/* ---- section 2 ---- */}
        <div className={Style.section2}>
          <div className={Style.section2InnerDiv1}>
            <div className={Style.section2InnerDiv12}>
              <img
                ref={(el) => (imageRefs.current[0] = el)}
                src="Assets/section2Image1.jpg"
                alt=""
                className={`${Style.section2InnerDiv12Image} ${Style.animatedImage}`}
              />
              <img
                ref={(el) => (imageRefs.current[1] = el)}
                src="Assets/section2image3.png"
                alt=""
                className={`${Style.section2InnerDiv12Image21} ${Style.animatedImage}`}
              />
            </div>

            <div className={Style.section2InnerDiv12}>
              <img
                ref={(el) => (imageRefs.current[2] = el)}
                src="Assets/section2Image2.jpg"
                alt=""
                className={`${Style.section2InnerDiv12Image2} ${Style.animatedImage}`}
              />
            </div>
          </div>

          <div className={Style.section2InnerDiv2}>
            <p className={Style.section2InnerDiv2Para}>
              | Our <span className={Style.careSpan}>Vision</span>
            </p>
            <h1 className={Style.section2InnerDiv2Heading}>
              Empower India's nano and micro-
              <span className={Style.careSpan}>entrepreneurs.</span>
            </h1>
            <p className={Style.section2InnerDiv2Para1}>
              UdyogMart is dedicated to connecting local artisans with a global
              audience, ensuring their unique, handcrafted products reach
              customers far and wide. By showcasing the rich heritage and
              craftsmanship of India's small-scale businesses, we aim to
              preserve and promote the cultural significance of these
              traditional arts. Through a commitment to fair trade and
              accessible opportunities, UdyogMart fosters sustainable growth for
              artisans, helping them scale their businesses while maintaining
              the integrity of their craft.
            </p>
            <button className={Style.readMoreBtn}>Read More</button>
          </div>
        </div>

        {/* ---- section 3 ---- */}
        <div className={Style.section3}>
          <div className={Style.section3InnerDiv1}>
            <p className={Style.section2InnerDiv2Para}>
              | Our <span className={Style.careSpan}>Approach</span>
            </p>
            <h1 className={Style.section2InnerDiv2Heading}>
              How We <span className={Style.careSpan}>Operate ?</span>
            </h1>
          </div>

          <div className={Style.section3InnerDiv2}>
            <div
              ref={(el) => (divRefs.current[0] = el)}
              className={`${Style.section3InnerDiv21} ${Style.animatedDiv} ${Style.delay1}`}
            >
              <div className={Style.numberCircleAndHeading}>
                <div className={Style.numberCircle}>
                  <p>1</p>
                </div>
                <p className={Style.section3InnerDivOperationPara}>
                  Order Processing
                </p>
              </div>

              <p className={Style.section3InnerDiv21Para}>
              Customers place their orders on the platform, and the system verifies inventory availability. Payment is processed either through online payment gateways or cash on delivery (COD).
              </p>
            </div>

            <div
              ref={(el) => (divRefs.current[1] = el)}
              className={`${Style.section3InnerDiv21} ${Style.animatedDiv} ${Style.delay2}`}
            >
              <div className={Style.numberCircleAndHeading}>
                <div className={Style.numberCircle}>
                  <p>2</p>
                </div>
                <p className={Style.section3InnerDivOperationPara}>
                  Delivery and Returns
                </p>
              </div>
              <p className={Style.section3InnerDiv21Para}>
              Delhivery picks up and delivers products to customers' addresses. In case of returns, they collect the items, inspect them for quality, and then process refunds or exchanges efficiently.
              </p>
            </div>

            <div
              ref={(el) => (divRefs.current[2] = el)}
              className={`${Style.section3InnerDiv21} ${Style.animatedDiv} ${Style.delay3}`}
            >
              <div className={Style.numberCircleAndHeading}>
                <div className={Style.numberCircle}>
                  <p>3</p>
                </div>
                <p className={Style.section3InnerDivOperationPara}>
                  Customer Updates
                </p>
              </div>
              <p className={Style.section3InnerDiv21Para}>
              Customers receive order confirmation with tracking details for real-time updates. They're notified of successful delivery or return status updates in case of returns.
              </p>
            </div>
          </div>
        </div>

        {/* ---- section 4 ---- */}
        <div className={Style.section4}>
          <div className={Style.section4InnerDiv2}>
            <p className={Style.section2InnerDiv2Para}>
              | Our <span className={Style.careSpan}>Objective</span>
            </p>
            <h1 className={Style.section2InnerDiv2Heading1}>
              Mutual Benefits for Customers and
              <span className={Style.careSpan}> Entrepreneurs.</span>
            </h1>
            <p className={Style.section2InnerDiv2Para1}>
              UdyogMart benefits both nano and micro-entrepreneurs and customers
              alike. Entrepreneurs gain access to a larger marketplace where
              they can showcase and sell their handcrafted products, helping
              them grow their businesses and reach new audiences. Customers, in
              turn, get the opportunity to purchase unique, high-quality items
              that reflect India's rich craftsmanship. By supporting local
              artisans, buyers contribute to sustainable practices and fair
              trade while enjoying authentic, handcrafted products.
            </p>
            <button className={Style.readMoreBtn}>Read More</button>
          </div>

          <div className={Style.section4InnerDiv1}>
            <div className={Style.section4InnerDiv12}>
              <img
                ref={(el) => (imageRefs1.current[0] = el)}
                data-direction="left"
                src="Assets/section4Img.png"
                alt=""
                className={`${Style.section4InnerDiv12Image} ${Style.animatedImage1}`}
              />
              <img
                ref={(el) => (imageRefs1.current[1] = el)}
                data-direction="right"
                src="Assets/section4Img5.jpg"
                alt=""
                className={`${Style.section2InnerDiv12Image3} ${Style.animatedImage1}`}
              />
            </div>

            <div className={Style.section4InnerDiv12}>
              <img
                ref={(el) => (imageRefs1.current[2] = el)}
                data-direction="left"
                src="Assets/section4Img4.jpg"
                alt=""
                className={`${Style.section2InnerDiv12Image3} ${Style.animatedImage1}`}
              />
              <img
                ref={(el) => (imageRefs1.current[3] = el)}
                data-direction="right"
                src="Assets/section4Img1.jpg"
                alt=""
                className={`${Style.section4InnerDiv12Image} ${Style.animatedImage1}`}
              />
            </div>
          </div>
        </div>

        {/* ---- section 5 ---- */}

        <div className={Style.section5}>
          <div className={Style.section3InnerDiv1}>
            <p className={Style.section2InnerDiv2Para}>
              | Our <span className={Style.careSpan}>Future Plan</span>
            </p>
            <h1 className={Style.section5InnerDivHeading}>
              Integrating with Major E-Commerce{" "}
              <span className={Style.careSpan}>Platforms.</span>
            </h1>
          </div>
          <div className={Style.section5Div2}>
            <div
              className={Style.section5Div21}
              ref={(el) => (sectionRefs.current[0] = el)}
            >
              <h1 className={Style.section2Div2Head}>UdyogMart</h1>
              <p
                className={Style.section5Para}
                ref={(el) => (paraRefs.current[0] = el)}
              >
                O{">"} UdyogMart will collect product details (description,
                images, price, etc.) from artisans.
              </p>
              <p
                className={Style.section5Para}
                ref={(el) => (paraRefs.current[1] = el)}
              >
                O{">"} Products are curated and formatted according to Flipkart
                & Amazon guidelines.
              </p>
              <p
                className={Style.section5Para}
                ref={(el) => (paraRefs.current[2] = el)}
              >
                O{">"} Orders placed on Flipkart & Amazon are tracked by
                UdyogMart for fulfillment.
              </p>
            </div>

            <div
              className={Style.section5Div21}
              ref={(el) => (sectionRefs.current[1] = el)}
            >
              <h1 className={Style.section2Div2Head}>Flipkart & Amazon</h1>
              <p
                className={Style.section5Para}
                ref={(el) => (paraRefs.current[3] = el)}
              >
                O{">"} Flipkart & Amazon receive this data via their API or bulk
                product listing feeds.
              </p>
              <p
                className={Style.section5Para}
                ref={(el) => (paraRefs.current[4] = el)}
              >
                O{">"} Products are listed on Flipkart and Amazon under
                designated categories.
              </p>
              <p
                className={Style.section5Para}
                ref={(el) => (paraRefs.current[5] = el)}
              >
                O{">"} Flipkart & Amazon process customer orders, payments, and
                support services.
              </p>
            </div>
          </div>
        </div>

        {/* <Link to="/">logout</Link> */}
      </div>
    </>
  );
}

export default MainPage;

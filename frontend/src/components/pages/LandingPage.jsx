import React, { useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import Navigationbar from "../pages/landing-page-components/navigationbar";
import "../../assets/css/LandingPage.css";
import car_img1 from "../../assets/images/car-img1.jpg";
import car_img2 from "../../assets/images/car-img2.jpg";
import car_img3 from "../../assets/images/car-img3.jpg";
import car_safety from "../../assets/images/car-safety.png";
import rent_car from "../../assets/images/rent-car.png";
import car_reliable from "../../assets/images/car-reliable.png";
import nationwide_service from "../../assets/images/nationwide-service.png";
import Signup from "../modals/signup";
import Login from "../modals/login";
import axios from "axios";
import Cookies from "js-cookie";

const LandingPage = (props) => {
  const navigate = useNavigate();
  const [showSignup,setShowSignup]=useState(false);
  const [showLogin,setShowLogin]=useState(false);
  const [userInfo, setUserInfo]=useState({
    id:"",
    username:"",
    email:"",
    password:""
  });

  // Sign up
  const handleOnChange=(e)=>{
    const value=e.target.value;
    setUserInfo({
        ...userInfo,
        [e.target.name]: value,
    });
 }
  const handleShowSignup=()=>{
   setShowSignup(true);
  }
  const handleCloseSignup=()=>{
    setShowSignup(false);
   }
  const handleSignup=async(e)=>{
    e.preventDefault();

    await axios.post("http://localhost:3000/api/auth/signup",userInfo)
    .then((response)=>{
      console.log(response);
    });
    setUserInfo({
      username:"",
      email:"",
      password:""});
    setShowSignup(false);
  }

   // Log in
   const handleShowLogin=()=>{
    setShowLogin(true);
   }
   const handleCloseLogin=()=>{
     setShowLogin(false);
    }
   const handleLogin=async(e)=>{
    e.preventDefault();
    //axios.defaults.withCredentials = true;
    //  await axios.post("http://localhost:3000/api/auth/signin", userInfo,{withCredentials:true})
    await axios.post("http://localhost:3000/api/auth/signin", userInfo, {withCredentials:true})
    .then((response)=>{
        let user={
            Role: response.data.roles,
            AccessToken: response.data.accessToken,
            RefreshToken: response.data.refreshToken
        }
        localStorage.setItem("user", JSON.stringify(user));

        const accessToken=Cookies.get('authToken');
        const UserRole=JSON.parse(localStorage.getItem("user"));
        console.log(UserRole);
        console.log(accessToken);

        if(accessToken && UserRole.Role ===  props.allowedRole.user ){
          //navigate("/user");
          window.location.href = "/user" 
        }else if(accessToken && UserRole.Role === props.allowedRole.admin ){
          window.location.reload();
          navigate("/admin");
        }else{
          <Navigate to={'/'} />
        }
        //accessToken && Role === "ROLE_USER" ?  location.href='/user/dashboard': <Navigate to={'/'}/>
    })
    .catch((errors)=>{
        console.log(errors.response.data);
    });
    setUserInfo({
      username:"",
      password:""});
     setShowLogin(false);
   }

  return (
    <div className="landing-page">
      <Navigationbar 
        handleShowSignup={handleShowSignup}
        handleShowLogin={handleShowLogin}
      />
      <Login
       handleChanges={handleOnChange}
       userInfo={userInfo}
       showLogin={showLogin}
       closeLogin={handleCloseLogin}
       login={handleLogin}
      />
      <Signup
        handleChanges={handleOnChange}
        userInfo={userInfo}
        showSignup={showSignup}
        closeSignup={handleCloseSignup}
        signup={handleSignup}
      />
      <div className="landing-page-header">
        <header className="landing-page-header-content">
          <h1>Drive Your Adventure: Find Your Perfect Ride with Us!</h1>
          <h4>
            Get behind the wheel of your dreams! Rent a car with
            <br />
            us today and experience the freedom of the open road.
            <br />
            Book now and let the adventure begin!
          </h4>
        </header>
        <div className="book-now-btn-container">
          <button>
            Book Now<i className="fa-solid fa-calendar-days"></i>
          </button>
        </div>
      </div>
      <div>
        <div className="landing-page-body">
          <div className="car-img-container">
            <div className="car-img-sub-container">
              <img className="car-img-2" src={car_img2} alt="car-img-2" />
              <img className="car-img-3" src={car_img3} alt="car-img-3" />
            </div>
            <img className="car-img-1" src={car_img1} alt="car-img-1" />
          </div>
          <div className="body-text-container">
            <h1>About Us</h1>
            <p>
              Our car rental company offers an extensive vehicle selection to
              meet every need and preference. We provide flexible
              rentaloptionsthat fit your schedule and duration. Our pricing is
              competitive,and we provide transparent cost details. With
              convenient onlinebooking, you can easily make hassle-free
              reservations.
            </p>
          </div>
        </div>
        <div className="car-icon-container">
          <div className="car-icon-content">
            <img src={car_safety} alt="" />
            <p>
              {" "}
              Travel with peace of mind knowing that we prioritize your safety
              at every step.
            </p>
          </div>
          <div className="car-icon-content">
            <img src={rent_car} alt="" />
            <p>
              Convenient pick-up and drop-off locations for your convenience.
            </p>
          </div>
          <div className="car-icon-content">
            <img src={car_reliable} alt="" />
            <p>
              Well-maintained and reliable vehicles for a comfortable and safe
              journey.
            </p>
          </div>
          <div className="car-icon-content">
            <img src={nationwide_service} alt="" />
            <p>
              Experience our nationwide car rental service. Wherever you are in
              the country, we have you covered.
            </p>
          </div>
        </div>
        <div className="next-travel-container">
          <div>
           <h1>Join us for your next travel journey!</h1>
           <button>Calculate now</button>
          </div>
        </div>
      </div>
      <div className="landing-page-footer">
        <footer className="landing-page-footer-content">
          <div className="content-column">
            <h4>Subscribe to the newsletter</h4>
            <div>
              <form>
                <input type="text" placeholder="Search..." />
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="content-column">
            <div className="links-heading">Top cities</div>
            <a href=""><i className="fa-solid fa-location-dot"></i>New York</a>
            <a href=""><i className="fa-solid fa-location-dot"></i>London</a>
            <a href=""><i className="fa-solid fa-location-dot"></i>Berlin</a>
            <a href=""><i className="fa-solid fa-location-dot"></i>Los Angeles</a>
            <a href=""><i className="fa-solid fa-location-dot"></i>Paris</a>
          </div>
          <div className="content-column">
            <div className="links-heading">Services</div>
            <a href="">Airport Transfers</a>
            <a href="">Chauffeur service</a>
            <a href="">Business meetings</a>
            <a href="">Corporate Trips</a>
            <a href="">Event service</a>
          </div>
          <div className="content-column">
            <div className="links-heading">Contacts Us</div>
            <a href=""><i className="fa-solid fa-location-dot"></i>123 Main Street, City, State, Zip Code</a>
            <a href=""><i className="fa-solid fa-envelope"></i> info@carrentalcompany.com</a>
            <a href=""><i className="fa-solid fa-phone"></i> 123-456-7890</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

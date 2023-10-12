import React from "react";

const navigationbar = ({handleShowSignup,handleShowLogin}) => {

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-bar-content">
          <div className="logo-container">
            <div className="main-logo">RC</div>
            <div className="sub-logo">Rental Car</div>
          </div>
          <div className="button-container">
            <div>
              <button className="login-btn" onClick={handleShowLogin}>Log in</button>
            </div>
            <div>
              <button className="signup-btn" onClick={handleShowSignup}>Sig nup</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default navigationbar;

import React,{useState} from "react";
import "../../assets/css/modal.css";
import { Link } from "react-router-dom";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const login = (props) => {
    const [showPassword, setShowPassword]=useState(false);
    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }
  return (
    <>
      <Modal
        className="login-modal"
        show={props.showLogin}
        onHide={props.closeLogin}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="login-modal-body me-4 ms-4">
          <Form>
            <Form.Group className="mb-4 mt-4">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={props.userInfo.username} onChange={props.handleChanges} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control className="border border-end-0" type={showPassword === false ? "password" : "text"} name="password" value={props.userInfo.password} onChange={props.handleChanges}/>
                <Button className="border border-start-0 login-modal-show-password" variant="outline-secondary" id="button-addon2" onClick={handleShowPassword}>
                  {showPassword === false ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-4">
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label="Remember me"
                  />
                </div>
              ))}
              <div>
                <Link to="/" className="text-decoration-none">
                  Forgot Password
                </Link>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="login-modal-footer">
          <Button className="login-button w-100" onClick={props.login}>
            Log in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default login;

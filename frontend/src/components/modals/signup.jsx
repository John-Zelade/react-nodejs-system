import React,{useState}from "react";
import "../../assets/css/modal.css";
import { Button, Modal, Form,InputGroup } from "react-bootstrap";

const signup = (props) => {
    const [showPassword, setShowPassword]=useState(false);
    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }
  return (
    <>
      <Modal className="signup-modal" show={props.showSignup} onHide={props.closeSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="signup-modal-body me-4 ms-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={props.userInfo.username} onChange={props.handleChanges} placeholder="Username" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={props.userInfo.email} onChange={props.handleChanges} placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control className="border border-end-0" type={showPassword === false ? "password" : "text"} name="password" value={props.userInfo.password} onChange={props.handleChanges} />
                <Button className="border border-start-0 signup-modal-show-password" variant="outline-secondary" id="button-addon2" onClick={handleShowPassword}>
                  {showPassword === false ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                </Button>
              </InputGroup>
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="signup-modal-footer">
          <Button className="signup-button w-100" onClick={props.signup}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default signup;

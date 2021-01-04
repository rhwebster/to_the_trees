import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("login")

  return (
    <>
      <button onClick={() => {
        setShowModal(true)
        setFormType("login")}}>Log In</button>
      <button onClick={() => {
        setShowModal(true)
        setFormType("signUp")}}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {(formType === "login") && <LoginForm />}
          {(formType === "signUp") && <SignupForm />}
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
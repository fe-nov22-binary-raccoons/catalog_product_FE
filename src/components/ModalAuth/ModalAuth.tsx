import React, { useState } from 'react';
import './ModalAuth.scss';
import Modal from 'react-bootstrap/Modal';
import { SignInModal } from './SignInModal';
import { SignUpModal } from './SignUpModal';

type Props = {
  show: boolean,
  onHide:() => void
};

export const ModalAuth: React.FC<Props> = (props) => {
  const [signUpForm, setSignUpForm] = useState(false);

  const reset = (callback: () => void) => callback;

  return (
    <Modal
      onExited = {() => reset}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {!signUpForm
        ? (
          <SignInModal setSignUpForm={setSignUpForm} reset={reset}
            onHide={props.onHide} />
        )
        : (
          <SignUpModal setSignUpForm={setSignUpForm} reset={reset} />
        )}
    </Modal>
  );
};

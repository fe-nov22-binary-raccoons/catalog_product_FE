import React, { useState } from 'react';
import '../ModalAuth.scss';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Loader } from '../../Loader';
import { User } from '../../../types/User';
import { ErrorMessages } from '../../../types/ErrorMessages';
import { ValidationError } from '../../../api/fetchClient';
import { registerUser } from '../../../api/fetchUser';

type Props = {
  setSignUpForm: (arg: boolean) => void,
  reset: (arg: () => void) => void
};

export const SignUpModal: React.FC<Props> = React.memo(({
  setSignUpForm, reset,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPassConfirm, setUserPassConfirm] = useState('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthMess, setIsAuthMess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.OnModalLoad);

  const singUp = async () => {
    if (userPassConfirm !== userPassword) {
      return;
    }

    setIsLoading(true);

    try {
      setIsError(false);
      const loggedInUser = await registerUser(userEmail, userPassword);

      setUser(loggedInUser);
      setIsAuthMess(true);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorMessage(ErrorMessages.OnSingUp);
      }

      setIsError(true);

    }

    setIsLoading(false);
    setUserEmail('');
    setUserPassword('');
    setUserPassConfirm('');
  };

  const reload = () => {
    setIsLoading(false);
    setUserEmail('');
    setUserPassword('');
    setIsError(false);
    setIsAuthMess(false);
    setErrorMessage(ErrorMessages.OnModalLoad);
  };

  reset(reload);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign up
        </Modal.Title>
      </Modal.Header>

      {isLoading
        && (<div className='auth-loader'>
          <Loader />
        </div>)}

      {!isLoading
      && (<Modal.Body>
        <Form onSubmit={singUp}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Your email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Your password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="password"
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Confirm your password</Form.Label>
            <Form.Control
              isInvalid = {userPassword !== userPassConfirm}
              type="password"
              placeholder="password"
              required
              value={userPassConfirm}
              onChange={(event) => setUserPassConfirm(event.target.value)}
            />
          </Form.Group>


          {isError
          && <h4
            className="heading-4 align-self-end">{errorMessage}</h4> }

          {user
            && isAuthMess
            && <h2 className="heading-2">
              Check your email to activate account
            </h2>}

          <button
            className="buy-btn modal-submit" type="submit">
            Sign up
          </button>
        </Form>
        <div className="auth">
          <span className="auth_text">Already have an account?</span>
          <a href=""
            onClick = {(event) => {
              event.preventDefault();
              setSignUpForm(false);
              reload();
            }}
            className="auth_link">
              Sign In
          </a>
        </div>
      </Modal.Body>)}
    </>
  );
});

SignUpModal.displayName = 'SighUpModel';

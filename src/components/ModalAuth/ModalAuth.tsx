import React, { useState } from 'react';
import './ModalAuth.scss';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { User } from '../../types/User';
import { loginUser, registerUser } from '../../api/fetchUser';
import { Loader } from '../Loader';
import { ErrorMessages } from '../../types/ErrorMessages';
import { ValidationError } from '../../api/fetchClient';

type Props = {
  show: boolean,
  onHide:() => void
};

export const ModalAuth: React.FC<Props> = (props) => {
  const [signUpForm, setSignUpForm] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPassConfirm, setUserPassConfirm] = useState('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isAuthMess, setIsAuthMess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.OnModalLoad);

  const singIn = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const loggedInUser = await loginUser(userEmail, userPassword);

      setUser(loggedInUser);
      setIsAuthMess(true);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorMessage(ErrorMessages.OnAuth);
      }

      setIsError(true);
    }

    setIsLoading(false);
    setUserEmail('');
    setUserPassword('');
  };

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

  return (
    <Modal
      onExited = {reload}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {!signUpForm
        ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Sign in
              </Modal.Title>
            </Modal.Header>

            {isLoading
              && (<div className='auth-loader'>
                <Loader />
              </div>)}

            {!isLoading
            && (<Modal.Body>
              <Form onSubmit={singIn}>
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

                {isError
                && <h4
                  className="heading-4 align-self-end">{errorMessage}</h4> }

                {user
                  && isAuthMess
                  && <h2 className="heading-2">Successful sign-in</h2>}

                <button
                  className="buttons_buy-btn modal-submit" type="submit">
                  Sign in
                </button>
              </Form>

              <div className="auth">
                <span className="auth_text">Not registered?</span>
                <a href=""
                  onClick = {(event) => {
                    event.preventDefault();
                    setSignUpForm(true);
                    reload();
                  }}
                  className="auth_link">
                    Create account
                </a>
              </div>
            </Modal.Body>)}
          </>
        )
        : (
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
                  className="buttons_buy-btn modal-submit" type="submit">
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
        )}
    </Modal>
  );
};

import React, { useState } from 'react';
import './ModalAuth.scss';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { User } from '../../types/User';
import { loginUser, registerUser } from '../../api/fetchUser';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { ErrorMessages } from '../../types/ErrorMessages';

type Props = {
  show: boolean,
  onHide:() => void
};

export const ModalAuth: React.FC<Props> = (props) => {
  const [signUpForm, setSignUpForm] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isAuthMess, setIsAuthMess] = useState(false);

  let authErrorMess = ErrorMessages.OnLoad;

  const singIn = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const loggedInUser = await loginUser(userEmail, userPassword);

      setUser(loggedInUser);
      setIsAuthMess(true);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
    setUserEmail('');
    setUserPassword('');
  };

  const singUp = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const loggedInUser = await registerUser(userEmail, userPassword);

      setUser(loggedInUser);
      setIsAuthMess(true);
    } catch (error) {
      setIsError(true);

      if (error instanceof Error && error.message.startsWith('4')) {
        authErrorMess = ErrorMessages.OnAuth;
      }
    }

    setIsLoading(false);
    setUserEmail('');
    setUserPassword('');
  };

  const reload = () => {
    setIsLoading(false);
    setUserEmail('');
    setUserPassword('');
    setIsError(false);
    setIsAuthMess(false);
  };

  return (
    <Modal
      onExited = {reload}
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* {`${user}`} */}
      {/* {`${isError}`} */}
      {!signUpForm
        ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Sign in
              </Modal.Title>
            </Modal.Header>

            {user
            && isAuthMess
            && <h2 className="heading-2 succes-mssg">Successful sign-in</h2>}

            {isError
              && (<div className="auth-error">
                <ErrorMessage text={authErrorMess}/>
              </div>)
            }

            {isLoading
              && (<div className='auth-loader'>
                <Loader />
              </div>)}

            {!isError && !isLoading
            && (<Modal.Body>
              <Form onSubmit={singIn}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Your email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Your password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                  />
                </Form.Group>

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

            {user
            && isAuthMess
            && <h2 className="heading-2 succes-mssg">Successful sign-up</h2>}

            {isError
              && (<div className="auth-error">
                <ErrorMessage text={authErrorMess}/>
              </div>)
            }

            {isLoading
              && (<div className='auth-loader'>
                <Loader />
              </div>)}

            {!isError && !isLoading
            && (<Modal.Body>
              <Form onSubmit={singUp}>
                {/* <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Your name</Form.Label>
                  <Form.Control type="text" placeholder="User" />
                </Form.Group> */}


                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Your email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Your password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                  />
                </Form.Group>

                {/* <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Confirm your password</Form.Label>
                  <Form.Control type="password" placeholder="password" />
                </Form.Group> */}

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

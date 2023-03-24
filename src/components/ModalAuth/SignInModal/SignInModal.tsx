import React, { useState } from 'react';
import '../ModalAuth.scss';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Loader } from '../../Loader';
import { User } from '../../../types/User';
import { ErrorMessages } from '../../../types/ErrorMessages';
import { ValidationError } from '../../../api/fetchClient';
import { loginUser } from '../../../api/fetchUser';
import { toast } from 'react-toastify';

type Props = {
  setSignUpForm: (arg: boolean) => void
  reset: (arg: () => void) => void,
  onHide:() => void
};

export const SignInModal: React.FC<Props> = ({
  setSignUpForm, reset, onHide,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
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
      toast.success('Successful sign-in', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        autoClose: 4000,
        // icon: ,
      });
      onHide();
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
  );
};

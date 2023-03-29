import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { activateUser } from '../../api/fetchUser';
import { Loader } from '../../components/Loader';
import './ActivationPage.scss';

export const ActivationPage: React.FC = () => {
  const { activationToken = '' } = useParams();
  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const fetchActivation = async () => {
    try {
      const res = await activateUser(activationToken);

      const { accessToken } = res;

      window.localStorage.setItem('accessToken', accessToken);
      nav('/');
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivation();
  });

  return (
    <>
      {
        isLoading
          ? <Loader />
          : (
            <div className="home-page container">
              <div className="row">
                <div className="col-24">
                  <div className="activation activation__container">
                    <div className="activation__verified"></div>
                    {
                      isSuccess
                        ? (
                          <h1 className="
                            heading-1
                            activation__header
                            activation__confirmed"
                          >
                            Your email has been confirmed
                          </h1>
                        )
                        : (
                          <h1 className="
                            heading-1
                            activation__header
                            activation__rejected"
                          >
                            Oops, something went wrong
                          </h1>
                        )
                    }
                    <NavLink to="/" className="activation__back">
                      go to home
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
};

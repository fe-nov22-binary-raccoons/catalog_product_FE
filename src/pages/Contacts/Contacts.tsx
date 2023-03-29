/* eslint-disable max-len */
import { useState } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { AcceptForm } from './AcceptForm';
import './Contacts.scss';

export const Contacts = () => {
  const [acceptForm, setAcceptForm] = useState(false);

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAcceptForm(true);
  };

  return (
    <div className="container contacts">
      <BreadCrumbs />
      <div className="row">
        <div className="col-24">
          <h1 className="heading-1">Contacts</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-24">
          <h1 className="heading-2 margin-top-40 position-center">Get in touch with us:</h1>

          {acceptForm && (
            <AcceptForm setAcceptForm={setAcceptForm}/>
          )}

          {!acceptForm && (
            <div className="contacts__container">
              <form
                action="#"
                method="post"
                className="contacts__form"
                onSubmit={handleForm}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name:"
                  className="form__item contact__field"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email:"
                  className="form__item contact__field"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message:"
                  className="form__item form__item-textarea"
                  required
                ></textarea>

                <button
                  className="form__item form__item-button"
                  type="submit">
                    Send
                </button>
              </form>

            </div>
          )}

          <h3 className="heading-2 margin-top-100 position-center">
            People who create this site:
          </h3>

          <div className="persons__container">
            <div className="contacts__person">
              <div className="contacts__name">
                <div className="person__photo person__photo-yevhen"></div>
                <div className="person__container">
                  <h3 className="heading-3 margin-del position-start">
                    Sukhostavskyi Yevhen
                  </h3>

                  <div className="contacts__info">
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://www.linkedin.com/in/yevhen-sukhostavskyi-731878265/"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-linkedin"></span>
                      <span className="contacts__label">Linkedin</span>
                    </a>
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://github.com/svitjojo"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-gitHub"></span>
                      <span className="contacts__label">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contacts__person">
              <div className="contacts__name">
                <div className="person__photo person__photo-tetiana"></div>
                <div className="person__container">
                  <h3 className="heading-3 margin-del position-start">
                    Boiar Tetiana
                  </h3>

                  <div className="contacts__info">
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://www.linkedin.com/in/tetiana-boiar-0701b8187/?originalSubdomain=ua"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-linkedin"></span>
                      <span className="contacts__label">Linkedin</span>
                    </a>
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://github.com/tania-boiar"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-gitHub"></span>
                      <span className="contacts__label">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contacts__person">
              <div className="contacts__name">
                <div className="person__photo person__photo-oleh"></div>

                <div className="person__container">
                  <h3 className="heading-3 margin-del position-start">
                Holovnykh Oleh
                  </h3>

                  <div className="contacts__info">
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="http://www.linkedin.com/in/oleh-holovnykh"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-linkedin"></span>
                      <span className="contacts__label">Linkedin</span>
                    </a>
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://github.com/oleh-holovnykh"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-gitHub"></span>
                      <span className="contacts__label">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contacts__person">
              <div className="contacts__name">
                <div className="person__photo person__photo-max"></div>

                <div className="person__container">
                  <h3 className="heading-3 margin-del position-start">
                    Rozzhalovec Max
                  </h3>

                  <div className="contacts__info">
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://www.linkedin.com/in/max-rozzhalovets/"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-linkedin"></span>
                      <span className="contacts__label">Linkedin</span>
                    </a>
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://github.com/max-rozzhalovets"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-gitHub"></span>
                      <span className="contacts__label">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contacts__person">
              <div className="contacts__name">
                <div className="person__photo person__photo-sasha"></div>

                <div className="person__container">
                  <h3 className="heading-3 margin-del position-start">
                    Semenyuk Oleksandr
                  </h3>

                  <div className="contacts__info">
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://www.linkedin.com/in/oleksandr-semenyuk-54137a254/"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-linkedin"></span>
                      <span className="contacts__label">Linkedin</span>
                    </a>
                    <a
                      className="contacts__link"
                      target="_blank"
                      href="https://github.com/alSemenyuk"
                      rel="noreferrer"
                    >
                      <span className="contacts__img contacts__img-gitHub"></span>
                      <span className="contacts__label">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

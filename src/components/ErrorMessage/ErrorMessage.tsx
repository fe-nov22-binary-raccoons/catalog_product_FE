import React from 'react';
import { ErrorMessages } from '../../types/ErrorMessages';
import './ErrorMessage.scss';

type Props = {
  text: string;
};

export const ErrorMessage: React.FC<Props> = ({ text }) => (
  <>
    <h2 className="heading-2 error-msg">{text}</h2>

    {text === ErrorMessages.OnLoad && (
      <button
        className="reload-btn"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    )}

  </>
);

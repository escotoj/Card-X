import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { CREATE_CARD } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CardForm = ({ cardId }) => {
  const [cardText, setcardText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [createCard, { error }] = useMutation(CREATE_CARD);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createCard({
        variables: {
          cardId,
          cardText,
          cardAuthor: Auth.getProfile().data.username,
        },
      });

      setcardText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'cardText' && value.length <= 280) {
      setcardText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Create Card </h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="cardText"
                placeholder="Add your card..."
                value={cardText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add card
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CardForm;

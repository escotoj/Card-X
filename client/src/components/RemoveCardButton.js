import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_CARD } from '../utils/mutations';

function RemoveCardButton({ cardId, onRemove }) {
  return (
    <button onClick={() => onRemove(cardId)}>
      Remove Card
    </button>
  );
}

export default RemoveCardButton;

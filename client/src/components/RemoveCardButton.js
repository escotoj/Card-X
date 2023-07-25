import React from 'react';

import { Button } from "@mui/material";

function RemoveCardButton({ cardId, onRemove }) {
  return (
    <Button style={{ backgroundColor: 'pink' }} onClick={() => onRemove(cardId)}>
      Remove Card
    </Button >
  );
}

export default RemoveCardButton;

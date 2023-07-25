import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_CARD } from '../utils/mutations';
import { Typography, Paper, Box, TextField, Button } from "@mui/material";

function RemoveCardButton({ cardId, onRemove }) {
  return (
    <Button style={{ backgroundColor: 'pink' }} onClick={() => onRemove(cardId)}>
      Remove Card
    </Button >
  );
}

export default RemoveCardButton;

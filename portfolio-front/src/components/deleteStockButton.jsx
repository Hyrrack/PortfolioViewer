import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteStock } from '../hooks/useDeleteStock';

const DeleteStockButton = ({ stockSymbol }) => {

    const { mutate: deleteStockMutation, isLoading } = useDeleteStock();

    const handleDeleteClick = (event) => {
        event.stopPropagation();

        deleteStockMutation(stockSymbol);
    };

    return (
        <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteClick}
            disabled={isLoading}
        >
            {/* Show a spinner while deleting, otherwise show the icon */}
            {isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
        </IconButton>
    );
};

export default DeleteStockButton;

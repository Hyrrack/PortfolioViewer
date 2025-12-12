import { useState } from 'react';
import { useAddStock } from '../hooks/useAddStock';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const AddStockButton = () => {
    const [open, setOpen] = useState(false);
    const [symbol, setSymbol] = useState('');
    const { mutate: addStock, isPending, error } = useAddStock();

    const handleSubmit = () => {
        addStock(symbol.toUpperCase(), {
            onSuccess: () => {
                setOpen(false);
                setSymbol('');
            },
        });
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
                fullWidth
            >
                Add Stock
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Stock</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Stock Symbol"
                        fullWidth
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="AAPL"
                        error={!!error}
                        helperText={error?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isPending || !symbol.trim()}
                    >
                        {isPending ? 'Adding...' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
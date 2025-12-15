import { useState } from "react"
import {
    Button,
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { AddStockButton } from "./addStockButton"
import DeleteStockButton from "./deleteStockButton";

const drawerWidth = 240;

export function StockSidebar({ stocks, activeStock, onSelectStock }) {

    return (<>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingLeft: 2 }}>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        📈 Stockfolio
                    </Typography>
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {stocks.map(s => (
                    <ListItem
                        key={s.id}
                        disablePadding
                        selected={activeStock?.id === s.id}
                        secondaryAction={
                            <DeleteStockButton
                                stockSymbol={s.symbol}
                            />
                        }
                    >
                        <ListItemButton onClick={() => onSelectStock(s)}>
                            <ListItemText primary={s.companyName} secondary={s.symbol} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box sx={{ p: 2, flexShrink: 0 }}>
                <AddStockButton />
            </Box>
        </Drawer>
    </>
    )
}

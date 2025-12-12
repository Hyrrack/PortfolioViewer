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

const drawerWidth = 240;

export function StockSidebar({ stocks, activeStock, onSelectStock }) {

    return (<>
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        ></AppBar>
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
            <Toolbar />
            <Divider />
            <List>
                {stocks.map(s => (
                    <ListItem
                        key={s.id}
                        disablePadding
                        selected={activeStock?.id === s.id}
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

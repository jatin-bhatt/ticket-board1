import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, CardHeader, IconButton, MenuItem, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { showDeleteTicketModal, showTicketModal } from '../../redux/slices/ticketSlice';
import { TicketCardOptions } from '../../utils/appUtil';

const TicketCardComponent = ({ ticket }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (option) => {
        if (option === TicketCardOptions.EDIT) {
            dispatch(showTicketModal(ticket.id));
        } else if (option === TicketCardOptions.DELETE) {
            dispatch(showDeleteTicketModal(ticket.id))
        }
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="delete" onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={ticket.name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {ticket.description}
                </Typography>
            </CardContent>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
            >
                {Object.entries(TicketCardOptions).map(([key, value]) => (
                    <MenuItem key={key} onClick={() => handleMenuItemClick(value)}>
                        {value}
                    </MenuItem>
                ))}
            </Menu>
        </Card>
    )
}

export default TicketCardComponent;
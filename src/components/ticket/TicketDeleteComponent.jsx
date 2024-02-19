import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import useAuthMutation from '../../hooks/useAuthMutation';
import { DELETE_TICKET } from '../../graphql/mutation';
import Config from '../../utils/config';
import { hideDeleteTicketModal, removeTicketData, setTicketError, setTicketLoading } from '../../redux/slices/ticketSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../common/Loader';

const TicketDeleteComponent = () => {
    const dispatch = useDispatch();
    const { data: ticketData, deleteTicketId, loading } = useSelector((state) => state.ticket);
    const { customMutate, loading: graphqlLoading, error: graphqlError } = useAuthMutation(
        DELETE_TICKET
    );
    const ticket = ticketData.tickets.find(item => item.id === deleteTicketId);

    useEffect(() => {
        dispatch(setTicketLoading(graphqlLoading));
        if (graphqlError) {
            dispatch(setTicketError(graphqlError.message));
        }
    }, [dispatch, graphqlLoading, graphqlError]);


    const handleClose = () => {
        dispatch(hideDeleteTicketModal());
    };

    const handleDelete = async () => {
        try {
            const { data } = await customMutate({
                organisationId: Config.organizationId,
                ticketId: ticket.id,
            });
            dispatch(removeTicketData(data.deleteTicket.id));
            handleClose();
        } catch (error) {
            // Handle error
            console.error('Error deleting ticket:', error.message);
        } finally {
            dispatch(setTicketLoading(false))
        }
    }

    return (
        <Dialog
            open={!!deleteTicketId}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Loader show={loading}/>
            <DialogTitle id="alert-dialog-title">
                {ticket.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Delete this Ticket?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TicketDeleteComponent;
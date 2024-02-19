import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TicketStatus } from '../../utils/appUtil';
import { addTicketData, hideTicketModal, setTicketError, setTicketLoading, updateTicketData } from '../../redux/slices/ticketSlice';
import useAuthMutation from '../../hooks/useAuthMutation';
import { CREATE_TICKET } from '../../graphql/mutation';
import { useParams } from 'react-router-dom';
import Loader from '../common/Loader';

const TicketCreateComponent = (props) => {

    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [ticketName, setTicketName] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");

    const { data: ticketData, modalTicketId, loading } = useSelector((state) => state.ticket);

    const { customMutate, loading: graphqlLoading, error: graphqlError  } = useAuthMutation(
        CREATE_TICKET
    );
    const ticket = ticketData?.tickets?.find(item => item.id === modalTicketId);

    useEffect(() => {
        if (ticket) {
            setTicketName(ticket.name);
            setTicketDescription(ticket.description);
            setTicketStatus(ticket.status);
        }    
    }, [ticket])

    useEffect(() => {
        dispatch(setTicketLoading(graphqlLoading));
        if (graphqlError) {
            dispatch(setTicketError(graphqlError.message));
        }
    }, [dispatch, graphqlLoading, graphqlError]);

    function isCreate() {
        return modalTicketId === "";
    }

    function isModalOpen() {
        return modalTicketId !== null;
    }

    const handleClose = () => {
        dispatch(hideTicketModal());
    }

    const handleCreateEdit = async ({ name, description, status }) => {

        try {
            const { data } = await customMutate({
                boardId: boardId,
                ...(ticket && {ticketId: modalTicketId}),
                input: {
                    "name": name,
                    "description": description,
                    "status": status,
                    "visible": true
                }
            });

            if(isCreate()) {
                dispatch(addTicketData(data.putTicket));
                // Handle the updated user data
                console.log(`Ticket created successfully:`, data);
    
            } else {
                dispatch(updateTicketData(data.putTicket));

                console.log(`Ticket updated successfully:`, data);
            }
            handleClose();
        } catch (error) {
            // Handle error
            console.error(`Error ${isCreate() ? 'creating' : 'updating'} ticket:`, error.message);
        } finally {
            dispatch(setTicketLoading(false));
        }
    }

    return (
        <Dialog
            open={isModalOpen()}
            onClose={handleClose}
            fullWidth={true}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData).entries());
                    console.log(formJson);
                    handleCreateEdit(formJson);
                },
            }}
        >
            <Loader show={loading}/>

            <DialogTitle>
                {isCreate() ? 'Create' : 'Edit'} Ticket
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ mb: 2}}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Enter Ticket Name"
                        type="text"
                        value={ticketName}
                        onChange={e => setTicketName(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Enter Ticket Description"
                        type="text"
                        fullWidth
                        multiline
                        value={ticketDescription}
                        onChange={e => setTicketDescription(e.target.value)}
                        rows={4}
                        variant="standard"
                    />
                </FormControl>
                <FormControl sx={{ minWidth: 160, mb: 2 }}>
                    <InputLabel id="demo-simple-select-helper-label" htmlFor="max-width">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="status"
                        value={ticketStatus ? ticketStatus : TicketStatus.TODO}
                        onChange={e => setTicketStatus(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value={TicketStatus.TODO}>{TicketStatus.TODO}</MenuItem>
                        <MenuItem value={TicketStatus.INPROGRESS}>{TicketStatus.INPROGRESS}</MenuItem>
                        <MenuItem value={TicketStatus.DONE}>{TicketStatus.DONE}</MenuItem>
                    </Select>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{isCreate() ? 'Create': 'Update'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TicketCreateComponent;
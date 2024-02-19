import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CREATE_BOARD } from '../../graphql/mutation';
import useAuthMutation from '../../hooks/useAuthMutation';
import { useDispatch, useSelector } from 'react-redux';
import { addBoardData, hideBoardModal, setBoardError, setBoardLoading } from '../../redux/slices/boardSlice';
import Loader from '../common/Loader';
import { FormControl } from '@mui/material';


const BoardCreateComponent = () => {

    const dispatch = useDispatch();
    
    const { data: boardData, modalBoardId, loading } = useSelector((state) => state.board);

    const { customMutate, loading: graphqlLoading, error: graphqlError } = useAuthMutation(
        CREATE_BOARD
    );

    useEffect(() => {
        dispatch(setBoardLoading(graphqlLoading));
        if (graphqlError) {
            dispatch(setBoardError(graphqlError.message));
        }
    }, [dispatch, graphqlLoading, graphqlError]);

    function isModalOpen() {
        return modalBoardId !== null;
    }

    const handleClose = () => {
        dispatch(hideBoardModal());
    };

    const handleCreate = async (name) => {
        try {
            const { data } = await customMutate({
                input: {
                    name: name
                }
            });
            
            dispatch(addBoardData(data.putBoard));
            // Handle the updated user data
            console.log('Board created successfully:', data);
            handleClose();
          } catch (error) {
            // Handle error
            console.error('Error creating board:', error.message);
          } finally {
            dispatch(setBoardLoading(false));
          }
    }

    return (
        <>
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
                        const name = formJson.name;
                        console.log(name);
                        handleCreate(name);
                    },
                }}
            >
                <Loader show={loading}/>
    
                <DialogTitle>Create Board</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Enter Board Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BoardCreateComponent;
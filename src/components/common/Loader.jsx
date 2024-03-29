import React from 'react';
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({show}) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={show}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader;
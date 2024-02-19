import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import BoardCardComponent from "./BoardCardComponent";
import BoardCreateComponent from "./BoardCreateComponent";
import { GET_ORGANIZATION_BOARDS } from "../../graphql/queries";
import useAuthQuery from "../../hooks/useAuthQuery";
import { setBoardData, setBoardLoading, setBoardError, showBoardModal } from "../../redux/slices/boardSlice";
import Loader from "../common/Loader";
import { ReactComponent as LogoIcon } from './../../logo.svg';
import "./style.css";

const BoardComponent = () => {

    const dispatch = useDispatch();
    const { data, loading, error, modalBoardId } = useSelector((state) => state.board);

    const { data: graphqlData, loading: graphqlLoading, error: graphqlError } = useAuthQuery(GET_ORGANIZATION_BOARDS);

    useEffect(() => {
        dispatch(setBoardLoading(graphqlLoading));
        if (graphqlData) {
          dispatch(setBoardData(graphqlData.organisation.boards));
        }
        if (graphqlError) {
          dispatch(setBoardError(graphqlError.message));
        }
    }, [dispatch, graphqlData, graphqlLoading, graphqlError]);


    const createBoardClick = () => {
        dispatch(showBoardModal(""));
    }

    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container>
            <Box display="flex" justifyContent={"space-between"} alignItems={"center"} gap={4} padding={2}>
                <LogoIcon/>
                <Button variant="outlined" onClick={createBoardClick}>
                    Create Board
                </Button> 
            </Box>
            <Divider sx={{mb: 2}}/>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {
                    data?.map(item => (
                        <Grid item key={item.id} xs={3}>
                            <BoardCardComponent board={item} />
                        </Grid>
                    ))
                }
            </Grid>
            {
                (null !== modalBoardId) && <BoardCreateComponent />
            }
            <Loader show={loading}/>
        </Container>
    )
}

export default BoardComponent;
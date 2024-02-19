import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material";
import TicketCardComponent from "./TicketCardComponent";
import useAuthQuery from "../../hooks/useAuthQuery";
import { setTicketData, setTicketError, setTicketLoading, showTicketModal } from "../../redux/slices/ticketSlice";
import { GET_TICKETS } from "../../graphql/queries";
import { TicketStatus } from "../../utils/appUtil";
import TicketCreateComponent from "./TicketCreateComponent";
import Loader from "../common/Loader";
import TicketDeleteComponent from "./TicketDeleteComponent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./style.css";

const TicketComponent = () => {

    let { boardId } = useParams();

    const dispatch = useDispatch();
    const { data: ticketData, loading, error, modalTicketId, deleteTicketId } = useSelector((state) => state.ticket);

    const { data: graphqlData, loading: graphqlLoading, error: graphqlError } = useAuthQuery(GET_TICKETS, {
        boardId: boardId
    });

    useEffect(() => {
        return () => {
            dispatch(setTicketData({}));
        }
    }, []);

    useEffect(() => {
        dispatch(setTicketLoading(graphqlLoading));
        if (graphqlData) {
            dispatch(setTicketData(graphqlData.board));
        }
        if (graphqlError) {
            dispatch(setTicketError(graphqlError.message));
        }
    }, [dispatch, graphqlData, graphqlLoading, graphqlError]);

    const createTicketClick = () => {
        dispatch(showTicketModal(""));
    }

    if (error) return <p>Error: {error.message}</p>;

    const TicketsByStatus = ({ status }) => {
        const tickets = ticketData?.tickets?.filter(item => item.status === status);
        return (
            <Card variant="outlined" className="ticket-section">
                <CardHeader
                    className="card-header"
                    title={`${status} ${tickets?.length ? tickets?.length : 0}`}
                />
                <CardContent>
                    <Box className="ticket-card">
                        {
                            tickets?.map(item => (
                                <TicketCardComponent key={item.id} ticket={item} />
                            ))
                        }
                    </Box>
                </CardContent>
            </Card>
        )
    }

    return (
        <Container>
            <Box display="flex" justifyContent={"space-between"} alignItems={"center"} gap={4} padding={2}>
                <Link to={`/`}>
                    <ArrowBackIcon/>                    
                </Link>
                <Typography>
                    {ticketData?.name}
                </Typography>
                <Button variant="outlined" onClick={createTicketClick}>
                    Create Ticket
                </Button>
            </Box>

            <Divider sx={{mb: 2}}/>

            <Box className="ticket-container">
                <TicketsByStatus status={TicketStatus.TODO} />
                <TicketsByStatus status={TicketStatus.INPROGRESS} />
                <TicketsByStatus status={TicketStatus.DONE} />
            </Box>
            {
                (null !== modalTicketId) && <TicketCreateComponent />
            }
            {
                deleteTicketId && <TicketDeleteComponent />
            }
            <Loader show={loading}/>
        </Container>
    )
}
export default TicketComponent;
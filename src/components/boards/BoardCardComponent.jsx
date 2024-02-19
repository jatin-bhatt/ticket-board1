import React from 'react';
import Card from '@mui/material/Card';
import { Button, CardActionArea, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BoardCardComponent = ({ board }) => {
    return (
        <Card>
            <CardActionArea >
                <Link to={`boards/${board.id}`}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {board.name}
                        </Typography>
                    </CardContent>

                </Link>
                <Divider/>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default BoardCardComponent;
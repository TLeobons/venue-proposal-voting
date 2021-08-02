import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    makeStyles,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Radio,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 10
    },
    container: {
        maxHeight: 'calc(100vh - 304px)',
    },
    title: {
        flexGrow: 1,
    },
    heading: {
        marginBottom: 16
    },
    search: {
        marginTop: 20,
        padding: 20
    },
    buttonContainer: {
        textAlign: 'center',
        margin: 20
    },
    cardRoot: {
        // height: 345,
    },
    media: {
        height: 140,
    },
    cardContainer: {
        margin: '20px 0'
    }
}))

const VoteView = ({
    name,
    count,
    selectedValue,
    castVote,
    handleChange,
}) => {

    const classes = useStyles()

    return (
        <div>
            <AppBar position="static" color='primary'>
                <Container >
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Venue Proposals
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container>
                <div className={classes.search}>
                    <Typography variant='h4' className={classes.heading}>Hey {name}</Typography>
                    <Typography variant='body1'>Select the box of your favourite lunchplace to vote for it.</Typography>
                </div>


                <Grid container spacing={3} className={classes.cardContainer}>
                    {
                        count.venues.map(venue => (
                            <Grid item lg={3} md={4} sm={6} xs={12} >
                                <Card onClick={() => { handleChange(venue.venueid) }} className={classes.cardRoot}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={10} >
                                                    <Typography gutterBottom variant="h6">
                                                        {venue.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Radio
                                                        checked={selectedValue === venue.venueid}
                                                        onChange={e => handleChange(e.target.value)}
                                                        value={venue.venueid}
                                                        name="venues"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>

                <div className={classes.buttonContainer}>
                    <Button disabled={!selectedValue} onClick={castVote} variant='contained' color="primary">Vote</Button>
                </div>
            </Container>

        </div>
    )
}

export default VoteView

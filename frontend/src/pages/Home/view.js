import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    makeStyles,
    fade,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    CircularProgress,
    InputBase
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import AddUserDialog from '../../components/AddUserDialog'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 40
    },
    container: {
        maxHeight: 'calc(100vh - 276px)',
    },
    title: {
        flexGrow: 1,
    },
    filter: {
        margin: 40
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        marginTop: 40,
        padding: 20
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    message: {
        fontWeight: '500',
        padding: 20
    }
}))

const HomeView = ({
    open,
    loading,
    options,
    query,
    selectedOption,
    count,
    columns,
    winner,
    rows,
    location,
    openDialog,
    handleClickOpen,
    setLocation,
    setOpen,
    setSelectedOption,
    setQuery,
    addNewVenue,
    handleClose
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
                        <Button onClick={handleClickOpen} color="inherit">Add Participant</Button>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <LocationOnIcon />
                            </div>
                            <InputBase
                                placeholder="Location"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{
                                    'aria-label': 'location',
                                    value: location,
                                    onChange: e => setLocation(e.target.value)
                                }}
                            />
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container>
                <div className={classes.searchBar}>
                    <Grid container spacing={0}>
                        <Grid item xs={8} md={9} lg={10}>
                            <Autocomplete
                                id="asynchronous-demo"
                                style={{ width: '100%' }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true)
                                }}
                                onClose={() => {
                                    setOpen(false)
                                }}
                                getOptionSelected={(option, value) => { return option.name === value.name }}
                                getOptionLabel={(option) => option.name}
                                options={options}
                                loading={loading}
                                // autoSelect={true}
                                onChange={(event, value) => setSelectedOption(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Venues"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            value: query,
                                            onChange: (e) => setQuery(e.target.value),
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4} md={3} lg={2} className={classes.buttonContainer}>
                            <Button disabled={!selectedOption?.name} onClick={addNewVenue} variant='contained' color="primary">Add Lunchplace</Button>
                        </Grid>
                    </Grid>
                </div>

                <Paper className={classes.root}>
                    {
                        count.venues.length <= 0 && count.users.length <= 0
                            ? <Typography variant="h5" align="center" className={classes.message}>No Data</Typography>
                            : count.venues.length <= 0
                                ? <Typography variant="h5" align="center" className={classes.message}>No Venues</Typography>
                                : count.users.length <= 0
                                    ? <Typography variant="h5" align="center" className={classes.message}>No Users</Typography>
                                    : <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column, index) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={'center'}
                                                            style={{ backgroundColor: index === winner + 1 && index !== 0 ? '#baffba' : null }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" key={index}>
                                                            <TableCell
                                                                onClick={() => navigator.clipboard.writeText(`${window.location.href}user/${row.userId}`)}
                                                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                            >
                                                                {row.name}
                                                                <FileCopyOutlinedIcon fontSize="small" style={{ margin: '5px 20px', color: "#676767" }} />
                                                            </TableCell>
                                                            {
                                                                row.votingData.map((vote, index) => (
                                                                    <TableCell
                                                                        key={index}
                                                                        align={'center'}
                                                                        style={{ color: "#676767", backgroundColor: index === winner ? '#baffba' : null }}
                                                                    >
                                                                        {vote ? <CheckCircleIcon /> : null}
                                                                    </TableCell>)
                                                                )
                                                            }

                                                        </TableRow>
                                                    )
                                                })}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                    }

                </Paper>
            </Container>
            <AddUserDialog {...{ open: openDialog, handleClose }} />
        </div>
    )
}

export default HomeView

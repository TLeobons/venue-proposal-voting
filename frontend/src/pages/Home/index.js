import React, { useState, useEffect } from 'react'
import fetch from 'cross-fetch'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getData, addVenue, selectCount } from '../../features/venueSlice'
import HomeView from './view'

const Home = () => {
    const [location, setLocation] = useState('new york')
    const [query, setQuery] = useState('')
    const [open, setOpen] = React.useState(false)
    const [options, setOptions] = React.useState([])
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectedOption, setSelectedOption] = useState({})
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [winner, setWinner] = useState(-1)

    const loading = open && options.length === 0
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)

    useEffect(() => {
        let tempRows = []
        let tempColumns = [{ id: 0, label: '' }]
        let voteArray = []

        for (let [index, colItem] of count.venues.entries()) {
            tempColumns.push({ id: index + 1, label: colItem.name })
        }

        for (let rowItem of count.users) {
            let data = []
            for (let colItem of count.venues) {
                if (rowItem.voting === colItem.venueid) {
                    data.push(true)
                }
                else {
                    data.push(false)
                }
            }
            tempRows.push({ name: rowItem.name, userId: rowItem.userid, votingData: data })
        }

        for (let item of tempRows) {
            for (let [index, vote] of item.votingData.entries()) {
                if (vote) {
                    voteArray[index] = voteArray[index] ? voteArray[index] + 1 : 1
                }
            }
        }

        // voteArray = voteArray.map(function (item) { return !item ? 0 : item })

        setWinner(indexOfMax(voteArray))
        setColumns(tempColumns)
        setRows(tempRows)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    useEffect(() => {
        let active = true
        if (!loading) {
            return undefined
        }
        (async () => {
            const response = await fetch(`${process.env.REACT_APP_FSQ_URL}/v2/venues/explore?client_id=${process.env.REACT_APP_FSQ_CLIENT_ID}&client_secret=${process.env.REACT_APP_FSQ_CLIENT_SECRET}&v=${process.env.REACT_APP_V}&near=${location}&query=${query}`)
            const data = await response.json()
            const venues = data.response.groups[0].items

            if (active) {
                setOptions(venues.map((venue) => ({ ...venue.venue })))
            }
        })()

        return () => {
            active = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    useEffect(() => {
        if (!open) {
            setOptions([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    useEffect(() => {
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                setLocation(response.city)
            })
            .catch((data, status) => {
            })

        dispatch(getData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const indexOfMax = (arr) => {
        if (arr.length === 0) {
            return -1
        }

        let max = arr[0]
        let maxIndex = 0

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i
                max = arr[i]
            }
        }

        return maxIndex
    }

    const addNewVenue = () => {
        dispatch(addVenue(selectedOption))
        setSelectedOption({})
    }

    const handleClickOpen = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    const viewProps = {
        open,
        loading,
        options,
        query,
        selectedOption,
        count,
        columns,
        winner,
        rows,
        openDialog,
        location,
        handleClickOpen,
        setLocation,
        setOpen,
        setSelectedOption,
        setQuery,
        addNewVenue,
        handleClose
    }

    return (
        <HomeView {...viewProps} />
    )
}

export default Home

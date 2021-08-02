import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getData, castNewVote, selectCount } from '../../features/venueSlice'
import { useHistory } from 'react-router-dom'
import VoteView from './view'

const Vote = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)

    const [userId, setUserId] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        setUserId(window.location.pathname.slice(6, window.location.pathname.length))
        dispatch(getData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let user = count.users.filter(user => user.userid === userId)
        setName(user[0]?.name)
        if (user[0]?.voting) {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    const handleChange = (value) => {
        setSelectedValue(value)
    }

    const castVote = () => {
        dispatch(castNewVote({
            userid: userId,
            venueid: selectedValue
        }))
    }

    const viewProps = {
        name,
        count,
        selectedValue,
        castVote,
        handleChange,
    }

    return (
        <VoteView {...viewProps} />
    )
}

export default Vote

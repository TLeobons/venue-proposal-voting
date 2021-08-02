import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useAppDispatch } from '../app/hooks'
import { addUser } from '../features/venueSlice'


function AddUserDialog({ open, handleClose }) {

    const [name, setName] = useState('')

    const dispatch = useAppDispatch()

    const addNewUser = () => {
        dispatch(addUser(name))
        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Participant</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Participant Name"
                        type="name"
                        fullWidth
                        onChange={(e) => { setName(e.target.value) }}
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={name.length < 3} onClick={addNewUser} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddUserDialog

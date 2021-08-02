import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { fetchData, addUserData, addVenueData, castVote } from './venuesAPI'

export interface CounterState {
  venues: Array<any>
  users: Array<any>
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
  venues: [],
  users: [],
  status: 'idle',
}

export const getData = createAsyncThunk(
  'data/getData',
  async () => {
    const response = await fetchData()

    return response
  }
)

export const addUser = createAsyncThunk(
  'data/addUser',
  async (user) => {
    const response = await addUserData(user)

    return response
  }
)

export const addVenue = createAsyncThunk(
  'data/addVenue',
  async (venue) => {
    const response = await addVenueData(venue)

    return response
  }
)

export const castNewVote = createAsyncThunk(
  'data/castNewVote',
  async (vote) => {
    const response = await castVote(vote)

    return response
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action?.payload?.users || []
        state.venues = action?.payload?.venues || []
      })
      .addCase(addUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action?.payload || []
      })
      .addCase(addVenue.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addVenue.fulfilled, (state, action) => {
        state.status = 'idle'
        state.venues = action?.payload || []
      })
      .addCase(castNewVote.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(castNewVote.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action?.payload || []
      })
  },
})

export const selectCount = (state: RootState) => state.counter

export default counterSlice.reducer

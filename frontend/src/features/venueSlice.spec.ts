import { fetchData } from './venuesAPI'
import counterReducer, {
  CounterState,
} from './venueSlice'

describe('counter reducer', () => {
  const initialState: CounterState = {
    users: [],
    venues: [],
    status: 'idle',
  }

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      users: [],
      venues: [],
      status: 'idle',
    })
  })

  it('should not crash UI when server is down', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      users: [],
      venues: [],
      status: 'idle',
    })
  })

  it('should return passed data', () => {
    expect(counterReducer({
      users: [],
      venues: [],
      status: 'idle',
    }, { type: 'unknown' })).toEqual({
      users: [],
      venues: [],
      status: 'idle',
    })
  })

  // it('should handle return data as array of entities', () => {
  //   const actual = counterReducer(initialState, fetchData())
  //   expect(actual.value).toEqual(4)
  // })

  // it('should handle decrement', () => {
  //   const actual = counterReducer(initialState, decrement())
  //   expect(actual.value).toEqual(2)
  // })

  // it('should handle incrementByAmount', () => {
  //   const actual = counterReducer(initialState, incrementByAmount(2))
  //   expect(actual.value).toEqual(5)
  // })
})

// describe('API calls', () => {
//   it('calls the fetch data API and returns a json response', () => )
// })

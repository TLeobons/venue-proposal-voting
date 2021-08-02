// A mock function to mimic making an async request for data

import { toast } from "react-toastify"

const API_URL = 'http://localhost:5000'

export async function fetchData() {
  let response

  try {
    response = await fetch(`${API_URL}/getallusersandvenue`)
    response = await response.json()
  }
  catch (error) {
    console.log(error)
  }

  return response
}

export async function addUserData(name) {
  let response

  try {
    response = await fetch(`${API_URL}/senduser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name })
    })
    response = await response.json()
    navigator.clipboard.writeText(`${window.location.href}user/${response[response.length - 1].userid}`)
    toast.success("Success: User added. User's URL copied to clipboard")
  }
  catch (error) {
    console.log(error)
    toast.error("Failed: Unable to add user.")

  }
  return response
}

export async function addVenueData(venueData) {
  let response

  try {
    response = await fetch(`${API_URL}/sendvenue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueData)
    })
    response = await response.json()
    toast.success("Success: Venue added")

  }
  catch (error) {
    console.log(error)
    toast.error("Failed: Unable to add venue.")

  }
  return response
}

export async function castVote(voteData) {
  let response

  try {
    response = await fetch(`${API_URL}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteData)
    })
    response = await response.json()
    if (response.message === 'You already Voted') {
      toast.error(response.message)
    } else {
      toast.success(response.message)
    }

  }
  catch (error) {
    console.log(error)
    toast.error(response.message)

  }
  return response.users
}
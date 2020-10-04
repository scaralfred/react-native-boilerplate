// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://jsonplaceholder.typicode.com/posts') => {
  // ------
  // STEP 1
  // ------
  //
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  const getPosts = () => api.get('posts')
  //   const getRate = () => api.get('rate_limit')
  //   const getUser = (username) => api.get('search/users', {q: username})

  // ------
  // STEP 3
  // ------
  //
  return {
    // a list of the API functions from step 2
    getPosts
  }
}

// let's return back our create method as the default.
export default {
  create
}
export function fetchTop () {
  const endpoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/topstories.json')

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data.splice(0, 30))
  
}

export function fetchNew () {
  const endpoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/newstories.json')

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data.splice(0, 30))
  
}

export function fetchItemData (arr) {
      return Promise.all(
      arr.map((itemID) => {
        let items = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`)
        return fetch(items)
                .then((res) => res.json())
      }))
    }
    
export function fetchUser (user) {
  return (fetch(`https://hacker-news.firebaseio.com/v0/user/${user}.json`)
  .then((res) => res.json()))
}

export function fetchItemDataWithPosts (arr) {
  return Promise.all(
  arr.splice(0, 150).map((itemID) => {
    let items = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`)
    return fetch(items)
            .then((res) => res.json())
  })
  ).then((res) => res.filter(({ type }) => (type === "story")))
  .then((res) => res.filter(({ deleted }) => (deleted !== true)))
  .then((res) => res.filter(({ dead }) => (dead !== true)).splice(0, 30))
}

export function fetchComments (arr) {
  return Promise.all(arr.map((commentID) => {
    let comment = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`)
    return fetch(comment)
            .then((res) => res.json())
  })
  ).then((res) => res.filter(({ deleted }) => (deleted !== true)))
  .then((res) => res.filter(({ dead }) => (dead !== true)).splice(0, 30))
}

/* 
const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

function removeDead (posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted (posts) {
  return posts.filter(({ deleted }) => deleted !== true)
}

function onlyComments (posts) {
  return posts.filter(({ type }) => type === 'comment')
}

function onlyPosts (posts) {
  return posts.filter(({ type }) => type === 'story')
}

export function fetchItem (id) {
  return fetch(`${api}/item/${id}${json}`)
    .then((res) => res.json())
}

export function fetchComments (ids) {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

export function fetchMainPosts (type) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`)
      }

      return ids.slice(0, 20)
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
}

export function fetchUser (id) {
  return fetch(`${api}/user/${id}${json}`)
    .then((res) => res.json())
}

export function fetchPosts (ids) {
  return Promise.all(ids.map(fetchItem))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
} */
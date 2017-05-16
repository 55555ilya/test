import {API_BASE_URL} from '../constants/api.js'
import fetch from 'isomorphic-fetch';

export function login(username, password) {
  return fetch(
    API_BASE_URL + `/auth`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
  )
}

export function addCategory(title, token) {
  return fetch(
    API_BASE_URL + '/categories',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'API-Token': token
      },
      body: JSON.stringify({ title: title })
    })
}

export function removeCategory(category_id, token) {
  return fetch(
    API_BASE_URL + '/categories/' + category_id,
    {
      method: "DELETE",
      headers: {
        'API-Token': token
      }
    })
}

export function updateCategory(category_id, title, token) {
  return fetch(
    API_BASE_URL + '/categories/' + category_id,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'API-Token': token
      },
      body: JSON.stringify({ title })
    })
}

export function addItem(category_id, text, token) {
  return fetch(
    API_BASE_URL + '/categories/'+category_id+'/items',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'API-Token': token
      },
      body: JSON.stringify({ title: text })
    })
}

export function removeItem(category_id, item_id, token) {
  return fetch(
    API_BASE_URL + '/categories/'+category_id+'/items/'+item_id,
    {
      method: "DELETE",
      headers: {
        'API-Token': token
      }
    })
}

export function updateItem(category_id, item_id, title, token) {
  return fetch(
    API_BASE_URL + '/categories/'+category_id+'/items/'+item_id,
    {
      method: "PUT",
      headers: {
        'API-Token': token
      },
      body: JSON.stringify({ category_id, item_id, title, token })
    })
}

export function fetchData(token) {
  return fetch(
    API_BASE_URL + `/categories`,
    {
      method: "GET",
      headers: {
        'API-Token': token
      }
    })
}
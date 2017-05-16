import { hashHistory } from 'react-router';
import * as cookies from './cookies'

export function toRoot() {
  hashHistory.push('/')
}

export function toLogin() {
  cookies.removeCookie('token');
  hashHistory.push('/login')
}

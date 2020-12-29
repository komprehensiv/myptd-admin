import jwt_decode from 'jwt-decode';
import get from 'lodash/get';
import { isFalsy } from './is-falsy';

export const checkAuthentication = (newToken = null) => {
    const token = localStorage.getItem('token');
    
    // no token in local storage.  Unauthenticated.
    if (!token && !newToken) return false;
    const currentToken = isFalsy(token) ? newToken : token;

    const decoded = jwt_decode(currentToken);
    const expInSeconds = get(decoded, 'exp') * 1000;
    const currentTime = Date.now();
    const expired = currentTime > expInSeconds;

    // token expired.  Unauthenticated.
    if (expired) {
        localStorage.removeItem('token');
        return false;
    }

    // token is new.  Set it
    if(newToken && !token) {
        localStorage.setItem('token', currentToken);
    }

    return true;
}
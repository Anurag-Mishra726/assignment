import api from '../utils/api';

export const loginApi = (data) => {
    return api.post('/auth/login', data);
}

export const signupApi = (data) => {
    return api.post('/auth/register', data);
}

export const me = () => {
    return api.get('/auth/me');
}

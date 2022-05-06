import React from 'react';
import {useHistory} from 'react-router-dom';
import Routes from './routes';
import './index.css';
import 'tailwindcss/tailwind.css';
import {AuthAxios, ProductsAxios, UsersAxios} from './lib';
import {useDispatch} from 'react-redux';
import {logoutAction} from './actions';

const App: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    AuthAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        (err) => {
            if (err.response.status === 500) {
                history.push('/500');
            } else if (err.response.data.message === 'Email was not found') {
                return Promise.reject(err);
            } else if (err.response.status === 404) {
                history.push('/404');
            } else if (err.response.data.error === 'jwt expired') {
                dispatch(logoutAction());
            } else if (err.response.data.data && err.response.data.data.message === 'Invalid admin Token') {
                dispatch(logoutAction());
            } else if (err.response.status === 401) {
                history.push('/sign-in');
            }
            return Promise.reject(err);
        }
    );
    UsersAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        (err) => {
            if (err.response.status === 500) {
                if (err.response.data.error === 'jwt expired') {
                    dispatch(logoutAction());
                }
                return Promise.reject(err);
            } else if (err.response.status === 404) {
                history.push('/404');
            } else if (err.response.status === 401) {
                history.push('/sign-in');
            }
            return Promise.reject(err);
        }
    );

    ProductsAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        (err) => {
            if (err.response.status === 500) {
                if (err.response.data.error === 'jwt expired') {
                    dispatch(logoutAction());
                }
                return Promise.reject(err);
            } else if (err.response.status === 404) {
                history.push('/404');
            } else if (err.response.status === 401) {
                history.push('/sign-in');
            }
            return Promise.reject(err);
        }
    );

    return <Routes/>;
};

export default App;

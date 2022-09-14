import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../reducers';
import { AuthAxios, UsersAxios, ProductsAxios, UtilsAxios, AdminAxios, UsersFromExcelAxios } from '../lib';
import { MainLayout } from '../components';
import { IRoutesConfiguration } from "./index";


const RouteWrapper: React.FC<IRoutesConfiguration> = (props) => {
    const { component } = props;
    const state = useSelector((state: AppState) => state.auth);
    const {
        isAuthenticated,
        user: { token },
    } = state;
    AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    AuthAxios.defaults.headers.common['Accept'] = 'application/json';
    UsersAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    UsersFromExcelAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    UsersAxios.defaults.headers.common['Accept'] = 'application/json';
    UsersFromExcelAxios.defaults.headers.common['Accept'] = 'form-data';
    ProductsAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    ProductsAxios.defaults.headers.common['Accept'] = 'application/json';
    UtilsAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    UtilsAxios.defaults.headers.common['Accept'] = 'application/json';
    AdminAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    AdminAxios.defaults.headers.common['Accept'] = 'application/json';

    if (props.path === '/sign-in' && !isAuthenticated) {
        return <Route {...props} component={component} />;
    }
    if (!isAuthenticated) {
        return <Redirect to="/sign-in" />;
    } else if (props.path === '/sign-in' && isAuthenticated) {
        return <Redirect to="/" />;
    } else {
        return (
            <MainLayout {...props}>
                <Route {...props} component={component} />
            </MainLayout>
        );
    }
};

export default RouteWrapper;

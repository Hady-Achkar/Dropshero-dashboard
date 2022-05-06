import {AuthActions, authState} from '../types';
import {AdminAxios, AuthAxios, ProductsAxios, UsersAxios, UtilsAxios} from '../lib';

const initState: authState = {
    isAuthenticated: false,
    user: {
        token: '',
        fullName: '',
        email: '',
        _id: '',
        role: 'normal',
        image: ''
    },
};
const authReducer = (state: authState = initState, action: AuthActions) => {
    switch (action.type) {
        case 'LOGIN':
            AuthAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token;
            AuthAxios.defaults.headers.common['Accept'] = 'application/json';

            UsersAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token;
            UsersAxios.defaults.headers.common['Accept'] = 'application/json';
            ProductsAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token;
            ProductsAxios.defaults.headers.common['Accept'] = 'application/json';
            UtilsAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token;
            UtilsAxios.defaults.headers.common['Accept'] = 'application/json';
            AdminAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token;
            AdminAxios.defaults.headers.common['Accept'] = 'application/json';
            return {
                ...state,
                isAuthenticated: true,
                user: action.user_info,
            };
        case 'LOGOUT':
            return initState;
        case 'EDIT_PROFILE':
            return {
                ...state,
                user: {
                    ...state.user,
                    fullName: action?.payload.fullName.split(' ')
                        .map((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
                        .join(' '),
                    image: action.payload?.image
                }
            };
        default:
            return state;
    }
};

export default authReducer;

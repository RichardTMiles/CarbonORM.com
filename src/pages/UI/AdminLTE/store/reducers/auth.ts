// import {GoogleProvider} from 'utils/oidc-providers';
import {createSlice} from '@reduxjs/toolkit';
import {User} from 'oidc-client-ts';

export interface AuthState {
    authentication?: User
}

const initialState: AuthState = {
    authentication: {
        // @ts-ignore
        profile: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            picture: 'https://picsum.photos/200'
        }
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthentication: (state: any, {payload}: any) => {

            console.log('setAuthentication', state, payload)

            state.authentication = payload;

        }
    }
});

export const {setAuthentication} = authSlice.actions;

export default authSlice.reducer;

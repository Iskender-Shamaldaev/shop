import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {GlobalError, RegisterMutation, RegisterResponse, ValidationError} from '../../type';
import {isAxiosError} from "axios";


export const register = createAsyncThunk<
    RegisterResponse,
    RegisterMutation,
    { rejectValue: ValidationError }
>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    }
);

export const login = createAsyncThunk<
    RegisterResponse,
    RegisterMutation,
    { rejectValue: GlobalError }
>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    }
);

// export const logout = createAsyncThunk(
//   'users/logout',
//   async (_, {dispatch}) => {
//     await axiosApi.delete('users/sessions');
//     dispatch(unsetUser());
//   }
// );

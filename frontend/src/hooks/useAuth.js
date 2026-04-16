import {useMutation, useQuery} from '@tanstack/react-query';
import {loginApi, signupApi, me} from '../api/auth.api';

export const useLogin = () => {
    return useMutation({
        mutationFn: loginApi,
    });
}

export const useSignup = () => {
    return useMutation({
        mutationFn: signupApi,
    });
}

export const aboutMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: me,
        staleTime: 1000 * 60 * 5, 
    })
}
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../config/axios';
import {
    Stack,
    TextField,
    IconButton,
    InputAdornment,

} from '@material-ui/core';


import { LoadingButton } from '@material-ui/lab';





export default function UserLogin() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),

    });

    const formik = useFormik({
        initialValues: {

            'email': '',
            'password': '',

        },
        validationSchema: LoginSchema,
        onSubmit: () => {

            axiosRequest.post('login', { ...values }).then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                navigate('/');
            }).catch(err => {
                console.log(err);
            });
        }
    });

    const { errors, touched, values, handleSubmit, getFieldProps } = formik;


    return (

        <>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

            </Stack>
            <FormikProvider value={formik}>
                <Form autoComplete="on" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>

                        <TextField
                            fullWidth
                            autoComplete="email"
                            type="email"
                            label="Email"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            autoComplete="current-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            {...getFieldProps('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

                    </Stack>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Login
                    </LoadingButton>
                </Form>
            </FormikProvider>
        </>
    );
}

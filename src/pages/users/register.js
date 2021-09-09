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
    Button
} from '@material-ui/core';


import { LoadingButton } from '@material-ui/lab';





export default function createUsers() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    // Image Use State
    const [currentFile, setCurrentFile] = useState();

    const [previewImage, setPreviewImage] = useState();



    const selectFile = async (event) => {
        await setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }


    const LoginSchema = Yup.object().shape({
        name: Yup.string().required(' Name is required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),

    });

    const formik = useFormik({
        initialValues: {
            'name': '',
            'email': '',
            'password': '',
            'password_confirmation': ''
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            let formData = new FormData();
            formData.append("avatar", currentFile);
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("password_confirmation", values.password_confirmation);
            console.log(formData, currentFile, previewImage);
            axiosRequest.post('register', formData).then(res => {
                navigate('/login');
            }).catch(err => {
                console.log(err);
            });
        }
    });

    const { errors, touched, values, handleSubmit, getFieldProps } = formik;

    return (

        <>
            {/* <IconButton color="primary" onClick={e => { navigate(-1) }}>
                <KeyboardBackspaceIcon></KeyboardBackspaceIcon> BACK
            </IconButton> */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

            </Stack>
            <FormikProvider value={formik}>
                <Form autoComplete="on" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            autoComplete="name"
                            type="text"
                            label="Name"
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && (errors.name ? errors.name : '')}
                        />
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

                        <TextField
                            fullWidth
                            autoComplete="password-confirmation"
                            type={showPassword ? 'text' : 'password'}
                            label="Password Confirmation"
                            {...getFieldProps('password_confirmation')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                            helperText={touched.password_confirmation && errors.password_confirmation}
                        />

                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                        <div className="mg20"
                            style={{ width: '100%' }}>
                            <label htmlFor="btn-upload"
                                style={{ width: '100%' }}>
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    accept="image/*"
                                    onChange={selectFile} />
                                <Button
                                    className="btn-choose"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    component="span"
                                    onClick={e => { selectFile }}
                                >
                                    Select Profile Picture
                                </Button>
                            </label>
                            <div className="file-name">
                                {currentFile ? currentFile.name : null}
                            </div>
                            {previewImage && (
                                <div>
                                    <img className="preview my10" src={previewImage} alt="" />
                                </div>
                            )}
                        </div>
                    </Stack>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Create
                    </LoadingButton>
                </Form>
            </FormikProvider>
        </>
    );
}

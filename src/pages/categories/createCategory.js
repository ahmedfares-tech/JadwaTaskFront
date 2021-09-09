/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../config/axios';
import {
    Stack,
    TextField,
    Button,
    IconButton
} from '@material-ui/core';
import SelectSearch from 'react-select-search';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { LoadingButton } from '@material-ui/lab';

import './style.css';



export default function createUsers() {
    const navigate = useNavigate();
    const [categoryFilter, setCategoryFilter] = useState()
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // Image Use State
    const [currentFile, setCurrentFile] = useState();
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        axiosRequest.get(`categories?q=${categoryFilter}`).then(res => {
            console.log(res);
            setCategories(res.data.categories.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [isLoading, categoryFilter])



    const selectFile = async (event) => {

        await setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));

    }


    const LoginSchema = Yup.object().shape({
        name: Yup.string().required(' Name is required'),

    });

    const formik = useFormik({
        initialValues: {
            'name': '',
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            let formData = new FormData();
            formData.append("image", currentFile);
            formData.append("name", values.name);
            if (category) formData.append("category", category.value);
            axiosRequest.post('categories', formData).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    });

    const { errors, touched, values, handleSubmit, getFieldProps } = formik;


    if (isLoading) {
        return (<></>);
    }
    return (

        <>
            <IconButton color="primary" onClick={e => { navigate(-1) }}>
                <KeyboardBackspaceIcon size="40px"></KeyboardBackspaceIcon>
            </IconButton>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

            </Stack>
            <FormikProvider value={formik}>
                <Form autoComplete="on" noValidate onSubmit={handleSubmit}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                        <SelectSearch
                            options={categories.map(({ id, name }) => ({ value: id, name: name }))}
                            search
                            // value={choosedRole}
                            allowEmpty={false}
                            value={category}
                            name="category"
                            // required={required}
                            onChange={(event, value) => { setCategory(value) }}
                            placeholder="Parent Category"
                            renderValue={(valueProps) => <input {...valueProps} onInput={(event, value) => { setCategoryFilter(event.target.value) }} className="select-search__input" />}
                        />
                    </Stack>
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
                                    Select Category Picture
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

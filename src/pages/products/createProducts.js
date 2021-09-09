/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import axiosRequest from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import {
    Stack,
    TextField,
    Button,
    FormLabel,
    Radio,
    RadioGroup, FormControlLabel, FormControl, FormHelperText,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    Checkbox,

    Paper, IconButton

} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { LoadingButton } from '@material-ui/lab';

import './style.css';



export default function createProducts() {
    const navigate = useNavigate();
    const [categoryFilter, setCategoryFilter] = useState()
    const [categories, setCategories] = useState([]);
    const [productOptions, setProductOptions] = useState([{
        'optional': false,
        'name': '',
        'value': '',
        'price': 0.0
    }]);
    const [isLoading, setIsLoading] = useState(false);
    // Image Use State
    const [currentFile, setCurrentFile] = useState();
    const [previewImage, setPreviewImage] = useState();
    useEffect(() => {
        axiosRequest.get(`categories?q=${categoryFilter ?? ''}`).then(res => {
            // console.log(res);
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
        category: Yup.number().required('Category Is Required').min(1, 'Category Is Required'),
        price: Yup.number().required('Price Is Required').min(0, 'Price Is Required')

    });

    const formik = useFormik({
        initialValues: {
            'name': '',
            'category': 0,
            'price': 0
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            let formData = new FormData();
            formData.append("image", currentFile);
            formData.append("name", values.name);
            formData.append('price', values.price);
            // formData.append('category',2);
            if (values.category !== 0) formData.append("category", values.category);
            if (productOptions[0].name.length > 1) formData.append("options", JSON.stringify(productOptions));

            axiosRequest.post('products', formData).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    });

    const { errors, touched, values, handleSubmit, getFieldProps } = formik;

    let changeProductOption = (index, e, check) => {

        let createProductOption = [...productOptions];
        if (check === true) createProductOption[index][e.target.name] = e.target.checked;
        else createProductOption[index][e.target.name] = e.target.value.toLowerCase();
        setProductOptions(createProductOption);
    }

    let newProductOption = () => {
        setProductOptions([...productOptions, {
            'optional': false,
            'name': '',
            'value': '',
            'price': 0.0
        }]);
    }

    let deleteProductOption = (i) => {
        let createProductOption = [...productOptions];
        createProductOption.splice(i, 1);
        setProductOptions(createProductOption)
    }

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
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mx: "auto" }}>
                        <TextField
                            fullWidth
                            autoComplete="category"
                            type="text"
                            id="SearchCategory"
                            label="Category Filter"
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value) }}
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                        <FormControl component="fieldset" error={Boolean(touched.category && errors.category)}>
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup
                                aria-label="Category"
                                {...getFieldProps('category')}
                                name="radio-buttons-group"
                                row
                            >
                                {categories.map((row) => {
                                    return (<FormControlLabel onChange={(e) => { values.category = parseInt(e.target.value) }} key={row.id} value={row.id} control={<Radio />} label={row.name} />);
                                })}

                            </RadioGroup>
                            <FormHelperText>{touched.category && (errors.category ? errors.category : '')}</FormHelperText>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
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

                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                        <TextField
                            fullWidth
                            autoComplete="price"
                            type="number"
                            inputProps={{ min: 0 }}
                            label="price"
                            {...getFieldProps('price')}
                            error={Boolean(touched.price && errors.price)}
                            helperText={touched.price && (errors.price ? errors.price : '')}
                        />
                    </Stack>


                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, mx: 'auto' }} align="center" aria-label="simple table">
                            <TableHead>
                                <TableRow>

                                    <TableCell align="center">Optional</TableCell>
                                    <TableCell align="center">Option Name</TableCell>
                                    <TableCell align="center">Option Value</TableCell>
                                    <TableCell align="center">Option Price</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    productOptions.map((row, index) => {
                                        return (

                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">
                                                    <Checkbox
                                                        checked={row.optional}
                                                        color="primary"
                                                        name="optional"
                                                        onChange={(data) => { changeProductOption(index, data, true) }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center">
                                                    <TextField
                                                        value={row.name}
                                                        type="text"
                                                        label="Option Name"
                                                        name="name"
                                                        onChange={(data) => { changeProductOption(index, data) }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        value={row.value}
                                                        type="text"
                                                        name="value"
                                                        label="Option Value"
                                                        onChange={(data) => { changeProductOption(index, data) }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        value={row.price}
                                                        type="number"
                                                        label="Option Price"
                                                        name="price"
                                                        inputProps={{ min: 0.0 }}
                                                        onChange={(data) => { changeProductOption(index, data) }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="Destroy" onClick={(e) => { deleteProductOption(index) }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>

                                        );
                                    })
                                }
                                <TableRow style={{ width: '100%', mx: 'auto' }}>

                                </TableRow>


                            </TableBody>
                        </Table>
                        <Button color="primary" fullWidth variant="contained" align="center"
                            onClick={(e) => { newProductOption() }}
                        >
                            <AddIcon />
                        </Button>
                    </TableContainer>

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
                                    Select Product Picture
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

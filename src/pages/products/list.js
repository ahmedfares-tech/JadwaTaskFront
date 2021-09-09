/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../config/axios';
import {
    Stack, Grid, Button,
    Paper, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Input
} from '@material-ui/core';
import ProductCard from '../../components/cardDesign';
import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
export default function createProducts() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState()
    const [order, setOrder] = useState('DESC');
    const [filterProduct, setFilterProduct] = useState()
    const [limit, setLimit] = useState(20)
    const navigate = useNavigate();
    useEffect(() => {
        axiosRequest.get(`products?order=${order}&&name=${filterProduct}&&limit=${limit}`).then(res => {
            setProducts(res.data.products.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [isLoading, order, filterProduct, limit]);
    if (isLoading) return (<>Loading....</>)
    return (
        <>
            <Paper elevation={4} style={{ width: '100%' }}>
                <Stack direction="row" alignItems="center" justifyContent="center" >
                    <IconButton color={order ? "primary" : "secondary"} alt="ASC" onClick={(e) => { setOrder('ASC') }}>
                        <ArrowUpwardIcon color={order ? "primary" : "secondary"} /> order
                    </IconButton>
                    <IconButton color={order ? "secondary" : "primary"} alt="order" onClick={(e) => { setOrder('DESC') }}>
                        <ArrowDownwardIcon color={order ? "secondary" : "primary"} /> ASC
                    </IconButton>
                    <TextField
                        id="search"
                        label="search"
                        value={filterProduct}
                        onChange={(e) => { setFilterProduct(e.target.value) }}
                        style={{ margin: 15, padding: 0 }}
                    />
                    <FormControl >
                        <InputLabel htmlFor="Limit">Limit</InputLabel>
                        <Select
                            value={limit}
                            onChange={(e) => { setLimit(e.target.value) }}
                            input={<Input name="Limit" id="Limit" />}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

            </Paper>
            <Stack direction="row" alignItems="right" justifyContent="space-between" sx={{ my: 2 }}>
                <Button variant="contained" color="primary" onClick={(e) => { navigate('/dashboard/products/create') }}>
                    <AddIcon />
                </Button>
            </Stack>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {
                    products.map((row) => {
                        return (
                            <Grid item xs={12} md={6} lg={6}>
                                <ProductCard title={row.name} description={row.description} price={row.price} category={row.category.name} image={row.image} />
                            </Grid>
                        );

                    })
                }
            </Grid>
        </>
    );
}

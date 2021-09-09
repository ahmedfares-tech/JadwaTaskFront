/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';

import axiosRequest from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import {
TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Stack,Button,Paper
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


import './style.css';



export default function createProducts() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axiosRequest.get(`categories`).then(res => {

            setCategories(res.data.categories.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, [isLoading])



    if (isLoading) {
        return (<>Loading .....</>);
    }
    return (

        <>
            <Stack direction="row" alignItems="right" justifyContent="space-between" sx={{ my: 2 }}>
                <Button variant="contained" color="primary" onClick={(e) => { navigate('/dashboard/categories/create') }}>
                    <AddIcon />
                </Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, mx: 'auto' }} align="center" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Parent</TableCell>
                            <TableCell align="center">Total Products</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            categories.map((row, index) => {
                                console.log(row);
                                return (

                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {row.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.parent ?? 'Not Available'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.products_count}
                                        </TableCell>

                                    </TableRow>

                                );
                            })
                        }
                        <TableRow style={{ width: '100%', mx: 'auto' }}>

                        </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

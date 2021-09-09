/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */

import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosRequest from '../../../config/axios';
import {
    Grid,
    Paper,
    Typography,
    Divider, Stack,
    FormLabel,
    FormControlLabel, FormControl,
    Checkbox,
    Select,
    MenuItem, IconButton,
    Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


export default function LandShow() {
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams();
    const [product, setProduct] = useState()
    const [option, setOption] = useState()
    const [choosedOptions, setChoosedOptions] = useState({});
    const [qty, setQty] = useState(1)
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        axiosRequest.get(`products/${id}`).then(res => {

            setProduct(res.data.product);
            setTotal(res.data.product.price);
            setOption(res.data.options);
            setIsLoading(false);

        }).catch(err => {


        })
    }, [isLoading]);

    useEffect(() => {
        //     changeTotal();
        //     changeTotal();
        axiosRequest.post('products/calculation', {
            options: choosedOptions,
            qty: qty,
            productID: id
        }).then(res => {
            setTotal(res.data.total)
        }).catch(err => {
            console.log(err);
        })
    }, [qty, choosedOptions]);
    const addToCart = () => {
        if (localStorage.getItem('token')) {
            axiosRequest.post('products/cart', {
                options: choosedOptions,
                qty: qty,
                productID: id
            }).then(res => {
                navigate(-1);
            }).catch(err => {
                console.log(err);
            })
        }else{
            navigate('/login');
        }
    }
    const resetTotal = async () => {
        return await setTotal(0);

    }
    const optionsPrice = async (element) => {
        return await setTotal(parseFloat(total) + parseFloat(element.price))

    }
    const changeTotal = () => {
        resetTotal().then(res => {

            if (product) {
                let TotalQty = (parseFloat(product.price) * parseInt(qty));
                setTotal(TotalQty);
                [option].map((main) => {
                    Object.keys(choosedOptions).forEach(key => {
                        if (main[key] && key) {
                            main[key].map((element) => {
                                if (element.id === choosedOptions[key]) {
                                    optionsPrice(element).then(res => {
                                        setTotal(TotalQty + parseFloat(element.price))
                                    });

                                };
                            });
                        }
                        else {
                            Object.values(choosedOptions).forEach(value => {
                                if (value && main[value]) {
                                    main[value].map((element) => {
                                        if (parseInt(element.id) === parseInt(key)) {
                                            optionsPrice(element).then(res => {
                                                setTotal(TotalQty + parseFloat(element.price))
                                            });
                                        }
                                    })
                                }
                            })

                        }
                    });
                    return 0;
                })

            }
        })
        // console.log(Object.values(choosedOptions));
    }
    const manageOption = async (e) => {

        const { name, value } = e.target;
        const OptionData = option[name][value];
        await setChoosedOptions({ ...choosedOptions, [`${name}`]: OptionData.id });

    }
    const manageOptionOptional = async (e, data, index) => {

        const { name, value, checked } = e.target;
        if (checked === true) await setChoosedOptions({ ...choosedOptions, [`${name}`]: parseInt(value) });
        else await setChoosedOptions({ ...choosedOptions, [`${name}`]: undefined });
    }


    if (isLoading) return (<>Loading....</>)
    return (
        <>
            <Paper style={{ width: '100%' }}>
                <Grid
                    container
                    direction="row"
                    alignItems="left"

                >
                    <Grid item xs={12} md={6} lg={4}>
                        <img src="http://127.0.0.1:8000/storage/products/1/163102821414.PNG" alt="test For Now" style={{ height: '500px' }} />
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>

                        <Typography gutterBottom variant="h5" component="h2" align="center" >
                            {product.name}
                        </Typography>
                        <Divider />
                        <Typography gutterBottom variant="h6" component="h6" align="center" >
                            {product.description}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" align="center" color="secondary">
                            {total} LE
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} style={{ zIndex: 0 }}>
                            <IconButton aria-label="qty+" onClick={(e) => { setQty(qty + 1); }} color="secondary" style={{ border: '4px solid' }}>
                                <AddIcon />
                            </IconButton>
                            {qty}
                            <IconButton aria-label="qty-" onClick={(e) => { if (qty !== 1) setQty(qty - 1); }} color="secondary" style={{ border: '4px solid' }}>
                                <RemoveIcon />
                            </IconButton>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} style={{ zIndex: 0 }}>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                            <FormControl component="fieldset">
                                {
                                    option ?
                                        <>
                                            {
                                                Object.keys(option).map((index) => {
                                                    return (<div key={index}>
                                                        <FormLabel component="legend" color="secondary">{index}</FormLabel>
                                                        {!option[index][0].optional ?



                                                            <FormControl required>
                                                                <Select
                                                                    labelId={index}
                                                                    id={index}
                                                                    name={index}
                                                                    onChange={(e) => { manageOption(e); }}
                                                                    defaultValue="default"
                                                                >
                                                                    <MenuItem value="default" disabled>
                                                                        choose {index}
                                                                    </MenuItem>
                                                                    {option[index].map((row, pos) => {
                                                                        return (<MenuItem key={row.id} value={pos}>{row.value} - {row.price} LE</MenuItem>);
                                                                    })}

                                                                </Select>
                                                            </FormControl>




                                                            : ''
                                                        }
                                                        {
                                                            option[index].map((element, pos) => {
                                                                if (element.optional) {
                                                                    return (
                                                                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

                                                                            <FormControlLabel
                                                                                key={element.id}
                                                                                control={<Checkbox name={element.value} />}
                                                                                label={element.value}
                                                                                name={index}
                                                                                value={element.id}
                                                                                onChange={(e) => { manageOptionOptional(e, element, index); }}
                                                                            />


                                                                            {element.price !== 0 ? element.price : ''} LE

                                                                        </Stack>

                                                                    );
                                                                }
                                                                return (
                                                                    <></>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                    )
                                                })
                                            }
                                        </>
                                        : ''
                                }

                            </FormControl>
                        </Stack>



                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={(e) => { addToCart() }}
                        >
                            Add To Cart
                        </Button>


                    </Grid>
                </Grid>

            </Paper>
        </>
    );
}

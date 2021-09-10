


// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { ButtonBase, Stack, AppBar, Toolbar, Typography } from '@material-ui/core';
// components

import Globals from '../../config/global';

import { useNavigate } from 'react-router-dom';

//

// ----------------------------------------------------------------------


const APPBAR_MOBILE = [Globals.APPBAR_MOBILE];
const APPBAR_DESKTOP = [Globals.APPBAR_DESKTOP];
const RootStyle = styled(AppBar)(({ theme, properties }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    //   backgroundColor: alpha(theme.palette.background.default, 0.72),

    [theme.breakpoints.up('lg')]: {
        width: '100%',
        zIndex: '99999'
        // width: `100%`
    }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5),
        // [Globals.marginRight]: `auto`,
    }
}));

// ----------------------------------------------------------------------

export default function DashboardNavbar({ ...props }) {
    const navigate = useNavigate();
    return (
        <RootStyle>
            <ToolbarStyle>

                <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <ButtonBase onClick={(e) => { navigate('/') }}>
                        <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                            Home
                        </Typography>
                    </ButtonBase>
                    {localStorage.getItem('role') === 'admin' ?
                        <ButtonBase onClick={(e) => { navigate('/dashboard') }}>
                            <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                                Dashboard
                            </Typography>
                        </ButtonBase>
                        : <></>}
                    {localStorage.getItem('token') ?
                        <></>
                        : <>
                            <ButtonBase onClick={(e) => { navigate('/login') }}>
                                <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                                    Login
                                </Typography>
                            </ButtonBase>
                            <ButtonBase onClick={(e) => { navigate('/register') }}>
                                <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                                    Register
                                </Typography>
                            </ButtonBase>
                        </>}
                </Stack>


            </ToolbarStyle>
        </RootStyle>
    );
}

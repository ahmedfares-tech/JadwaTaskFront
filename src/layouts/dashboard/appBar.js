import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { ButtonBase, Stack, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
// components
import { MHidden } from '../../components/@material-extend';
import Globals from '../../config/global';
import { useNavigate } from 'react-router-dom';


//

// ----------------------------------------------------------------------

// const DRAWER_WIDTH = 280;

const APPBAR_MOBILE = [Globals.APPBAR_MOBILE];
const APPBAR_DESKTOP = [Globals.APPBAR_DESKTOP];
const RootStyle = styled(AppBar)(({ theme, properties }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    //   backgroundColor: alpha(theme.palette.background.default, 0.72),
    marginLeft: [Globals.DRAWER_WIDTH],

    [theme.breakpoints.up('lg')]: {
        // width: `calc(100% - ${[Globals.DRAWER_WIDTH]}px)`,
        // marginLeft: `${[Globals.DRAWER_WIDTH]}px`,
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

DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar, ...props }) {
    const navigate = useNavigate();
    return (
        <RootStyle>
            <ToolbarStyle>
                <MHidden width="lgUp">
                    <IconButton onClick={onOpenSidebar} sx={{ ml: 1, color: 'text.primary' }}>
                        <Icon icon={menu2Fill} />
                    </IconButton>
                </MHidden>
                <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <ButtonBase onClick={(e) => { navigate('/dashboard') }}>
                        <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                            Home
                        </Typography>
                    </ButtonBase>
                </Stack>
                





            </ToolbarStyle>
        </RootStyle>
    );
}

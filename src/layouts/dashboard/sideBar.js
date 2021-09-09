/* eslint-disable */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@material-ui/core';
// components

import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import Globals from '../../config/global';
import { useTheme } from 'styled-components';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = [Globals.DRAWER_WIDTH];

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH,
        // backgroundColor: theme.palette.default
    }
}));

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
      borderRadius: theme.shape.borderRadiusSm,
    //   backgroundColor: theme.palette.default
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};
//esline-disable-next-line
export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar, ...props }) {
    const { pathname } = useLocation();
    // const theme = useTheme();
    
    useEffect(() => {
        if (isOpenSidebar) {
            //esline-disable-next-line
            onCloseSidebar();
        }
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
            }}
        >
    

            <Box sx={{ mb: 10, mx: 2.5 }}>
                {/* <Link underline="none" component={RouterLink} to="#">
                    <AccountStyle>

                        <Avatar src={localStorage.getItem('avatar')} alt="photoURL" />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'primary' }}>

                                {localStorage.getItem('name')}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'secondary' }}>

                                {localStorage.getItem('role')}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Link> */}
            </Box>

            <NavSection navConfig={sidebarConfig} />

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <RootStyle>
            <MHidden width="lgUp">
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>

            <MHidden width="lgDown">
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            // backgroundColor: theme
                            // color:"primary"
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
        </RootStyle>
    );
}

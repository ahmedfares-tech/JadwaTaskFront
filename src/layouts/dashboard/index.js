import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import DashboardAppBar from './appBar';
import SideBar from './sideBar';
import Globals from '../../config/global';
// import Global from '../../config/global';
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme, properties }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        width: `calc(100% - ${[Globals.DRAWER_WIDTH]}px)`,
        marginLeft: `${[Globals.DRAWER_WIDTH]}px`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    }
}));
export default function DashboardLayout(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <RootStyle>
                <DashboardAppBar onOpenSidebar={() => setOpen(true)} {...props} />
                <SideBar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} {...props} />
                <MainStyle >
                    <Container fixed={true}>
                        <Outlet />
                    </Container>
                </MainStyle>
            </RootStyle>

        </>
    );
}
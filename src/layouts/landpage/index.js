
import { Outlet } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import DashboardAppBar from './appBar';
const APP_BAR_MOBILE = 64;


const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
    width: '100%',
});

const MainStyle = styled('div')(({ theme, properties }) => ({
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    width: '100%',
    margin: 0,
    // padding: 0
}));
export default function DashboardLayout(props) {

    return (
        <>
            <RootStyle>
                <DashboardAppBar  {...props} />
                <MainStyle >
                    <Container style={{ padding: 0, margin: 0, maxWidth: 'none' }} >
                        <Outlet />
                    </Container>
                </MainStyle>
            </RootStyle>

        </>
    );
}
import {AppBar, Container, styled, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar
            position="sticky"
            sx={{
                mb: 2,
                bgcolor: 'black',
                color: 'white',
                boxShadow: '0 2px 10px rgba(255, 0, 0, 0.4)',
            }}
        >
            <Toolbar>
                <Container maxWidth="xl">
                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 700,
                                color: '#ffff',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                '& a': {
                                    color: '#ffff',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: '#fff',
                                    },
                                },
                            }}
                        >
                            <Link to="/">Activity life</Link>
                        </Typography>

                        {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
};


export default AppToolbar;
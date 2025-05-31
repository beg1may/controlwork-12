import {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import {Alert, Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoginError, selectLoginLoading} from "./usersSlice.ts";
import {login} from "./usersThunks.ts";
import {toast} from "react-toastify";
import type {LoginMutation} from "../../types";


const Login = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const loginLoading = useAppSelector(selectLoginLoading);
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginMutation>({
        email: '',
        password: '',
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(login(form)).unwrap();
            navigate("/");
            toast.success("Login successfull");
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            {error && (
                <Alert severity="error">
                    {error.error}
                </Alert>
            )}

            <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid  size={{xs: 12}}>
                        <TextField
                            disabled={loginLoading}
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="family-name"
                            value={form.email}
                            onChange={onInputChange}
                            error={Boolean(error)}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={loginLoading}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={onInputChange}
                            error={Boolean(error)}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={loginLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        bgcolor: 'black',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        '&:hover': {
                            bgcolor: '#b71c1c',
                        },
                    }}
                >
                    Sign In
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid sx={{mx: 'auto'}}>
                        <Link to='/register' variant="body2" component={RouterLink}>
                            Don't have an account, yet? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Login;
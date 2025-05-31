import {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice.ts";
import {register} from "./usersThunks.ts";
import type {RegisterMutation} from "../../types";
import {toast} from "react-toastify";


const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const registerLoading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterMutation>({
        email: '',
        displayName: '',
        password: '',
    });


    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setForm({ ...form, [name]: value });
    };

    const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        try {
            await dispatch(register(form)).unwrap();
            navigate('/');
            toast.success("Registered successfull");
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid  size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="family-name"
                            value={form.email}
                            onChange={onInputChange}
                            helperText={getFieldError('email')}
                            error={Boolean(getFieldError('email'))}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            name="displayName"
                            label="Display Name"
                            type="displayName"
                            id="displayName"
                            autoComplete="family-name"
                            value={form.displayName}
                            onChange={onInputChange}
                            helperText={getFieldError('displayName')}
                            error={Boolean(getFieldError('displayName'))}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={onInputChange}
                            helperText={getFieldError('password')}
                            error={Boolean(getFieldError('password'))}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={registerLoading}
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
                    Sign Up
                </Button>

                <Grid container justifyContent="space-between">
                    <Grid sx={{mx: 'auto'}}>
                        <Link to='/login' variant="body2" component={RouterLink}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Register;
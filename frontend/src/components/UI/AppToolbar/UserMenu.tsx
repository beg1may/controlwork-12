import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {logout} from "../../../features/users/usersThunks.ts";
import {unsetUser} from "../../../features/users/usersSlice.ts";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../../app/hooks.ts";
import type {User} from "../../../types";
import {NavLink} from "react-router-dom";

interface Props {
    user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    }

    const handleClose = () => {
        setUserOptionsEl(null);
    }

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUser());
        handleClose();
        toast.success("Logout successfully");
    };
    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                {user.displayName}
            </Button>
            <Menu
                keepMounted
                anchorEl={userOptionsEl}
                open={Boolean(userOptionsEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>
                    <Button component={NavLink} to='/logout'>Logout</Button>
                </MenuItem>
                <MenuItem>
                    <Button component={NavLink} to='/groups/new' onClick={handleClose}>New group</Button>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
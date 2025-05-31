import {Typography} from "@mui/material";
import GroupFrom from "./components/GroupForm/GroupForm.tsx";
import { useAppDispatch } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type {GroupMutation} from "../../types";
import {createGroup} from "./groupThunks.ts";

const NewGroup = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onCreateNewGroup = async (group: GroupMutation) => {
        try {
            await dispatch(createGroup(group));
            toast.success("Create new group!");
            navigate('/');
        } catch (e) {
            toast.error("Group was not successfully created");
            console.error(e);
        }
    }

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New group
            </Typography>
            <GroupFrom onSubmitGroup={onCreateNewGroup} />
        </>
    );
};

export default NewGroup;
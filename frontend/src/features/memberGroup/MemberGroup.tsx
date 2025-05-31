import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectMemberGroup } from "./memberGroupSlice";
import {useEffect} from "react";
import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import {fetchGroupMembers} from "./memberGroupThunks.ts";
import {selectGroupFetchLoading} from "../group/groupSlice.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const MemberGroup= () => {
    const dispatch = useAppDispatch();
    const members = useAppSelector(selectMemberGroup);
    const loading = useAppSelector(selectGroupFetchLoading);
    const { groupId } = useParams();

    useEffect(() => {
        if(groupId) {
            dispatch(fetchGroupMembers(groupId));
        }
    }, [dispatch, groupId]);

    if (loading) return <Spinner />;

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Group Members</Typography>
            <List>
                {members.map((member) => (
                    <ListItem key={member._id}>
                        <ListItemText primary={member.user.displayName} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default MemberGroup;
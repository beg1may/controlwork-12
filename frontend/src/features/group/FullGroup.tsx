import {Box, Button, CardMedia, Divider, Typography} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {selectGroupFetchLoading, selectOneGroup} from "./groupSlice.ts";
import {useParams } from "react-router-dom";
import {useEffect} from "react";
import {fetchGroupById} from "./groupThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { apiUrl } from "../../../globalConstants.ts";
import Grid from "@mui/material/Grid";
import {
    deleteGroupMember,
    fetchGroupMembers,
    joinMemberGroup,
    leaveMemberGroup
} from "../memberGroup/memberGroupThunks.ts";
import MemberGroup from "../memberGroup/MemberGroup.tsx";
import {selectUser} from "../users/usersSlice.ts";
import {selectMemberGroup} from "../memberGroup/memberGroupSlice.ts";

const FullGroup = () => {
    const dispatch = useAppDispatch();
    const group = useAppSelector(selectOneGroup);
    const fetchLoading = useAppSelector(selectGroupFetchLoading);
    const user = useAppSelector(selectUser);
    const members = useAppSelector(selectMemberGroup);
    const {groupId} = useParams();

    useEffect(() => {
        if(groupId) {
            dispatch(fetchGroupById(groupId));
            dispatch(fetchGroupMembers(groupId));
        }
    }, [dispatch, groupId]);

    const isMember = user && members.some(m => m.user._id === user._id);
    const isOwner = user && group && group.user._id === user._id;

    const handleJoinGroup = async () => {
        if (groupId) {
            try {
                await dispatch(joinMemberGroup(groupId)).unwrap();
                dispatch(fetchGroupMembers(groupId));
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleLeaveGroup = async () => {
        if (groupId) {
            try {
                await dispatch(leaveMemberGroup(groupId)).unwrap();
                dispatch(fetchGroupMembers(groupId));
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleDelete = (userId: string) => {
        if (groupId && userId) {
            dispatch(deleteGroupMember({ groupId, userId }));
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        {fetchLoading ? (
            <Spinner />
        ) : group ? (
            <Grid container spacing={4}>
                <Grid size={{xs:12, md:6}}>
                    <CardMedia
                        component="img"
                        image={apiUrl + '/' + group.image}
                        alt={group.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: '#111' }}>
                        {group.title}
                    </Typography>

                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, color: '#111' }}>
                        Author: {group.user.displayName}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {group.description}
                    </Typography>

                    {!isOwner && (
                        <>
                            {isMember ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleLeaveGroup}
                                >
                                    Выйти из группы
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleJoinGroup}
                                >
                                    Вступить в группу
                                </Button>
                            )}
                        </>
                    )}

                    {(isOwner || isMember) && (
                        <MemberGroup
                            onDeleteMember={isOwner ? handleDelete : undefined}
                        />
                    )}
                </Grid>
                {(isOwner || isMember) && <MemberGroup/>}
            </Grid>
        ) : (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Group not found
            </Typography>
        )}
        </Box>
    );
};

export default FullGroup;
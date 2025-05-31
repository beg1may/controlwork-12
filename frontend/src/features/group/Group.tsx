import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice.ts";
import {selectGroup, selectGroupFetchLoading, selectMyGroup, setMyGroups} from "./groupSlice.ts";
import {useEffect} from "react";
import {fetchAllGroups} from "./groupThunks.ts";
import {Button, Grid, Typography } from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import type {IGroup} from "../../types";
import GroupItem from "./components/GroupItem/GroupItem.tsx";

const Group = () => {
    const dispatch = useAppDispatch();
    const groups = useAppSelector(selectGroup);
    const fetchLoading = useAppSelector(selectGroupFetchLoading);
    const user = useAppSelector(selectUser);
    const myGroups = useAppSelector(selectMyGroup);

    useEffect(() => {
        if (myGroups && user) {
            dispatch(fetchAllGroups({ user: user._id }));
        } else {
            dispatch(fetchAllGroups({}));
        }
    }, [dispatch, myGroups, user]);

    const getVisibleGroup = () => {
        if (myGroups && user) {
            return groups.filter(g => g.user._id === user._id);
        } else {
            return groups.filter(g =>
                g.isPublished || user?.role === 'admin'
            );
        }
    };

    const visibleGroup = getVisibleGroup();

    return (
        <>
            <Grid container spacing={2} sx={{ mt: 4, px: 2 }}>
                <Grid>
                    <Button
                        variant={myGroups ? "contained" : "outlined"}
                        onClick={() => dispatch(setMyGroups(true))}
                        disabled={!user}
                        sx={{
                            bgcolor: myGroups ? "black" : "transparent",
                            color: myGroups ? "white" : "black",
                            borderColor: "black",
                            '&:hover': {
                                bgcolor: myGroups ? "#333" : "rgba(0, 0, 0, 0.04)",
                                borderColor: "black",
                            }
                        }}
                    >
                        My groups
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        variant={!myGroups ? "contained" : "outlined"}
                        onClick={() => dispatch(setMyGroups(false))}
                        sx={{
                            bgcolor: !myGroups ? "black" : "transparent",
                            color: !myGroups ? "white" : "black",
                            borderColor: "black",
                            '&:hover': {
                                bgcolor: !myGroups ? "#333" : "rgba(0, 0, 0, 0.04)",
                                borderColor: "black",
                            }
                        }}
                    >
                        All groups
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 4, px: 2 }}>
                {fetchLoading ? (
                    <Spinner />
                ) : visibleGroup.length === 0 ? (
                    <Typography variant="h6" sx={{ mt: 4, px: 2 }}>
                        {myGroups ? "У вас пока нет групп" : "Группы не найдено"}
                    </Typography>
                ) : (
                    <Grid container spacing={2} sx={{ mt: 4, px: 2 }}>
                        {visibleGroup.map((group: IGroup) => (
                            <Grid size={{xs:6}} key={group._id}>
                                <GroupItem
                                    _id={group._id}
                                    title={group.title}
                                    user={group.user}
                                    image={group.image}
                                    isPublished={group.isPublished}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default Group;
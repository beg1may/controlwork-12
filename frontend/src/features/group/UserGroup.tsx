import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {selectGroup} from "./groupSlice.ts";
import {fetchAllGroups} from "./groupThunks.ts";
import { Typography } from "@mui/material";
import GroupItem from "./components/GroupItem/GroupItem.tsx";

const UserGroup = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const groups = useAppSelector(selectGroup);

    useEffect(() => {
        dispatch(fetchAllGroups({ user: id }));
    }, [dispatch, id]);

    const authorGroups = groups.filter(group => group.user._id === id);
    const authorName = authorGroups[0]?.user.displayName;

    return (
        <>
            <Typography variant="h4" sx={{marginBottom: 3}}>
                {authorName} groups:
            </Typography>

            {authorGroups.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {authorGroups.map(group => (
                        <GroupItem
                            key={group._id}
                            _id={group._id}
                            title={group.title}
                            user={group.user}
                            image={group.image}
                            isPublished={group.isPublished}
                        />
                    ))}
                </div>
            ) : (
                <Typography variant="h6">No groups found for this author</Typography>
            )}
        </>
    );
};

export default UserGroup;
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../../../../globalConstants.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import { selectUser } from "../../../users/usersSlice.ts";
import {fetchAllGroups, groupIsPublished} from "../../groupThunks.ts";
import {NavLink} from "react-router-dom";

interface Props {
    _id: string,
    user: {
        _id: string,
        displayName: string,
    }
    title: string,
    image: File,
    isPublished: boolean,
}

const GroupItem: React.FC<Props> = ({_id, user, title, image, isPublished}) => {
    const currentUser  = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const handlePublish = async (_id: string) => {
        try {
            await dispatch(groupIsPublished(_id)).unwrap();
            dispatch(fetchAllGroups({}));
        } catch (error) {
            console.error('Failed to publish:', error);
        }
    };

    return (
        <Card sx={{
            maxWidth: 345,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative'
        }}>
            <Grid sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <CardMedia
                        component="img"
                        image={`${apiUrl}/${image}`}
                        alt={title}
                        sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                        }}
                    />

                    {!isPublished && user && currentUser?._id === user._id && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                p: 1,
                                borderRadius: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow: 1,
                                maxWidth: '80%',
                                zIndex: 1
                            }}
                        >
                            <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.secondary' }}>
                                На модерации
                            </Typography>
                        </Box>
                    )}
                </Box>
                <CardContent sx={{
                    width: '100%',
                    textAlign: 'left',
                    px: 2,
                    py: 1,
                    '&:last-child': {
                        pb: 1
                    }
                }}>
                    <Button sx={{p:0}} component={NavLink} to={`/groups/${_id}`}>{title}</Button>

                    <Typography variant="h6" component="h2" gutterBottom>
                        Author: {user.displayName}
                    </Typography>
                </CardContent>
                <Box sx={{
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    {!isPublished && currentUser?.role === 'admin' &&
                        (
                            <Button type='submit' onClick={() => handlePublish(_id)}>Опубликовать</Button>
                        )
                    }
                </Box>
            </Grid>
        </Card>
    );
};

export default GroupItem;
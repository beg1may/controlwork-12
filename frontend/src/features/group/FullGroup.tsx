import {Box, Button, CardMedia, Divider, Typography} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {selectGroupFetchLoading, selectOneGroup} from "./groupSlice.ts";
import {useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchGroupById} from "./groupThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { apiUrl } from "../../../globalConstants.ts";
import Grid from "@mui/material/Grid";
import {joinMemberGroup} from "../memberGroup/memberGroupThunks.ts";

const FullGroup = () => {
    const dispatch = useAppDispatch();
    const group = useAppSelector(selectOneGroup);
    const fetchLoading = useAppSelector(selectGroupFetchLoading);
    const [isJoined, setIsJoined] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        if(id) {
            dispatch(fetchGroupById(id));
        }
    }, [dispatch, id]);

    const handleJoinGroup = async () => {
        if (id) {
            try {
                await dispatch(joinMemberGroup(id)).unwrap();
                setIsJoined(true);
            } catch (e) {
                console.error(e);
            }
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

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isJoined}
                        onClick={handleJoinGroup}
                    >
                        {isJoined ? "Вы уже в группе" : "Вступить в группу"}
                    </Button>
                </Grid>
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
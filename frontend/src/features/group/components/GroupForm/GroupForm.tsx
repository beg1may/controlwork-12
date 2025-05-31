import {Button, Grid, TextField, Typography} from "@mui/material";
import type {GroupMutation} from "../../../../types";
import { useState } from "react";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";

interface Props {
    onSubmitGroup: (group: GroupMutation) => void;
}

const initial = {
    title: '',
    description: '',
    image: null,
}

const GroupFrom: React.FC<Props> = ({onSubmitGroup}) => {
    const [form, setForm] = useState<GroupMutation>(initial);
    const [imageError, setImageError] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.image) {
            setImageError(true);
            return;
        }

        setImageError(false);
        onSubmitGroup({...form});
        setForm(initial);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onChangeInput}
                        required
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        multiline rows={3}
                        id="description"
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={onChangeInput}
                        required
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    />
                    {imageError && (
                        <Typography variant="body2" color="error" sx={{mt: 1}}>
                            Пожалуйста, выберите изображение
                        </Typography>
                    )}
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button
                        style={{
                            width: '100%',
                            backgroundColor: 'black',
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}
                        type="submit"
                        variant="contained"
                    >
                        Create group
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default GroupFrom;
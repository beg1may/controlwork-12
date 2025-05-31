import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import config from "./config";
import usersRouter from "./routers/users";
import cookieParser from 'cookie-parser';
import groupRouter from "./routers/groups";
import membersGroupRouter from "./routers/memberGroup";

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(cookieParser())
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/groups', groupRouter);
app.use('/members', membersGroupRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);


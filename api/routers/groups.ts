import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";
import {Error} from "mongoose";
import Group from "../models/Group";
import permit from "../middleware/permit";

const groupRouter = express.Router();

groupRouter.get("/", async (req, res, next) => {
    try {
        const user_id = req.query.user as string
        const filter: {user?: string} = {};

        if (user_id) filter.user = user_id;

        const groups = await Group.find(filter).populate("user", "displayName");
        res.send(groups);
    } catch (error) {
        next(error);
    }
});

groupRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const groups = await Group.findById(id).populate("user", "displayName");
        res.send(groups);
    } catch (error) {
        next(error);
    }
});

groupRouter.post("/", auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const group = new Group({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await group.save();
        res.send(group);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

groupRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).send({ message: 'Group id must be in req params' });
            return;
        }

        const group = await Group.findById(id);

        if (!group) {
            res.status(404).send({ message: 'Group not found' });
            return;
        }

        group.isPublished = !group.isPublished;

        await group.save();
        res.send(group);

    } catch (error) {
        next(error);
    }
})

export default groupRouter;
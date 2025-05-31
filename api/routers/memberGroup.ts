import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import MemberGroup from "../models/MemberGroup";
import Group from "../models/Group";

const membersGroupRouter = express.Router();

membersGroupRouter.post("/join/:groupId", auth, async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const user = (req as RequestWithUser).user;

        const group = await Group.findById(groupId);
        if (!group) {
            res.status(404).send({ message: "Group not found" });
            return;
        }

        const memberGroup = await MemberGroup.findOne({ group: groupId, user: user._id });
        if (memberGroup) {
            res.status(400).send({ message: "You are already a member of this group" });
            return;
        }

        const member = new MemberGroup({
            user: user._id,
            group: groupId,
        });

        await member.save();
        res.send(member);
    } catch (e) {
        next(e);
    }
});

membersGroupRouter.delete("/leave/:groupId", auth, async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const user = (req as RequestWithUser).user;

        await MemberGroup.deleteOne({ group: groupId, user: user._id });

        res.send({ message: "Group deleted successfully" });
    } catch (e) {
        next(e);
    }
});

membersGroupRouter.get("/:groupId", auth, async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const memberGroup = await MemberGroup.find({group: groupId}).populate("user", "displayName");

        res.send(memberGroup);
    } catch (e) {
        next(e);
    }
});

membersGroupRouter.get("/", auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const myGroups = await MemberGroup.find({ user: user._id }).populate("group", "title");
        res.send(myGroups);
    } catch (e) {
        next(e);
    }
});

membersGroupRouter.delete("/:groupId/:userId", auth, async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;
        const user = (req as RequestWithUser).user;

        const group = await Group.findById(groupId);
        if (!group) {
            res.status(404).send({ message: "Group not found" });
            return;
        }

        if (group.user.toString() !== user._id.toString()) {
            res.status(403).send({ message: "Not authorized" });
            return;
        }

        await MemberGroup.deleteOne({ group: groupId, user: userId });
        res.send({ message: "Member removed successfully" });
    } catch (error) {
        next(error);
    }
})

export default membersGroupRouter;
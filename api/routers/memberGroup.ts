import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import MemberGroup from "../models/MemberGroup";
import Group from "../models/Group";

const membersGroupRouter = express.Router();

membersGroupRouter.post("/join/:groupId", auth, async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const user = (req as RequestWithUser).user;

        const group = await Group.findById(groupId);
        if (!group) {
            res.status(404).send({ message: "Group not found" });
            return;
        }

        const member = new MemberGroup({
            user: user._id,
            group: groupId,
        });

        await member.save();
        res.send(member);
    } catch (e) {
        console.error(e);
    }
});

export default membersGroupRouter;
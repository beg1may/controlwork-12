import mongoose, {Types} from "mongoose";
import User from "./User";
import Group from "./Group";

const Schema = mongoose.Schema;

const MemberGroupSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User not found",
        }
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: [true, 'Group is required'],
        validate: {
            validator: async (value: Types.ObjectId) => {
                const group = await Group.findById(value);
                return !!group;
            },
            message: "Group not found",
        }
    }
});

const MemberGroup = mongoose.model("MemberGroup", MemberGroupSchema);
export default MemberGroup;
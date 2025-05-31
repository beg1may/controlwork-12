import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate:  {
            validator: async (value: string) => {
                const user = await User.findById(value);
                return  !!user;
            },
            message: "User not found",
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Group = mongoose.model("Group", GroupSchema);
export default Group;
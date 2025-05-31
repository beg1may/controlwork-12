import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    const john = new User({
        email: "john@gmail.com",
        displayName: 'John',
        password: "123",
        role: "user",
    });

    john.generateToken();
    await john.save();

    const jane = new User({
        email: "alina@gmail.com",
        displayName: 'Alina',
        password: "123",
        role: "admin",
    });

    jane.generateToken();
    await jane.save();

    await db.close();
};

run().catch(console.error);
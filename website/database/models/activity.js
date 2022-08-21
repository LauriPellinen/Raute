import mongoose from 'mongoose';
import connection from '../functions/connection.js'

// ACTIVITY SCHEMA //

const activitySchema = new mongoose.Schema({ 
    activity: { type: String, required: true },
}, { timestamps: true });

// Create model, giving it a schema
export const Activity = connection.model("Activity", activitySchema);
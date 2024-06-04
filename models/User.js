import mongoose from "mongoose"; 
  
const UserSchema = new mongoose.Schema( 
    { 
        username: {  type: String, required: true, unique: true }, 
        email: { type: String, required: true, unique: true }, 
        password: { type: String, required: true }, 
        profilePicture: { type: String, default: "" }, 
        entries: [ 
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Entry'
            } 
        ],
        fav_entries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Favorite'
            }
        ],
    }, 
    { 
        timestamps: true
    } 
) 
  
export default mongoose.model("User", UserSchema);
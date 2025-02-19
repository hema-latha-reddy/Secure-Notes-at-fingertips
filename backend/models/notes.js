import  mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
 userId : {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
   content: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   iv: { type: String, required: true },
});

const note = mongoose.model('Note', noteSchema);
export default note;
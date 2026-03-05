import mongoose from "mongoose";

const referenceDocSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  filename: String,

  content: String
},
{ timestamps: true }
);

export default mongoose.model("ReferenceDoc", referenceDocSchema);
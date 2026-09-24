import mongoose from 'mongoose';

// TODO: define the Listing schema per README.md section 1.

const listingSchema = new mongoose.Schema(
  {
    // TODO

    title : { type: String, required: true },
    description : { type: String},
    price : { type: Number, required: true,min : 0},
    category : { type: String,enum: ['textbooks', 'electronics', 'furniture', 'clothing'] ,default : 'other'},
    condition : { type: String, enum: ['new', 'used','like-new']},
    status :{type: String, enum: ['available', 'sold','removed'], default: 'available'},
    seller : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  { timestamps: true }
);

export const Listing = mongoose.model('Listing', listingSchema);

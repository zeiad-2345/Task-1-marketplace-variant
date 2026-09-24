import Joi from 'joi';
import { Listing } from '../models/Listing.js';

const CATEGORIES = ['textbooks', 'electronics', 'furniture', 'clothing', 'other'];
const CONDITIONS = ['new', 'like-new', 'used', 'worn'];

const createSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().allow(''),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid(...CATEGORIES),
  condition: Joi.string().valid(...CONDITIONS),
  seller: Joi.string().hex().length(24)
});

const updateSchema = Joi.object({
  title: Joi.string().trim().min(1),
  description: Joi.string().allow(''),
  price: Joi.number().min(0),
  category: Joi.string().valid(...CATEGORIES),
  condition: Joi.string().valid(...CONDITIONS),
  seller: Joi.string().hex().length(24)
}).min(1);

// GET /api/listings
// TODO: implement per README.md section 3.
export async function getAllListings(req, res, next) {
  try {
  
   const getall = await Listing.find({  status: { $ne: 'removed' }});
   res.json({ listings: getall });

  } catch (err) { next(err); }
}

// GET /api/listings/:id
// TODO: implement per README.md sections 3 and 5.
export async function getListing(req, res, next) {
  try {
    const getone = await Listing.findOne({
      _id: req.params.id,
      status: { $ne: 'removed' }
    }).populate('seller');
    if (!getone) return res.status(404).json({ message: 'Listing not found' });
    res.json({ listing: getone });
  } catch (err) { next(err); }
}

// POST /api/listings
// TODO: implement per README.md section 3.
export async function createListing(req, res, next) {
  try {
    // TODO
    const {value,error} = createSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Invalid listing data' });
    const create = await Listing.create(value);
    res.status(201);
    res.json({ listing: create });

  } catch (err) { next(err); }
}

// PATCH /api/listings/:id
// TODO: implement per README.md sections 3 and 5.
export async function updateListing(req, res, next) {
  try {
    const {value,error} = updateSchema.validate(req.body);
    if (error) return res.status(404).json({ message: 'Invalid listing data' });
    const update = await Listing.findByIdAndUpdate(req.params.id, { $set: value }, { new : true, runValidators: true });
    if (!update) return res.status(404).json({ message: 'Listing not found' });
    res.json({ listing: update });
  } catch (err) { next(err); }
}

// DELETE /api/listings/:id
// TODO: implement per README.md sections 4 and 5.
export async function deleteListing(req, res, next) {
  try {
    const deleteone = await Listing.findByIdAndUpdate(req.params.id,{ $set : { status : 'removed'} },{ new : true, runValidators: true  });
    if (!deleteone) return res.status(404).json({ message: 'Listing not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }



}



const Sold = async (req,res)=>{
const so = await Listing.findByIdAndUpdate(
  req.params.id,
  { $set: { status: 'sold' } },
  { new: true, runValidators: true }
)
  if(!so) return res.status(404).json({message:'Listing not found'});
  res.json({ok:true});
}
export default Sold;





const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Artisan = require('../models/artisanModel');


const addReview = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const artisan = await Artisan.findById(id);

  if (!artisan) {
    res.status(404);
    throw new Error('Artisan not found');
  }

  const { text, rating } = req.body;

  if (!text || !rating) {
    res.status(400);
    throw new Error('Please add a text and a rating');
  }

  if ((rating < 0) || (rating > 5)) {
    res.status(400);
    throw new Error('Rating must be a number from 0 to 5');
  }

  const currentRating = parseFloat(artisan.rating);
  const currentRatingSum = currentRating * artisan.reviews.length;
  const newRating = (parseFloat(currentRatingSum) + Number(rating)) / (artisan.reviews.length + 1);

  const review = await Review.create({
    userId: req.user.id,
    artisanId: id,
    text,
    rating
  })

  if (review) {
    artisan.rating = newRating.toFixed(1);
    artisan.reviews.push(review._id);
    await artisan.save();
    res.status(200).json(review);
  }
});

const editReview = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const review = await Review.findById(id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found')
  }

  const artisan = await Artisan.findById(review.artisanId);

  if (!artisan) {
    res.status(404);
    throw new Error('Artisan not found');
  }

  if (req.user.id.toString() !== review.userId.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const { text, rating } = req.body;

  let newRating;

  if (rating) {
    if ((rating < 0) || (rating > 5)) {
      res.status(400);
      throw new Error('Rating must be a number from 0 to 5');
    } else {
      const currentRating = parseFloat(artisan.rating);
      const currentRatingSum = currentRating * artisan.reviews.length;
      newRating = ((parseFloat(currentRatingSum) - Number(review.rating)) + Number(rating)) / (artisan.reviews.length);
    }
  }

  review.text = text ? text: review.text;
  review.rating = rating ? rating: review.rating;
  artisan.rating = rating ? newRating: artisan.rating;
  await review.save();
  await artisan.save();
  res.status(200).json(review);
})

const deleteReview = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const review = await Review.findById(id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found')
  }

  if (req.user.id.toString() !== review.userId.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const artisan = await Artisan.findById(review.artisanId);

  if (artisan) {
    const currentRating = parseFloat(artisan.rating);
    const currentRatingSum = currentRating * artisan.reviews.length;
    const newRating = (parseFloat(currentRatingSum) - Number(review.rating)) / (artisan.reviews.length - 1);
    artisan.rating = newRating;
    const reviewIdIndex = artisan.reviews.indexOf(review._id);
    artisan.reviews.splice(reviewIdIndex, 1);
    artisan.save();
  }
  await Review.deleteOne({_id: review._id});
  res.status(200).json({message: `review with id ${id} has been successfully deleted`});

})
module.exports = { addReview, editReview, deleteReview };

import { Router } from "express";
import { addReview, deleteReview, getAllReviews, getReview, UpdateReview } from "./review.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addReviewSchema, UpdateReviewSchema } from "./review.validation.js";
const reviewRouter=Router()

reviewRouter.route("/").get(getAllReviews).post(auth,allowedTo('user'),validationSchema(addReviewSchema),addReview)
reviewRouter.route('/:id').get(getReview).delete(auth,allowedTo('admin','user'),deleteReview)
.put(auth,allowedTo("user"),validationSchema(UpdateReviewSchema),UpdateReview)

export default reviewRouter
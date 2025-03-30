import { Router } from "express";
import { addReview, deleteReview, getAllReviews, getReview, UpdateReview } from "./review.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
const reviewRouter=Router()

reviewRouter.route("/").get(getAllReviews).post(auth,allowedTo('user'),addReview)
reviewRouter.route('/:id').get(getReview).delete(auth,allowedTo('admin','user'),deleteReview)
.put(auth,allowedTo("user"),UpdateReview)

export default reviewRouter
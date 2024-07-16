import express from "express"
import { getAllReviews, createReview } from "../Controllers/reviewController.js"
import { authenticate, restrict } from "../auth/verifyToken.js"

const router = express.Router({mergeParams: true});

router.get("/", authenticate, restrict(["admin"], getAllReviews));
router.post("/", authenticate, restrict(["patient","admin"], createReview));

export default router;
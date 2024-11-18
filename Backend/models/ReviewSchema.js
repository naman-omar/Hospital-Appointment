import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js"

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    reviewText: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo"
  });
  next();
});

// reviewSchema.statics.calcAverageRatings = async function (doctorId) {
//   const stats = await this.aggregate([
//     {
//       $match: { doctor: doctorId }
//     },
//     {
//       $group: {
//         _id: "$doctor",
//         numOfRating: { $sum: 1 },
//         averageRating: { $avg: "$rating" }
//       }
//     }
//   ]);

//   if (stats.length > 0) {
//     const averageRating = Math.round(stats[0].averageRating * 10) / 10;
//     await Doctor.findByIdAndUpdate(doctorId, {
//       totalRating: stats[0].numOfRating,
//       averageRating: averageRating
//     });
//   } else {
//     await Doctor.findByIdAndUpdate(doctorId, {
//       totalRating: 0,
//       averageRating: 0
//     });
//   }
// };

reviewSchema.statics.calcAverageRatings = async function (doctorId) {

  const reviews = await this.find({ doctor: doctorId });

  if (reviews.length > 0) {

    const totalRating = reviews.length;
    const averageRating = Math.round(
      reviews.reduce((acc, review) => acc + review.rating, 0) / totalRating * 10
    ) / 10;

    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: totalRating,
      averageRating: averageRating
    });
  } else {
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: 0,
      averageRating: 0
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
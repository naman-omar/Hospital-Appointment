import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, select: "-password" }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully Updated",
        data: updatedDoctor,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.userId;
  try {
    // Delete doctor's bookings first
    await Booking.deleteMany({ doctor: id });

    //delete doctor's review
    await Review.deleteMany({doctor: id});

    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully Deleted", data: deletedDoctor});
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res
      .status(200)
      .json({ success: true, message: "Doctor found", data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Doctor not found" });
  }
};

export const getAll = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");

    if (!doctors.length) {
      return res.status(200).json({ success: true, message: "No doctors found" });
    }

    res.status(200).json({ success: true, message: "Doctors found", data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Controller function to get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const query = req.query.query;
    let doctors;

    if (query) {
      // Find doctors where the name or specialization matches the query and are approved
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: new RegExp(query, 'i') },
          { specialization: new RegExp(query, 'i') }
        ]
      }).select("-password");
    } else {
      // Find all approved doctors if no query is provided
      doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
    }

    // Handle case where no doctors are found
    if (!doctors.length) {
      return res.status(200).json({ success: true, message: "No doctors found" });
    }

    // Return the list of doctors
    res.status(200).json({ success: true, message: "Doctors found", data: doctors });
  } catch (err) {
    // Handle errors and send a 500 status code
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  //console.log("Doctor ID:", doctorId);  // Debugging statement
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    const { password, ...doctorData } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId, status: "approved"});

    const responseData = {
      ...doctorData,
      appointments: appointments
    };

    res
      .status(200)
      .json({
        success: true,
        message: "Getting Profile Info",
        data: responseData,
      });
  } catch (err) {
    // Debugging statement
    res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const updateDoctorStatus = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { isApproved } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { isApproved },
      { new: true } 
    ).select("-password");

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, message: "Doctor status updated", data: updatedDoctor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

import Doctor from "../models/DoctorSchema.js"

export const updateDoctor =  async (req,res) => {
    const id = req.params.id;
    try{
        const updatedDoctor = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true, select: '-password'});
        res.status(200).json({success:true, message: "Successfully Updated", data:updatedDoctor});
    }catch(err){
        res.status(500).json({success:false, message:"Failed to update"})
    }
};

export const deleteDoctor =  async (req,res) => {
    const id = req.params.id;
    try{
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Successfully Deleted"})
    }catch(err){
        res.status(500).json({success:false, message:"Failed to delete"})
    }
};

export const getSingleDoctor =  async (req,res) => {
    const id = req.params.id;
    try{
        const doctor = await Doctor.findById(id).populate("reviews").select("-password");
        res.status(200).json({success:true, message: "Doctor found", data:doctor})
    }catch(err){
        res.status(404).json({success:false, message:"Doctor not found"})
    }
};

export const getAllDoctor =  async (req,res) => {
    try{
        const {name} = req.query;
        let doctors;
        if(name){
            doctors = await Doctor.find({isApproved : "approved",
                name: {$regex: name, $options: "i"},
            }).select("-password");
        }
        else{
            doctors = await Doctor.find({isApproved: "approved"}).select("-password");
        }
        res.status(200).json({success:true, message: "Doctors found", data:doctors})
    }catch(err){
        res.status(404).json({success:false, message:"Not found"})
    }
};


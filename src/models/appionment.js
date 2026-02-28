import mongoose, { mongo } from "mongoose"


const appointmentSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    doctor: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    note:{
        type: String,
        default: null
    },

    status:{
        type: String,
        enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
        required: true
    }

});

const Appoinment = mongoose.model('Appoinment' , appointmentSchema , 'appoinments');
export default Appoinment;
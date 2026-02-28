import Appoinment from "../models/appionment.js"
import User from "../models/user.js";
import getLast30DaysDate from "../utils/getLast30Days.js";




export async function getAnylatics(req, res) {
    try {

        const last30days = getLast30DaysDate();

        let [appoinments] = await Appoinment.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },

                    pending: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Pending"] },
                                1,
                                0
                            ]
                        },
                    },

                    confirmed: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Confirmed"] },
                                1,
                                0
                            ]
                        },
                    },

                    completed: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Completed"] },
                                1,
                                0
                            ]
                        },
                    },

                    cancelled: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Cancelled"] },
                                1,
                                0
                            ]
                        },
                    },

                }
            }
        ]);

        const [users] = await User.aggregate([
            // Only verified users
            {
                $match: {
                    isVerified: true,
                    createdAt: { $gte: last30days }
                }
            },

            // Group by role
            {
                $group: {

                    _id: null,

                    total: { $sum: 1 },


                    doctor: {
                        $sum: {
                            $cond: [
                                { $eq: ["$role", "Doctor"] },
                                1,
                                0
                            ]
                        },
                    },

                    receptionist: {
                        $sum: {
                            $cond: [
                                { $eq: ["$role", "Receptionist"] },
                                1,
                                0
                            ]
                        },
                    },

                    patient: {
                        $sum: {
                            $cond: [
                                { $eq: ["$role", "Patient"] },
                                1,
                                0
                            ]
                        },
                    },

                    admin: {
                        $sum: {
                            $cond: [
                                { $eq: ["$role", "Admin"] },
                                1,
                                0
                            ]
                        },
                    },

                }
            }
        ]);


        res.status(200).json({
            success: true,
            message: "Anylatics has sent",
            anylatics: {
                appoinments: {
                    total: appoinments?.total || 0,
                    pending: appoinments?.pending || 0,
                    completed: appoinments?.completed || 0,
                    cancelled: appoinments?.cancelled || 0,
                    confirmed: appoinments?.confirmed || 0
                },

                users: {
                    total: users?.total,
                    doctors: users?.doctor || 0,
                    receptionists: users?.receptionist || 0,
                    patients: users?.patient || 0,
                    admins: users?.admin || 0
                }
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
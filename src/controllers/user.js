import User from "../models/user"

export async function getAllUsers(req , res) {
    try {
        let role = req.query.role;
        let allowedRoles = ["Doctor", "Admin", "Patient", "Receptionist"]

        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Role is not valid'
            })
        }

        let filters = {};

        if (role) filters.role = role;

        let users = await User.find(filters);

        res.status(200).json({
            success: true,
            message: 'All users has sent',
            users
        })


    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}


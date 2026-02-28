async function checkAdmin(req , res , next) {
    if (req.user.role != 'Admin') {
        res.status(404).json({
            success: false,
            message: 'Only admin can access it'
        })
    } else {
        next()
    }
}

export default checkAdmin
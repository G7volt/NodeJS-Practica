const logOutController = {}

logOutController.logOut = async (req, res) => {
    try {
        res.clearCookie("authCookie")
        return res.status(200).json({message: "Sesion Cerrada"})
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "internal server error"});
    }
}

export default logOutController;
import jwt from "jsonwebtoken";

const generateToken = (res, userId, rememberMe = false) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("userId:", userId);
    
    // return cookie if rememberMe is true
    if (rememberMe) {
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/"
        });
        res.json({ message: "Token stored in cookies" });
    }
    // return token if rememberMe is false 
    else {
        res.json({ token });
    }
};

export default generateToken;

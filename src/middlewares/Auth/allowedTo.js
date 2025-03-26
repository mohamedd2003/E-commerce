import AppError from "../../utils/appError.js";

export const allowedTo=(...roles)=>{
    return (req,res,next)=>{
if(roles.includes(req.user.role)){
    return next()
}
else{
    return next(new AppError("You aren't authrized ",401))
}
    }
}
import AppError from "../../utils/appError.js"

export const validationSchema=(schema)=>{
    return (req,res,next)=>{
        schema.validate({...req.body,...req.params,...req.query, 
              image: req.file || null,
            images: req.files?.images || [],
            imageCover: req.files?.imageCover || null },{abortEarly:false}).then(()=>next())
        .catch(error => next(new AppError(error.errors,401)));
 
        
        

    }
}
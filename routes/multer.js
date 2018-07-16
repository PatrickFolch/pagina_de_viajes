const Express=require('express')
const Multer=require('multer');
const Router=Express.Router();
const UploadService=require('../service/uploadService')

let uploadService=new UploadService;
let upload = uploadService.up();
// const storage=Multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null, "public/images");
//     },
//     filename: (req, file, cb) =>{
//         cb(null, file.originalname);
//     }
// });
// const Upload=Multer({storage:storage});

Router.get('/',(req,res,next)=>{
    res.render('uploads',{
        title:'Subida de imagenes'
    })
})
Router.post('/upload',upload.single('file'),(req,res,next)=>{
    res.json(req.file.path)
})
module.exports=Router;
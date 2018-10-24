const Express=require('express')
const Multer=require('multer');
const Router=Express.Router();
const UploadService=require('../service/uploadService')
const ViajesController=require('../controllers/viajesController')

let uploadService=new UploadService;
let upload = uploadService.up();
const storage=Multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
const Upload=Multer({storage:storage});

Router.get('/',(req,res,next)=>{
    res.render('uploads',{
        title:'Subida de imagenes'
    })
})
Router.post('/upload',upload.any('file'),(req,res,next)=>{
    // console.log('upload',JSON.stringify(req.body));
    const Viajes = new ViajesController(req,res,next)
    const travelData ={
        img_path: req.files[0].filename,
        ...req.body,
        active:!!req.body.active
    }
    Viajes.createTravel(travelData)
})
module.exports=Router;
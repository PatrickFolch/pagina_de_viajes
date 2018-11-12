var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');
const LoginController = require('../controllers/auth/loginController');
const SessionController = require('../controllers/auth/sessionController');
const RegisterController = require('../controllers/auth/registerController')
const ActivateUserController = require('../controllers/auth/activateUserController');
const RecoverController=require('../controllers/auth/recoverController')
const AdminController= require('../controllers/adminController')
const DescripcionController=require('../controllers/descripcionController')
const ViajesController=require('../controllers/viajesController')
const EdViajesController=require('../controllers/edViajesController')
const BorrarViajesController=require('../controllers/borrarViajesController')
const Multer=require('multer');
const UploadService=require('../service/uploadService')

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

/* GET home page. */
router.get('/', function(req, res, next) {
  let homeController = new HomeController(req, res, next);
  homeController.index();
});

router.get('/login',(req, res, next) =>{
  let loginController = new LoginController(req, res, next)
  loginController.index();
})


router.post('/login', (req, res, next) =>{
  let loginController = new LoginController(req, res, next);
  loginController.login();
})

router.get('/closeSession', (req, res, next) =>{
  let sessionsController = new SessionController(req, res, next)
  sessionsController.closeSession();
  res.redirect('/');
})

router.get('/register',(req, res, next)=>{
  let registerController = new RegisterController(req,res,next)
  registerController.index();
  });
router.post('/register',(req,res,next)=>{
  let registerController=new RegisterController(req,res,next)
  registerController.register(req.body);
});
router.get('/activate/:hash',(req,res,next)=>{
  let activateUserController= new ActivateUserController(req,res,next)
  activateUserController.index();
});

router.get('/recover',(req,res,next)=>{
let recoverController = new RecoverController(req,res,next)
recoverController.index();
})

router.post('/recover',(req,res,next)=>{
  let recoverController = new RecoverController(req,res,next)
  recoverController.recover();
  });

router.get('/recover/password/:hash',(req,res,next)=>{
  let recoverController=new RecoverController(req,res,next)
  recoverController.formActivate();
  });

  router.post('/recover/password/:hash',(req,res,next)=>{
    let recoverController=new RecoverController(req,res,next)
    recoverController.activate();
    });

    router.get('/admin',(req,res,next)=>{
    let adminController=new AdminController(req,res,next)
    adminController.index();
    });

    router.get('/descripcion/:id',(req,res,next)=>{
      let descripcionController=new DescripcionController(req,res,next)
      descripcionController.index();
    });
    router.get('uploads',(req,res,next)=>{
      let viajesController=new ViajesController(req,res,next)
      viajesController.index();
    });
    router.post('uploads',(req,res,next)=>{
      let viajesController=new ViajesController(req,res,next)
      viajesController.createTravel(travelData);
    });

    router.get('/editar/:id',(req,res,next)=>{
      console.log(req.params.id);
      let edViajesController=new EdViajesController(req,res,next)
      edViajesController.index();
    });

    router.post('/editar/:id',upload.any('file'),(req,res,next)=>{
      console.log("ruta ->"+ JSON.stringify(req.body));
      let edViajesController=new EdViajesController(req,res,next)
      edViajesController.editarViaje();
    });
    
    router.get('/deleteTravel/:id',(req, res, next) =>{
      let borrarViajesController = new BorrarViajesController(req, res, next)
      borrarViajesController.deleteTravel();
      res.redirect('/admin');
    })
    
    module.exports = router;
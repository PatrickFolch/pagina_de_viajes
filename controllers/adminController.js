const Controller=require('./controller')
class adminController extends Controller
{
    constructor(req,res,next)
    {
        super(req,res,next)
    }
    index(){
        this.res.render('admin',{
                tilte:'Admin'
                });
        }
}


module.exports=adminController
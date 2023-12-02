const express = require('express');
const app= express();
const path = require('path');
const Swal = require('sweetalert2')
const morgan = require("morgan");



//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(morgan("dev"))


app.use(express.static(path.join(__dirname, 'public')));

//motor de plantilla
const ejs = require('ejs');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views')); 

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});

//bcryptjs para password
const bcryptjs = require('bcryptjs');

//session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave:'true',
    saveUnitialazed:'true'
}));


//conexion
const connection = require('./database/db');

//autenticacion
app.get('/',(req,res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login: true,
            name: req.session.name
        });
    }else{
            res.render('index',{
                login:false,
                name: 'Debe iniciar sesion'
            })
        
    }
})
app.get('/conjuntoH',(req,res)=>{
    if(req.session.loggedin){
        res.render('conjuntoH',{
            login: true,
            name: req.session.name
        });
    }else{
            res.render('conjuntoH',{
                login:false,
                name: 'Debe iniciar sesion'
            })
        
    }
})
app.get('/conjuntoI',(req,res)=>{
    if(req.session.loggedin){
        res.render('conjuntoI',{
            login: true,
            name: req.session.name
        });
    }else{
            res.render('conjuntoI',{
                login:false,
                name: 'Debe iniciar sesion'
            })
        
    }
})
app.get('/conjuntoR',(req,res)=>{
    if(req.session.loggedin){
        res.render('conjuntoR',{
            login: true,
            name: req.session.name
        });
    }else{
            res.render('conjuntoR',{
                login:false,
                name: 'Debe iniciar sesion'
            })
        
    }
})
app.get('/bolsos',(req,res)=>{
    if(req.session.loggedin){
        res.render('bolsos',{
            login: true,
            name: req.session.name
        });
    }else{
            res.render('bolsos',{
                login:false,
                name: 'Debe iniciar sesion'
            })
        
    }
})


//logout
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
});

app.get('/enviarContacto', (req, res) => {
    if (req.session.loggedin) {
        res.render('enviarContacto', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('enviarContacto', {
            login: false,
            name: 'Debe iniciar sesion'
        });
    }
});

app.get('/index', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesion'
        });
    }
});

//REGISTER
app.post('/register',async(req,res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password,8);
    connection.query('INSERT INTO usuario SET ?',{user:user,name:name,rol:rol,password:passwordHaash},async(error,results)=>{
        if(error){
            console.log(error)
        }else{

            res.render('register',{
                alert: true,
                alertTitle: "Registro",
                alertMessage:"Registro Exitoso!",
                alertImageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEilqJA5TbPmuqCjpuhCSYj5Yv8S50PshGD4WNq3l29yBqlR9Ejv5V4nXVPkxSmmpkZZr1CyzIdvECvynQ0hKTYtPLabO66txTzqrnl-H0QsE22NRCU12V9PYtzAVXlqqsta-eFpqSK4rhkfvuYNMJoYQf8l1-UVjy8pZSiGGlfmLWz5mzkkkVzbVJunM_I=w640-h640",
                alertImageWidth: 150,
                alertImageHeight: 150,
                ruta:'login'
            })
        }
    })

})

//LOGIN
app.post('/auth',async(req,res)=>{
    const user = req.body.user;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password,8);
    if(user && password){
        connection.query('SELECT * FROM usuario WHERE user = ? ',[user], async(error,results)=>{
            
            if(!results||results.length==0 || !(await bcryptjs.compare(password, results[0].password))){
               
                res.render('login',{
                alert: true,
                alertTitle: "Error",
                alertMessage:"Usuario o password incorrectos",
                alertImageUrl: "https://4.bp.blogspot.com/-syXhVWFDNlo/XJvq1xJBnsI/AAAAAAAAJdY/pGeef8mUre8QLy2FPp9MAA1xUcKahig_ACLcBGAs/s640/Grumpy%2Bbear%2B2.png",
                alertImageWidth: 150,
                alertImageHeight: 150,
                ruta:'login'
                })
            }else{
                req.session.loggedin = true;
                req.session.name=results[0].name;
                res.render('login',{
                    alert: true,
                alertTitle: "¡Bienvenido otra vez!",
                alertMessage:"Login correcto",
                alertImageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhwSB-p6wChNLqCP0nI0tBhiiLuC71Rnv_6Px3rrtq3URgVU7tKRGwB9SdRzeMyD2H695vJBmKMcFz5fXvg5l9cgD8rbgd4beh5wPQZf4VNc-XEpfAYyWNEuiwkKhn-JzkTiV7UNVpDqJUBw1GRQe3VUJ8rkhKzconRErq7e3lOZWp0gP6o5VlqpyJuWc8=w456-h640",
                alertImageWidth: 200,
                alertImageHeight: 300,
                ruta:''
                })
            }
        })
    }else{
        res.render('login',{

            alert: true,
                alertTitle: "Error",
                alertMessage:"Porfavor ingrese un usuario y/o password",
                alertImageUrl: "https://4.bp.blogspot.com/-syXhVWFDNlo/XJvq1xJBnsI/AAAAAAAAJdY/pGeef8mUre8QLy2FPp9MAA1xUcKahig_ACLcBGAs/s640/Grumpy%2Bbear%2B2.png",
                alertImageWidth: 150,
                alertImageHeight: 150,
                ruta:'login'

        })
    }

}
)
app.post('/enviarContacto', async (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const mensaje = req.body.mensaje;
    connection.query('INSERT INTO contactos SET ?', { nombre, email, mensaje }, async (error, results) => {
        if (error) {
            console.log(error);
            res.render('login',{

                alert: true,
                    alertTitle: "Error",
                    alertMessage:"Hubo un error al procesar su solicitud",
                    alertImageUrl: "https://4.bp.blogspot.com/-syXhVWFDNlo/XJvq1xJBnsI/AAAAAAAAJdY/pGeef8mUre8QLy2FPp9MAA1xUcKahig_ACLcBGAs/s640/Grumpy%2Bbear%2B2.png",
                    alertImageWidth: 150,
                    alertImageHeight: 150,
                    ruta:''
    
            })
        } else {
            res.render('login',{
                alert: true,
                alertTitle: "¡Gracias!",
                alertMessage:"Nos pondremos en contacto con usted.",
                alertImageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEilqJA5TbPmuqCjpuhCSYj5Yv8S50PshGD4WNq3l29yBqlR9Ejv5V4nXVPkxSmmpkZZr1CyzIdvECvynQ0hKTYtPLabO66txTzqrnl-H0QsE22NRCU12V9PYtzAVXlqqsta-eFpqSK4rhkfvuYNMJoYQf8l1-UVjy8pZSiGGlfmLWz5mzkkkVzbVJunM_I=w640-h640",
                alertImageWidth: 150,
                alertImageHeight: 150,
                ruta:''
            })
        }
    });
});

app.get('/eliminarCuenta', (req, res) => {
    if (req.session.loggedin) {
        res.render('eliminarCuenta', {
            login: true,
            name: req.session.name
        });
    } else {
        login: false,
        res.redirect('/login');
    }
});
//eliminar cuenta
app.post('/eliminarCuenta', async (req, res) => {
   

    if (req.session.loggedin) {
        const user = req.body.user;
        connection.query('DELETE FROM usuario WHERE user = ?', [user], async (error, results) => {
           
            if (error) {
                console.log(error);
                res.render('eliminarCuenta', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Hubo un error al eliminar su cuenta",
                    alertImageUrl: "https://4.bp.blogspot.com/-syXhVWFDNlo/XJvq1xJBnsI/AAAAAAAAJdY/pGeef8mUre8QLy2FPp9MAA1xUcKahig_ACLcBGAs/s640/Grumpy%2Bbear%2B2.png",
                    alertImageWidth: 150,
                    alertImageHeight: 150,
                    ruta: ''
                });
            } else {
                req.session.destroy(() => {
                    res.render('eliminarCuenta', {
                        alert: true,
                        alertTitle: "Cuenta eliminada",
                        alertMessage: "Cuenta eliminada con éxito. ¡Esperamos que vuelvas!",
                        alertImageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEilqJA5TbPmuqCjpuhCSYj5Yv8S50PshGD4WNq3l29yBqlR9Ejv5V4nXVPkxSmmpkZZr1CyzIdvECvynQ0hKTYtPLabO66txTzqrnl-H0QsE22NRCU12V9PYtzAVXlqqsta-eFpqSK4rhkfvuYNMJoYQf8l1-UVjy8pZSiGGlfmLWz5mzkkkVzbVJunM_I=w640-h640",
                        alertImageWidth: 150,
                        alertImageHeight: 150,
                        ruta: ''
                    });
                 });
            }
        });
    } else {
        res.redirect('/login');
    }
}); 


app.set('port', process.env.PORT||4000);
app.listen(app.get('port'),()=>
console.log('Server is listening on port',app.get('port')
 )
);

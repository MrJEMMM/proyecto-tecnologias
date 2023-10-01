const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());    
const db  = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"login"
});
app.post("/create",(req, res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const Correo = req.body.Correo;
    const telefono = req.body.telefono;
    const Contraseña = req.body.Contraseña;

    db.query('INSERT INTO registros(nombre,edad,Correo,telefono,Contraseña) VALUES(?,?,?,?,?)',[nombre,edad,Correo,telefono,Contraseña],
    (err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send("Registrado con extito:#");
        }
    }
    );
}); 

app.get("/registros",(req, res)=>{
    db.query('SELECT * FROM registros',
    (err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
}); 

app.put("/update",(req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const Correo = req.body.Correo;
    const telefono = req.body.telefono;
    const Contraseña = req.body.Contraseña;

    db.query('UPDATE registros SET nombre=?,edad=?,Correo=?,telefono=?,Contraseña=? WHERE id=?',[id,nombre,edad,Correo,telefono,Contraseña],
    (err,result)=>{
        if (err){
            console.log(err); 
        }else{
            res.send(result);
        }
    }
    );
}); 


app.delete("/delete/:id",(req, res)=>{
    const id = req.params.id;
    
    db.query('DELETE  FROM registros WHERE id=?',id,
    (err,result)=>{
        if (err){
            console.log(err); 
        }else{
            res.send(result);
        }
    }
    );
}); 

app.listen(3001,()=>{
    console.log("3001 Activado")
})
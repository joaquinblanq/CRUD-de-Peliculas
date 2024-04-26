import { error } from "console";
import Express from "express";
import fs, { read, write } from "fs";
import bodyParser from "body-parser";

const app= Express();
app.use(bodyParser.json());

const readData= () => {

    try{
    const data= fs.readFileSync("./db.json")
    return(JSON.parse(data));
    } catch(error){
        console.log(error);
    }
};

const writeData = (data) => {

    try{
    fs.writeFileSync("./db.json", JSON.stringify(data));
   
    } catch(error){
        console.log(error);
    }
};  

app.get("/", (req, res) =>{
    res.send("Bienvenido123zzz")
});

app.get("/Peliculas", (req,res)=>{
    const data = readData();
    res.json(data.Peliculas)
});

app.get("/Peliculas/:id", (req, res) =>{
const data = readData();
const id = parseInt(req.params.id);
const pelicula = data.Peliculas.find((pelicula) => pelicula.id === id)
res.json(pelicula);
})

app.post("/Peliculas", (req, res)   =>{
    const data = readData();
    const body = req.body;
    const newPelicula = {
        id: data.Peliculas.length + 1,
        ...body,
    };
    data.Peliculas.push(newPelicula);
    writeData(data);
    res.json(newPelicula);

})

app.put("/Peliculas/:id", (req,res) =>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const peliculaIndex = data.Peliculas.findIndex((pelicula)=> pelicula.id === id);
    data.Peliculas[peliculaIndex]={
        ...data.Peliculas[peliculaIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Se han actualizado los datos de la película."});
})

app.delete("/Peliculas/:id", (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const peliculaIndex = data.Peliculas.findIndex((pelicula)=> pelicula.id === id);
    data.Peliculas.splice(peliculaIndex, 1);
    writeData(data);
    res.json({message:"Se eliminó la película de manera exitosa."})
})

app.listen(3000, () =>{
    console.log("Se ha abierto el servidor en el puerto 3000");
});
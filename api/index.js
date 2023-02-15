const express = require('express');
const app = express();
const port = 3001;
// Considero buena practica dividir las rutas segun su funcionamiento y segun los datos que devuelve
const activitiesRouter = require('./routes/activities');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.get('/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
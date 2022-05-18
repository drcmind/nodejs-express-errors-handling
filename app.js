const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  console.log("Premier middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Deuxième middleware");
  next();
});

app.get("/", (req, res, next) => {
  let fichier = path.join(__dirname, "indeyx.html");
  res.sendFile(fichier, (erreur) => {
    if (erreur) {
      next(erreur);
    }
  });
});

app.use((req, res, next) => {
  res
    .status(404)
    .send('<h2 style="color : red;">Puuff ! Page introuvable</h2>');
});

app.use((erreur, req, res, next) => {
  console.error(erreur);
  next(erreur);
});

app.use((erreur, req, res, next) => {
  res.status(500).send('<h2 style="color : red;">Puuff ! Erreur</h2>');
});

app.listen(3000);
console.log("L'application fonctionne au port 3000");

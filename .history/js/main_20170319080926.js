$(document).ready(function () {
    console.log("ready!");

    // Je lance mon serveur local: json-server --watch backend/db.json

    // chargement des articles
    $.getJSON('http://localhost:3000/articles').done(function (reponse) {


    });

});
$(document).ready(function () {
    console.log("ready!");

    // Je lance mon serveur local: json-server --watch backend/db.json

    // chargement des articles
    // Rappel: $.getJSON('http://localhost:3000/articles') => C'est le requete asynchrone(AJAX)
    // done(function (reponse) => C'est la réponse du serveur en JSON (voir la console + network)
    $.getJSON('http://localhost:3000/articles').done(function (reponse) {
        console.log(reponse);

    });

});
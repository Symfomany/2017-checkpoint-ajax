$(document).ready(function () {
    console.log("ready!");

    // Je lance mon serveur local: json-server --watch backend/db.json

    // chargement des articles
    // Rappel: $.getJSON('http://localhost:3000/articles') => C'est le requete asynchrone(AJAX)
    // done(function (reponse) => C'est la réponse du serveur en JSON (voir la console + network)
    let urlCommentaire = 'http://localhost:3000/articles';

    $.getJSON(urlCommentaire).done(function (reponse) {
        console.log(reponse); // Array of objetcs

        for (let personnage of reponse) {

        }

    });

});
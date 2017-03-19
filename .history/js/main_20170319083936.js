$(document).ready(function () {
    console.log("ready!");

    // Je lance mon serveur local: json-server --watch backend/db.json
    // chargement des articles
    // Rappel: $.getJSON('http://localhost:3000/articles') => C'est le requete asynchrone(AJAX)
    // done(function (reponse) => C'est la réponse du serveur en JSON (voir la console + network)
    let url = 'http://localhost:3000/articles';

    $.getJSON(url).done(function (reponse) {

        console.log(reponse); // Array of objects
        let html; // création de variable sans valeur
        for (let item of reponse) {

            html = `<div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <div class="img-box">
                        <img class="kaamelott-underline" src="${item.image}" alt="${item.author}, ${item.chapter}, ${item.episode}">
                    </div>
                    <div class="quote">
                        <blockquote>
                        "${item.content}"
                        </blockquote>
                        <p class="source">
                        ${item.author},
                        <i>${item.chapter}, ${item.episode}</i>
                        </p>
                        <span class="hider"></span>
                    </div>
                    <p class="item-actions"><a href="#" class="btn btn-danger" role="button">Supprimer</a>
                        <a href="#" class="btn btn-kaamelott" role="button" data-toggle="modal" data-target="#${item.id}">Voir plus</a>
                    </p>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="${item.id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                        <blockquote>
                            "${item.content}"
                        </blockquote>
                        <p class="source">
                            ${item.author},
                            <i>${item.chapter}, ${item.episode}</i>
                        </p>
                        </div>
                    </div>
                    </div>
                </div>`;

            $('#articlesBody').html(fichierJson);

        }


    });

});
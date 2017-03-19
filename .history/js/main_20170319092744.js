$(document).ready(function () {
    console.log("ready!");

    // Je lance mon serveur local: json-server --watch backend/db.json
    // chargement des articles
    // Rappel: $.getJSON('http://localhost:3000/articles') => C'est le requete asynchrone(AJAX)
    // done(function (reponse) => C'est la réponse du serveur en JSON (voir la console + network)
    const url = 'http://localhost:3000/articles';

    $.getJSON(url).done(function (reponse) {

        console.log(reponse); // Array of objects

        let html; // création de variable sans valeur


        $('#articlesBody').empty(); //je supprime les articles deja existant

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

            // on ajoute chaque element dans le HTML
            $('#articlesBody').append(html);

        }
    }); // end get JSON


    // au clic du bouton de validation de formulaire
    $('#addQuote button').click(function () {
        //déclaration des variables reprenant la valeur des inputs
        let auteur = $('#auteur').val();
        let citation = $('#citation').val();
        let chapitre = $('#chapitre').val();
        let episode = $('#episode').val();
        let picture = $('#picture').val();

        // on verifie que le texte entré respect les conditions de longueur
        if (auteur.length < 101
            && chapitre.length < 101
            && citation.length < 65535
            && picture.length < 65535) {
            //$.post permet d'envoyer derriere une URL mon nouveau commentaire
            $.post(url, { author: auteur, chapter: chapitre, episode: episode, content: citation, image: picture }).done(function () {
                alert('Nouvelle citation ajoutée!');
                // remise a zéro des inputs
                $('input,textarea').val('');
                $("form").append(`<p>La citation a bien été enregistrée</p>`);
            });
        } else {
            $("#resultForm").text(`Tous les champs sont obligatoires`)
        }

    });






});
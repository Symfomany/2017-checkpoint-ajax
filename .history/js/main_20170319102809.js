$(document).ready(function () {
    console.log("ready!");

    // Je lance mon serveur local: json-server --watch backend/db.json
    // chargement des articles
    // Rappel: $.getJSON('http://localhost:3000/articles') => C'est le requete asynchrone(AJAX)
    // done(function (reponse) => C'est la réponse du serveur en JSON (voir la console + network)
    const url = 'http://localhost:3000/articles';

    $.getJSON(url).done(function (reponse) {

        console.log(reponse); // Array of objects

        let htmlPersonnage = ''; // création de variable sans valeur


        $('#articlesBody').empty(); //je supprime les articles déjà existant


        // Je boucle la liste des personnages
        for (let item of reponse) {

            htmlPersonnage = `<div class="col-sm-6 col-md-4" class="item">
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
                    <p class="item-actions"><a data-id="${item.id}" class="btn btn-danger" role="button">Supprimer</a>
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
            $('#articlesBody').append(htmlPersonnage);



            /**
             * Je créer un evenement click sur le boutton Supprimer 
             * quand mes données sont chargées
             */
            $('#articlesBody .btn-danger').click(function () {

                //je stocke mon elemnt courant
                let eltCourant = $(this);

                // je recupere l'id
                let id = eltCourant.attr('data-id'); // je crée un attribut "data-id" sur mon boutton"
                console.log(id);

                // Nouveauté : Envoyer une requete de type DELETE pour supprimer un personnage
                // http://stackoverflow.com/questions/2153917/how-to-send-a-put-delete-request-in-jquery

                // JSON-SERVER: la requete est de type DELETE http://localhost:3000/articles/id

                // Documentation de la fonction: https://openclassrooms.com/courses/un-site-web-dynamique-avec-jquery/le-fonctionnement-de-ajax

                // Nouvelle fonction AJAX
                $.ajax({
                    url: url + '/' + id,
                    type: 'DELETE', // Type: GET, POST, DELETE...
                    success: function (result) {
                        console.log('Le personnage a bien été supprimé');

                        eltCourant.parents('.col-md-4').fadeOut();
                        // je fais disparaitre toute la div .col-md-4 autour du bouton Supprimer
                    }
                }); // Fin de la requete AJAX


            });  // fin de l'événement click



        } // fin de  la boucle for


    }); // fin de  getJSON


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
            });
        } else {
            $("#resultForm").text(`Tous les champs sont obligatoires`)
        }

    });







});
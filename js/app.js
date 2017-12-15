$(document).ready(function () {
    $.get("https://pokeapi.co/api/v2/pokemon/", function (resposta) {
        console.log(resposta.results);
        $.each(resposta.results, function (index, value) {
            $(".panel-group").append(
                "<div class='panel panel-default'>" +
                " <div class='panel-heading'>" +
                "<h4 class='panel-title'>" +
                "<a data-toggle='modal' data-parent='#accordion' data-target='#myModal' class='poke'>" + value.name +
                "</a>" +
                "</h4>" +
                "</div>"
            );
        });
    });

    $(document).on('click', ".poke", function () {
        var nome = $(this).text() + "/";
        $.get("https://pokeapi.co/api/v2/pokemon/" + nome, function (pokemon) {
            $("#modal-nome").text(pokemon.name);

            $("#modal-imagem").append("<img src='" + pokemon.sprites.front_default + "' class='img-rounded'>");
            console.log(pokemon);
            console.log(pokemon.name);
            $.each(pokemon.abilities, function (index, value) {
                console.log(value.ability.name);
            });

        });
        $("#modal-imagem").empty();
    });

});
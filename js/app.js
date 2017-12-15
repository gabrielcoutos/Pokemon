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
            $.each(pokemon.types, function (index, value) {
                $("#modal-tipo").append(value.type.name + "/");
            });
            $("#modal-habilidades").append("<h6>Abilities: </h6>");
            $.each(pokemon.abilities, function (index, value) {
                $("#modal-habilidades").append(value.ability.name + " / ");
            });
            $("#modal-estatistica").append("<h6>Stats: </h6>");
            $("#modal-estatistica").append("<div class='col-md-3'>" +
                "<p >weight:" + pokemon.weight + "</p>" +
                "</div>");
            $.each(pokemon.stats, function (index, value) {
                $("#modal-estatistica").append("<div class='col-md-3'>" +
                    "<p>" + value.stat.name + ": " + value.base_stat + "</p>" +
                    "</div>");
            });
            $("#moves").append("<h6>Moves: </h6>");
            $.each(pokemon.moves, function (index, value) {
                $("#moves").append(value.move.name+" / ");
            });

        });
        $("#moves").empty();
        $("#modal-habilidades").empty();
        $("#modal-estatistica").empty();
        $("#modal-tipo").text("Tipo:");
        $("#modal-imagem").empty();
    });

});
$(document).ready(function () {
    $("#loader-starter").hide();
    $("#loader-modal").hide();
    carregarElementos(null);



    $(document).on('click', ".poke", function () {
        var nome = $(this).text() + "/";
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + nome,
            method: 'GET',
            dataType: 'JSON',
            beforeSend: function () {
                $("#corpo").hide();
                $("#loader-modal").show();
            },
            success: function (pokemon, status) {
                $("#loader-modal").hide();
                $("#corpo").show();
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
                    $("#moves").append(value.move.name + " / ");
                });

            }

        });
        $("#moves").empty();
        $("#modal-habilidades").empty();
        $("#modal-estatistica").empty();
        $("#modal-tipo").text("Tipo:");
        $("#modal-imagem").empty();
    });

    function carregarElementos(elemento) {
        var urlAPI = "https://pokeapi.co/api/v2/pokemon/";
        var limit = 20;
        if (elemento !== null) {
            var offset = (elemento - 1) * limit;
            urlAPI += "?limit=" + limit + "&offset=" + offset;
        }

        $(".panel-group").empty();
        $("#vazio").remove();
        $.ajax({
            url: urlAPI,
            method: 'GET',
            dataType: 'JSON',
            beforeSend: function () {
                $("#loader-starter").show();
            },
            success: function (resposta, status) {
                $("#loader-starter").hide();
                console.log(resposta);
                var maximoPagina = Math.ceil(resposta.count / limit);
                $("#ultimo").text(maximoPagina);
                $.each(resposta.results, function (index, value) {
                    $(".panel-group").append(
                        "<div class=col-md-6>" +
                        "<div class='panel panel-default'>" +
                        " <div class='panel-heading'>" +
                        "<h4 class='text-center panel-title'>" +
                        "<a data-toggle='modal' data-parent='#accordion' data-target='#myModal' class='poke'>" + value.name +
                        "</a>" +
                        "</h4>" +
                        "</div>" +
                        "</div>"
                    );
                });

            },
            error: function (request, status, erro) {
                $("#loader-starter").hide();
                $("#pokemons").append("<h3 class='text-center' id='vazio'>Nenhum pokemon encontrado</h3>");
            }
        });
    }

    $(document).on('click', '.page-link', function () {
        var pagina = $(this).text();
        $('li').each(function (index) {
            $(this).removeClass("active");
        });
        carregarElementos(pagina, null);
        console.log(pagina);
        if (Number(pagina) === 4 || Number(pagina) === 3 || Number(pagina) === 1) {

            if (Number(pagina) === 1) {
                $("#first").parent().addClass("active");
                alterarPaginacao();
            }

            if (Number(pagina) === 3) {
                $(".before").parent().addClass("active");
                alterarPaginacao();
            }

            if (Number(pagina) === 4) {
                console.log("oi");
                $(".midle").parent().addClass("active");
                alterarPaginacao();
            }

        }

        if (Number(pagina) === 2) {
            $(".dot").parent().addClass("active");
        }

        if (pagina >= 5 && pagina <= 48) {
            if (Number(pagina) === 48) {
                $("last").hide();
                $(".dot").removeClass("page-link");
                $(".dot").text("...");
                var resultado = Number(pagina) + 1;
                $(".before").text(pagina - 1);
                $(".midle").text(pagina);
                $(".midle").parent().addClass("active");
                $(".after").text(pagina);

            } else {
                $("last").show();
                $(".dot").removeClass("page-link");
                $(".dot").text("...");
                var resultado = Number(pagina) + 1;
                $(".before").text(pagina - 1);
                $(".midle").text(pagina);
                $(".midle").parent().addClass("active");
                $(".after").text(resultado);

            }


        }

    });

    function alterarPaginacao() {
        $(".dot").addClass("page-link");
        $(".dot").text("2");
        $(".before").text("3");
        $(".midle").text("4");
        $(".after").text("5");
    }


    $("#searchSubmit").click(function () {
        var nome = $("#searchNome").val();
        buscarPokemon(nome);
    });

    function buscarPokemon(nome) {
        var urlAPISearch = "https://pokeapi.co/api/v2/pokemon/" + nome;
        $(".panel-group").empty();
        $("#vazio").remove();
        $.ajax({
            url: urlAPISearch,
            method: 'GET',
            dataType: 'JSON',
            beforeSend: function () {
                $("#loader-starter").show();
            },
            success: function (resposta, status) {
                $("#loader-starter").hide();
                $(".panel-group").append(
                    "<div class=col-md-6>" +
                    "<div class='panel panel-default'>" +
                    " <div class='panel-heading'>" +
                    "<h4 class='text-center panel-title'>" +
                    "<a data-toggle='modal' data-parent='#accordion' data-target='#myModal' class='poke'>" + resposta.name +
                    "</a>" +
                    "</h4>" +
                    "</div>" +
                    "</div>"
                );
            },
            error: function (request, status, erro) {
                $("#loader-starter").hide();
                $("#pokemons").append("<h3 class='text-center' id='vazio'>Nenhum pokemon encontrado</h3>");
            }
        });

    }



});
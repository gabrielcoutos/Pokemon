$(document).ready(function () {
    $("#loader-starter").hide();
    $("#loader-modal").hide();
    carregarElementos(null);
    $('.pagination').hide();
    $(document).on('click', '#itemSelect', function () {
        carregarElementos(null);
        resetarPaginacao();
    });
    $(document).on('click', '#pokemonSelect', function () {
        carregarElementos(null);
        resetarPaginacao();
        $("#estatistica").show();

    });


    $(document).on('click', ".poke", function () {
        var urlAPI = defineURL();
        var nome = $(this).text() + "/";        
        $.ajax({
            url: urlAPI + nome,
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
                if ($("#pokemonSelect").prop("checked")) {
                    modalPokemon(pokemon);


                } else {
                    modalItem(pokemon);
                }

            }

        });
        $("#modal-nome").empty();
        $("#modal-tipo").empty();
        $("#moves").empty();
        $("#modal-habilidades").empty();
        $("#modal-estatistica").empty();
        $("#modal-imagem").empty();
    });

    function carregarElementos(elemento) {
        var urlAPI = defineURL();


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
                $('.pagination').show();
                console.log(resposta);
                var maximoPagina = Math.ceil(resposta.count / limit);
                $("#ultimo").text(maximoPagina);
                $.each(resposta.results, function (index, value) {
                    $(".panel-group").append(
                        "<div class=col-md-6>" +
                        "<div class='panel panel-default'>" +
                        " <div class='panel-heading'>" +
                        "<h4 class='text-center panel-title'>" +
                        "<a data-toggle='modal' data-parent='#accordion' data-target='#myModal' class='poke btn'>" + value.name +
                        "</a>" +
                        "</h4>" +
                        "</div>" +
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
        carregarElementos(pagina);
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

    function resetarPaginacao() {

        $('li').each(function (index) {
            $(this).removeClass("active");
        });
        $("#first").parent().addClass("active");
        alterarPaginacao();
    }


    $("#searchSubmit").click(function () {
        var nome = $("#searchNome").val();
        if (nome.trim() !== "" && nome !== undefined) {           
            buscarPokemon(nome);
        } else {
            carregarElementos(null);
        }

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
                    "<a data-toggle='modal' data-parent='#accordion' data-target='#myModal' class='poke btn'>" + resposta.name +
                    "</a>" +
                    "</h4>" +
                    "</div>" +
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
    function defineURL() {
        var url;
        if ($("#pokemonSelect").prop("checked")) {
            url = "https://pokeapi.co/api/v2/pokemon/";
            $("#identificador").text("Pokemon");
        } else {
            url = "https://pokeapi.co/api/v2/item/";
            $("#identificador").text("Item");
        }
        return url;
    }

    function modalPokemon(pokemon) {
        $("#modal-imagem").append("<img src='" + pokemon.sprites.front_default + "' class='img-responsive'>");       
        $("#modal-tipo").append("<h4>Type: </h4>");
        $.each(pokemon.types, function (index, value) {
            $("#modal-tipo").append("<span> ." + value.type.name + "</span>");
        });
        $("#modal-habilidades").append("<h4>Abilities: </h4>");
        $.each(pokemon.abilities, function (index, value) {
            $("#modal-habilidades").append("<span> ." + value.ability.name + "</span>");
        });
        $("#modal-estatistica").append("<h4>Stats: </h4>");
        $("#modal-estatistica").append("<div class='col-md-3'>" +
            "<p >weight: " + pokemon.weight + "</p>" +
            "</div>");
        $.each(pokemon.stats, function (index, value) {
            $("#modal-estatistica").append("<div class='col-md-3'>" +
                "<p>" + value.stat.name + ": " + value.base_stat + "</p>" +
                "</div>");
        });
        $("#moves").append("<h4>Moves: </h4>");
        $.each(pokemon.moves, function (index, value) {
            $("#moves").append(" <li class='list-inline-item'> ." + value.move.name + "</li>");
        });

    }

    function modalItem(item) {
        $("#modal-imagem").append("<img src='" + item.sprites.default + "' class='img-rounded'>");
        $("#modal-habilidades").append("<h4>Attributes: </h4>");
        $("#estatistica").hide();
        $.each(item.attributes, function (index, value) {
            $("#modal-habilidades").append(value.name + " / ");
        });
        $("#modal-tipo").append("<h4>Category: </h4>");
        $("#modal-tipo").append(item.category.name);
        $("#moves").append("<h4>Cost: </h4>");
        $("#moves").append("<div class='col-md-3'>" +
            "<p >weight:" + item.cost + "</p>" +
            "</div>");
    }



});
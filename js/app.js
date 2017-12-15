$(document).ready(function () {   
    $.get("https://pokeapi.co/api/v2/pokemon/", function (resposta) {     
        console.log(resposta.results);

    });    
    
});
$(document).ready(function () {    
    $.get("https://pokeapi.co/api/v2/pokemon/", function (resposta) {       
        console.log(resposta.results);
        $.each(resposta.results, function (index, value) {
            $("#pokemons").append("<div class='panel-group' id='accordion'>"+
            "<div class='panel panel-default'>"+
               " <div class='panel-heading'>"+
                    "<h4 class='panel-title'>"+
                        "<a data-toggle='collapse' data-parent='#accordion' href='#"+value.name+"' class='poke'>"+value.name+
                            "</a>"+
                    "</h4>"+
                "</div>"+
                "<div id='"+value.name+"' class='panel-collapse collapse '>"+
                    "<div class='panel-body'>"+"ronaldo"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>");
        });
    });    

    $(document).on('click',".poke",function(){
        var nome=$(this).text()+"/";
        $.get("https://pokeapi.co/api/v2/pokemon/"+nome,function(pokemon){
        $("#"+nome).children[0].text("ola");
        });
     
    });
    
});
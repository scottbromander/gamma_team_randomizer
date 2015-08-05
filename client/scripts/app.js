var clicks = 0;

var divArray = [];

//Something that changes the number of Clicks
//That something I know, is that button
//Click Interaction changes the value of Clicks
//Therefor, I need an listener to listen for the button click.

//Some sort of check, to see if clicks is == 3
//If it is, run the Ajax call.

//WHEN THE AJAX CALL COMES BACK, APPEND THE NAME OF EACH PERSON ON THE DOM

function checkThree(value){
    if(value == 3){
        return true;
    }
}

function appendToContainer(data){
    $("#container").append("<div></div>");
    var $el = $("#container").children().last();
    $el.data("location", data.location);
    $el.append("<div>" + data.name + "</div>");
    $el.append("<button class='remove-button'>Remove</button>");
    $el.append("<button class='location-button'>Show Location</button>");
    divArray.push($el);
}



function getObjectData(){
    $.ajax({
        url: "/data",
        beforeSend: function(){
            $("#container").append("<p id='someId'>Loading</p>");
        },
        success: function(data){
            $("#someId").remove();
            $.each(data, function(key, value){
                appendToContainer(this);
            });
            doSomething(divArray);
        }
    });
}

$(document).ready(function (){
    $(".click-button").on('click', function(){
        clicks++;
        if(checkThree(clicks)){
            getObjectData();
        }
    });

    $("body").on('click', '.remove-button', function(){
       $(this).parent().remove();
    });

    $("body").on('click', '.location-button', function(){
        var $parentEl = $(this).parent();
        var $el = $parentEl.children().first();
        $el.append("<p> " + $parentEl.data("location") + "</p>");
    });
});

function doSomething(someArray){
    for(var i = 0; i < someArray.length; i++){
        someArray[i].hide().delay(i * 400).slideDown(300);
    }
}
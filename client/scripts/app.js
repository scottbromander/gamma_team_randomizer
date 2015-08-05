var clicks = 0;

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
}



function getObjectData(){
    $.ajax({
        url: "/data",
        success: function(data){
            console.log(data);
            $.each(data, function(key, value){
                appendToContainer(this);
            });
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
        var $el = $(this).parent();
        $el.append("<p>" + $el.data("location") + "</p>");
    });
});
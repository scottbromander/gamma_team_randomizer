var teamArray = [];
var minTeamSize = 2;
var maxTeamSize = 11;

var dataFlag = false;

var selectedTeamSize = 0;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function appendTeamSizeButtons(){
    for(var i = minTeamSize; i < maxTeamSize + 1; i++){
        var $el = $("#buttonContainer");
        $el.append("<button class='team-size-button'>" + i + "</button>");

        var $childEl = $el.children().last();

        $childEl.data("teamsize", i);
    }
    $("#buttonContainer").append("<button id='randomizeTeam'>Randomize!</button>")
}

function appendTeamContainer(teamNumber){
    $("#teamContainer").append("<div id='team" + teamNumber + "' class='team-container'>Team " + (teamNumber + 1) + "</div>");
    //$("#teamContainer").children().last().data("team", teamNumber);
}

function assignPeopleToTeam(shuffledArray){
    var teamToWrite = 0;
    for(var i = 0; i < shuffledArray.length; i++){
        writeTeamToDOM(shuffledArray[i], teamToWrite, i);
        teamToWrite++;
        if(teamToWrite >= selectedTeamSize){
            teamToWrite = 0;
        }
    }
}

function writeTeamToDOM(person, assignedTeam, index){
    $("#team" + assignedTeam).append("<p>" + person + "</p>");
    $("#team" + assignedTeam).children().last().hide().delay(index * 500).slideDown(200);
}

$(document).ready(function(){
    $.ajax({
       url: "/data",
        success: function(data){
            teamArray = data.people;
            dataFlag = true;
        }
    });

    appendTeamSizeButtons();

    $("#buttonContainer").on('click', '.team-size-button', function(){
        selectedTeamSize = $(this).data("teamsize");
    });

    $("#buttonContainer").on('click', '#randomizeTeam', function(){
        if(selectedTeamSize != 0 && dataFlag){
            teamArray = shuffle(teamArray);

            for(var i = 0; i < selectedTeamSize; i++){
                appendTeamContainer(i);
            }

            assignPeopleToTeam(teamArray);
        } else {
            alert("You need to select a team size!")
        }


    });
});
"use strict";

$(function () {
    console.log("linked Modafukka");
    let userName, createdUserName, person;
    let user = [];
    showGroup();
    createUser();
    createGroup();
    // CREATE

    function createUser() {

        $('#formUser').submit(function (e) {
            e.preventDefault();

            console.log("ftw");
            userName = $('#userName').val();
            $.ajax({
                url: 'http://127.0.0.1:3000/createUser',
                method: 'POST',
                data: {
                    userName: userName,
                    points: 0
                }
            }).done(function (data) {
                console.log(data);
            });

            $.ajax({
                url: 'http://127.0.0.1:3000/getCreatedUser',
                method: 'POST',
                dataType: 'json',
                data: {
                    userName
                }
            }).done(function (data) {
                console.log(data);
                for (let user of data) {
                    person = {
                        id: user._id,
                        userName: user.userName,
                        points: user.points

                    };
                };
            });

        });

    }

    function createGroup() {

        $('#formGroup').submit(function (e) {
            e.preventDefault();

            console.log("wtf");
            //////////////////////
            let randomNmb = Math.floor(Math.random() * 10000);
            $.ajax({
                url: 'http://127.0.0.1:3000/createGroup',
                method: 'POST',
                data: {
                    groupName: randomNmb,
                    user: person.userName
                }
            }).done(function (data) {
                console.log(data);
                $('body').append();
            });
        });


    }

    function showGroup() {
        $('#formGroup').submit(function (e) {
            e.preventDefault();
        //Make an array     
        $.ajax({
            url: 'http://127.0.0.1:3000/showGroup',
            method: 'GET'
        }).done(function (resp) {
            console.log('DONE');
            console.log(resp);
            createdGroups(resp);
        });

        // Get all the created teams 
        let createdGroups = (resp) => {
            let text = '';
        
            for (let team in resp) {
                let respTeam = resp[team];
                let groupId = respTeam._id;
                let groupBody = $('<div>');
                let pId = $(`<p id="${groupId}">`);
                console.log(respTeam + 'dit is');
                for(let data in respTeam){
                    
                    console.log(data+ 'dit is data');
                //let user = resp[team]._
                //users[].push()
                }
                for(var key in objects) {
                    var value = objects[key];
                }
                text +=` <div id=${groupId} class='allTeams'><strong> Team: </strong><ul><li>${resp[team].pokemonNr1}</li><li>${resp[team].pokemonNr2}</li><li>${resp[team].pokemonNr3}</li></ul><br></div>`;
            }

            //Add them to the teams tab
            $('#container2').append(text);
            $(".allTeams").click(function (e) {

                $(".btnPokemonUpdate").show();
                $(".btnPokemonDelete").show();

                let getId = $(this).attr("id");
                console.log(getId);
                $("#teamName").val(getId);
            });
        }
    });

}
});
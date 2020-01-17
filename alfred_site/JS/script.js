'use strict'

$(function () {
    console.log('Linked and ready Baby!');

        $(".button1").click(function (e) {
            e.preventDefault();
            console.log("chu"); 
  
            
        let userName = $(".nameField").val();
        console.log(userName);

        $.ajax({  
            url: 'http://127.0.0.1:3001/users/createUser/',
            method: 'POST', 
            data: {  
                user_name: userName
            } 

        }).done(function (result) {
            console.log(result); 
        });
            
    });  
});


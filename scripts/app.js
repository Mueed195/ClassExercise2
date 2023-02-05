"use strict";

(function () {


    function AddContact(fullName,contractNumber, emailAddress){

        let contact = new core.Contact(fullName,contractNumber,emailAddress);
        if(contact.serialize()){

            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key,contact.serialize());
        }
    }


    function DisplayHomePage(){
        // let HomeButton = document.getElementById("IndexBtn");
        // HomeButton.addEventListener("click",function () {
        //     location.href="index.html"
        // });

        // Step 1
        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html"
        });

        // Step 2,3,4
        $("main").append(`<p id="MainParagraph" class="mt-3" >This is the main paragraph</p>`);
        $("body").append(`<article class="container">
                  <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p> </article>`)

        console.log("Home Clicked")

    }


    function DisplayContactPage() {
        console.log('Contact Us Page Called!');

        let sendButton = document.getElementById("sendButton");
        let SubscribeCheckbox = document.getElementById("SubscribeCheckbox");


        sendButton.addEventListener("click", function (event) {

            if (SubscribeCheckbox.checked) {

                AddContact(fullName.value, contactNumber.value, emailAddress.value);
                // let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                // if (contact.serialize()) {
                //     let key = contact.FullName.substring(0, 1) + Date.now();
                //     localStorage.setItem(key, contact.serialize());
                // }
            }
        });

    }

    function DisplayContactListPage(){
        console.log("Contact List Page Called!");
        if (localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";  //add deserialized data from localstorage

            let keys = Object.keys(localStorage); //return a string  array  of keys
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         
                         <td class="text-center">
                         <button value="${key}" class="btn btn-primary btn-sm edit">
                                        <i class="fas fa-edit fa-sm"></i> Edit</button>
                                        
                          <td class="text-center">
                         <button value="${key}" class="btn btn-danger btn-sm delete">
                                        <i class="fas fa-trash-alt fa-sm"></i> Cancel </button>             
                         
                         
                         </td>
                         
                          </tr>`;
                index++;
            }
            contactList.innerHTML = data;

            $("#addButton").on("click",() => {
                location.href = "edit.html#add"
            });

            $("button.delete").on("click",function() {

                if(confirm("Delete Contact, please confirm")){

                    localStorage.removeItem($(this).val())
                }
                location.href = "contact-list.html"
            });

            $("#editButton").on("click",function() {
                location.href = "edit.html"+$(this).val();
            });

        }
    }


    function DisplayEditPage(){
            console.log("Edit Page")
        let page = location.hash.substring(1);

        switch(page) {
            case"add":

                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", (event) => {
                    console.log("test");
                    location.href = "contact-list.html";
                });

                break;
            default:{

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    localStorage.setItem(page,contact.serialize());

                    location.href = "contact-list.html";
                });
                $("#cancelButton").on("click", (event) => {
                    console.log("test");
                    location.href = "contact-list.html";
                });
                //edit operation code
            }
        }
    }

    function Start() {
        console.log("App Started!")

        switch (document.title) {
            case "home":
                // DisplayAboutPage();
                // DisplayContactPage();
                // DisplayProductPage();
                // DisplayServicePage();
                DisplayHomePage();
            break
            case "about":
                DisplayHomePage();
            break
            case "services":
                DisplayHomePage();
            break
            case "products":
                DisplayHomePage();
            break
            case "contact":
                DisplayContactPage();
            break
            case "Contact List":
                DisplayContactListPage();
            break
            case "Edit Contact":
                DisplayEditPage();
            break
        }

    }

    window.addEventListener("load", Start)

})();

//
// function DisplayAboutPage(){
//     let AboutUsButton = document.getElementById("AboutUsBtn");
//     AboutUsButton.addEventListener("click",function () {
//         location.href="about.html"
//     })
// }
//
//
// function DisplayProductPage(){
//     let HomeButton = document.getElementById("ProductBtn");
//     HomeButton.addEventListener("click",function () {
//         location.href="products.html"
//     })
// }
// function DisplayServicePage(){
//     let HomeButton = document.getElementById("ServicesBtn");
//     HomeButton.addEventListener("click",function () {
//         location.href="services.html"
//     })
// }
//

function newPage(page) {

  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i=i+1) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(page).style.display = "block";

}

//document.getElementById("defaultOpen").click();


function changePage(pageID) {
    var currentPage = document.querySelectorAll('div[id^="page"]');
    currentPage.forEach(function (page) {
        page.style.display = 'none';
    });

    var selectedPage = document.getElementById(pageID);
    selectedPage.style.display = 'block';
}

//function that allows users to login
function userLogin() {
    var userName = document.getElementById('username').value; //grab values from username textbox
    var userPass = document.getElementById('password').value; //grab values from password textbox
    var user; //create variable that will hold table information


        $.get("?tableName=User", function (userTable) {     //JQuery GET method to request an array of information from database
            //console.log(userTable);
            user = JSON.parse(userTable);       //converts array data to JSON

            var checkUser = user.find(function (user) {         // variable that will use find method to search array for specific values
                return user.userName === userName && user.userpassword === userPass;        //checks whether username and its corresponding password are the same 
            });

            if (checkUser) {
                alert("Login successful!"); //if both are correlated, success message
            }
            else {
                alert("Login Failed. Try again"); //if both are not correlated, failed message
            }      
            }); //end if-else

} //end function

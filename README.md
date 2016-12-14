# Library-Management-System
A typical online library management system  built using Node JS and Mongo DB and in Angular JS for front end
//mongo DB setup
1.first install a mongodb.
2.open mongod.conf file and change the settings as per your requirement.
3.start the mongod instance using following command
  mongo -f config\mongodb.conf 
   
  
//server setup
1.first install all the dependencies using following command
 npm install

2.Then run index.js to start the server

client side 
Note: since i have used angular route because of cross domain req estrictionof browser either use webserver like xampp,IS7, 
wampp or you can access in html file in file protocol  but u need to open chrome in disable security mode.

To open chrome in disable security mode use below steps.
1.Open run wimdow .
2.chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security   


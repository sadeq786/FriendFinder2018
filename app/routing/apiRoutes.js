// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    // console.log("THIS IS BEING POSTED FROM THE POST REQUEST");
    // console.log("This is the information contained in req.body", req.body);
    // console.log("USER SCORES: ", userAnswers);
    var userAnswers = req.body.scores;
    var bestFriend = "";
    var previousFriendValue = Infinity;
    for (var i = 0; i < friendsData.length; i++) {
        var difference = 0; 
        
        // console.log(`FRIEND ${i} : ===========================`);
        for (var j = 0; j < friendsData[0].scores.length; j++) {
            // console.log(`FRIEND ${i+1} ==> Answer ${j+1} : ${friendsData[i].scores[j]}`);
            difference += Math.abs(userAnswers[j] - friendsData[i].scores[j]);
        }
        console.log(`Compatibility with FRIEND ${i} ${friendsData[i].name} (lower is better): ${difference}`);
        if (difference < previousFriendValue){
            previousFriendValue = difference; 
            bestFriend = friendsData[i];
        }
    }
    console.log("\nNew Best Friend: ", bestFriend.name);
    

    res.json(bestFriend);

    
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     tableData = [];
//     waitListData = [];

//     console.log(tableData);
//   });
};

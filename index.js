#! /usr/bin/env node

//for persisting the items to a save file
var fs = require("fs");
//the list of stored key/value pairs as a json object
var items = require("./StoreItems.json");

//getting the argument parameters
var userArgs = process.argv.slice(2);
//what the user wants to do
var action = userArgs[0];

switch(action.trim().toLowerCase()){
	//add a key/value pair to the list of items
	case 'add':
		//must have 3 parameters: action, key, and value
		if (userArgs.length != 3){
			console.log("Parameters missing");
		}
		else{
			var key = userArgs[1];
			var value = userArgs[2];
			//if key already exists in list, does not add/change
			if(items.hasOwnProperty(key)){
				console.log("An item with this key (" + key + ") already exists");
			}
			else{
				items[key] = value;
				fs.writeFile('StoreItems.json', JSON.stringify(items), "utf8",  function(err) {
   					if (err) {
      					return console.error(err);
   					}
				});
				console.log(key + ": " + value + " added")
			}
		}
		break;
	//print a list of all the stored items to the console
	case 'list':
		console.log(items);
		break;
	//retreives the value associated with a specific key and prints it to the console
	case 'get':
		//must have 2 parameters: action, key
		if (userArgs.length != 2){
			console.log("Parameters missing");
		}
		else{
			key = userArgs[1];
			console.log(key.toUpperCase() + ': ' + items[key]);
		}
		break;
	//removes a specific key/value pair from storage.
	case 'remove':
		//must have 3 parameters: action, key
		if (userArgs.length != 2){
			console.log("Parameters missing");
		}
		else{
			var key = userArgs[1];
			//check if key is in list
			if(items.hasOwnProperty(key)){
				delete items[key];
				fs.writeFile('StoreItems.json', JSON.stringify(items), "utf8",  function(err) {
   					if (err) {
      					return console.error(err);
   					}
				});
				console.log(key + " removed")
			}
			else{
				console.log("Item key " + key + " does not exist");
			}
		}
		break;
	default:
		console.log("Invalid Command");
		break;
}
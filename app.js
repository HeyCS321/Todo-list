//jshint esversion:6 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// database connection or creat database

// whenever you get error on connecting in database then these two lines as it is or not except your databasename👇
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

// making a schema for our database
const itemsSchema = new mongoose.Schema ({
    name: String
});

// making collection/model for database
const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item ({
    name: "Eat"
});  

const item2 = new Item ({
    name: "Sleep"
}); 

const item3 = new Item ({
    name: "Code"
});

const item4 = new Item ({
    name: "Repeat"
});

const defaultItems = [item1, item2, item3, item4];



app.get('/', function(req, res){

    Item.find({}, (err, foundItems)=>{
    

    if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Successfully Inserted default data into items");
            }
        });
            res.redirect('/');
        
    } else {
        res.render('list', { listTitle: "Today" , newlistItems: foundItems});
    }
});

app.post('/delete', function(req, res){
   const checkedItems = req.body.checkbox ;
   Item.findByIdAndRemove(checkedItems, function(err){
    if(err)
    {
        console.log(err);
    } else {
        console.log("Successfully Deleted Item");
    }
    res.redirect('/');
   });
});
});
    /*let today = new Date()

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    let day = today.toLocaleDateString("en-US", options);*/


    


app.post('/', function(req, res){

    // Adding new item into database

    const itemName = req.body.newItem;

    const item = new Item ({
        name: itemName
    });

    item.save();
    res.redirect("/");

    /*
    items.push(item)
    console.log(items);
    */
});

app.get("/work", function(req, res){

    res.render("list", { listTitle: "Work List", newlistItems: workItems});

});

app.post("/work", function(req, res){

    const item = req.body.newItem;
    
});
 
// Dynamic custom param 
app.get('/:customParams', function(req, res){
    const param = req.params.customParams;
});

app.listen(5000, function(){
    console.log('server started on port 5000');
});

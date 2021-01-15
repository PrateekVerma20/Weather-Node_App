var express = require('express');
var request = require('request-promise');
var mongoose = require('mongoose');
var dbURI = 'mongodb+srv://netninja:test1234@cluster0.emm64.mongodb.net/express_weather?retryWrites=true&w=majority'
var app = express();

//url for weather api
var city_d = 'Chicago';

//connection with mongoose
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {console.log("db is connected")})
.catch((err) => console.log(err))

var citySchema = new mongoose.Schema({
    city: String
})

var cityModel = new mongoose.model('City',citySchema);

//var city1 = new cityModel({city : 'Las Vegas'});
//var city2 = new cityModel({city : 'Toronto'});
//var city3 = new cityModel({city : 'Chicago'});
//city2.save();

//view engine 
app.set('view engine', 'ejs')

//for the obkect passed on using post method
app.use(express.urlencoded({extended:true}));



async function getWeather(cities)//function returns promise
{
    console.log("Getweather function is called");
    var weather_data = [];
    for(var city_obj of cities)
    {
        var city = city_obj.city;
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0c7b5085f73e81688a753c72b9153714`;
        /*how to use promise.all here*/
        var response_data = await request(url);//return promise hence we are using async await

        var weather_json = JSON.parse(response_data);
        var weather = {
            city: city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            icon :weather_json.weather[0].icon
        }
        weather_data.push(weather);
    }
    return weather_data;
}

//Routes
app.get('/', function(req, res) {

    cityModel.find({}, function(err, cities) {

        getWeather(cities).then(function(results) {

            console.log(results);
            var weather_data = {weather_data : results};
            console.log("weather -data");
            console.log(weather_data);
            res.render('weather', weather_data);

        })
        .catch(function(error1){
            console.log('******************************')
            console.log(error1)
        })

    });      

});
app.post('/', function(req , res){
    console.log('***********POST************')
    console.log(req.body.city_name);
    var enter_city = new cityModel({city : req.body.city_name});
    enter_city.save()
    .then((result) => {res.redirect('/')})
    .catch((err)=>{console.log(err)})
})
/*app.get('/', function(req , res){

    cityModel.find({} , function(err, cities){
        //console.log(cities);
        getWeather(cities)
        .then(function(results){
            console.log(results);
            
            res.render('weather' , weather_data);
        });
            //console.log(typeof(results));
            //var weather_data = {weather_data : results};
            
        //.catch((err)=>{console.log("Error!!!!!!!!!!!!!!!! ");console.log(err);})
        
        
    });
    //passing object in render as argument
    //console.log(weather);
    
    
});
*/

//port to listen 
app.listen(8000);

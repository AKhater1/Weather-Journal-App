/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5069e840e9e95b7f2f573a29bd488147&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();


//Function to Get data
const getWeather = async (baseURL, zip, key) => {
    
    const res = await fetch(baseURL+zip+key)

    try{
        const data = await res.json();
        console.log(data)
        return data;
    
    } catch(error) {
        console.log("error", error);
    }
}

//Function to POST data
const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
      try {
        const newData = await response.json();
        console.log(newData);
        return newData

      }catch(error) {
      console.log("error", error);
      }
  }
  
//Click function  
document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){

    let zip = document.getElementById('zip').value;
    let feeling = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)

    .then(function(data){
        console.log(data)
        let temp = data.main.temp;
        postData('/add', {
            temp: temp, 
            feeling: feeling,
             date: newDate
        })
        .then(function(){
            updateUI()
        })
    })
    
}
    
const updateUI = async () => {
    const request = await fetch('/all');
    try{
    console.log('req', request)
    const allData = await request.json()
    console.log('allData', allData.feeling)
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees'
    document.getElementById('content').innerHTML = allData.feel
    document.getElementById('date').innerHTML = allData.date
    
    }catch(error){
    console.log("error", error);
    }
}




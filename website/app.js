/* Global Variables */
const newZip = document.getElementById('zip').value;
const newFeelings = document.getElementById('feelings').value;
const apiKey = `&appid=439d4b804bc8187953eb36d2a8c26a02&units=imperial`;
const baseUrl = `api.openweathermap.org/data/2.5/weather?zip=${newZip},us${apiKey}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//Function to Get data
const getWeather = async () => {
    const res = await fetch(baseUrl)

    try{
        const data = await res.json();
        console.log(data)
    
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
    getWeather(baseUrl)

    .then(function(data){
        console.log(data)

        postData('/add', {date: newDate, temp: temp, content: newFeelings})
    })
    .then(
        updateUI()
      )
}
    
const updateUI = async () => {
    const request = await fetch(baseUrl);
    try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;

    }catch(error){
    console.log("error", error);
    }
}




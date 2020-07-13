/* Global Variables */
const baseUrl = "api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "b9fd305eae9a841421e2d1499a94cb23";
const newZip = document.getElementById('zip').value;
const newFeelings = document.getElementById('feelings').value;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Click function 

/* Function to POST data */
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
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      }
  }
  
document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){
    getWeather(`${baseUrl}${newZip}&appid=${apiKey}`)

    .then(function(data){
        console.log(data)

        postData('/add', {date: newDate,  zip: newZip, content: newFeelings})
    })
    .then(
        updateUI()
      )
}
    
const updateUI = async () => {
    const request = await fetch('/all');
    try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;

    }catch(error){
    console.log("error", error);
    }
}


const getWeather = async () => {
    const res = await fetch(baseUrl+newZip+'&appid='+apiKey)

    try{
        const data = await res.json();
        console.log(data)
    
    } catch(error) {
        console.log("error", error);
    } 
} 


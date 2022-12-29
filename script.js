const wrapper = document.querySelector(".wrapper");
const inputpart = wrapper.querySelector(".input-part");
const infotxt = inputpart.querySelector(".info-txt");
const inputfield = inputpart.querySelector("input");
const  wicon = wrapper.querySelector(".weather-part img");
const locationbtn = inputpart.querySelector("button");
const arrowback = wrapper.querySelector("header i");

let api;

inputfield.addEventListener("keyup" , (e) =>{
    if(e.key == "Enter" && inputfield.value != ""){
        requestApi(inputfield.value);
    }
});

locationbtn.addEventListener("click" , () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess , onError);
    }else{
        alert("your browser not support geolocation api");
    }
});

function onSuccess(position) {
    const {latitude , longitude} = position.coords;
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${shubham}`;
    fetchData();

}

function onError(err) {
    infotxt.innerText = err.message;
    infotxt.classList.add("error");
}


function  requestApi(city) {
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${shubham}`;
    fetchData();
}

function fetchData() {
    infotxt.innerText = "Getting weather details...";
    infotxt.classList.add("pending");
    fetch(api)
    .then(response => response.json())
    .then(result => weatherdetails(result));
}

function weatherdetails(info) {
    infotxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        infotxt.innerText = `${inputfield.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wicon.src = "icons/clear.png";
        }else if(id >= 200 && id <= 232){
            wicon.src = "icons/storm.png";
        }else if(id >= 600 && id <= 622){
            wicon.src = "icons/snow.png";
        }else if(id >= 701 && id <= 781){
            wicon.src = "icons/haze.png";
        }else if(id >= 801 && id <= 804){
            wicon.src = "icons/cloud.png";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wicon.src = "icons/rain.png";
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);

        infotxt.classList.remove("pending", "error");
        wrapper.classList.add("active");

    }
}

arrowback.addEventListener("click" , () =>{
    wrapper.classList.remove("active");
});
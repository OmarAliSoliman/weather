window.addEventListener('load', () =>{
  let long;  //long and lat is for location
  let lat;
  let tempretureDescreption = document.querySelector('.temperature-description');
  let tempretureDegree = document.querySelector('.temperature-degree');
  let locationTimeZone = document.querySelector('.location-timezone');
  const degreeType = document.querySelector('.degree-type');
  const password = document.querySelector('#filterinput');
  const arrow = document.querySelector('.fa-arrow-down');
  const play = document.querySelector('.play');
  // let i=1;

  // const colors = [
  //   "linear-gradient(to left, #1a566b, #0e6989, #007ba8, #008ec9, #12a0eb)",
  //   "linear-gradient(to right, #1a566b, #0e6989, #007ba8, #008ec9, #12a0eb)",
  //   "linear-gradient(to left, #1a566b, #007c90, #00a39b, #00c987, #12eb54)",
  // ]

  if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/"; //proxy to allow the localhost to get api from darksky
        const api = `${proxy}https://api.darksky.net/forecast/3a35d0c064f0758947f0143008b96cc2/${lat},${long}`;

        fetch(api) //fetch data from api has alot of longitudr and latitude as normally
        .then(responce =>{
            return responce.json();  //convert it to json
        })
        .then(data =>{
            console.log(data);  
            const {temperature, summary, icon } = data.currently; //short hand for data.currently.tempreture in ES6;
            tempretureDegree.textContent = temperature;
            tempretureDescreption.textContent = summary;
            locationTimeZone.textContent = data.timezone;
            
            let celicus = (temperature - 32) * (5/9);

            setIcon(icon, document.querySelector('.icon'));

            tempretureDegree.addEventListener('click', ()=>{
              if(degreeType.textContent === "F"){
                tempretureDegree.textContent = Math.floor(celicus);
                degreeType.textContent = "C";
              }else{
                tempretureDegree.textContent = temperature;
                degreeType.textContent = "F";
              }
            })

        })
      });

      play.addEventListener('click', ()=>{
        password.style.visibility = "visible";
        arrow.style.visibility = "visible";
      })

      arrow.addEventListener('click', function () {
        if(password.value === "suty11" || password.value === "Suty11"){
          locationTimeZone.textContent = "Heart";
          tempretureDegree.textContent="1";
          degreeType.textContent = "Love";
          tempretureDescreption.textContent ="With all my Love";
          document.body.style.background = "linear-gradient(to right, #c62c46, #d23057, #dc3669, #e63d7c, #ee468f)";
          setIcon("rain", document.querySelector('.icon')); //icon id , place
        }
      })
   }

  //  document.body.addEventListener('click', ()=>{
  //    if(i==3){
  //     i=0;
  //    }
  //    bgcolor(colors[i]);
     
  //  })

  //  function bgcolor(myColor){
  //    document.body.style.background = myColor;
  //    i++;
  //  }
   
   function setIcon(icon, iconClass){
    const skycons = new Skycons({"color": "white"});
     const myIcon = icon.replace(/-/g,"_").toUpperCase();
     skycons.play();
     return skycons.add(iconClass, Skycons[myIcon]);
   }

});

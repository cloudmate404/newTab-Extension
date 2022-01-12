const settings =  document.getElementById('settings');
const popUp = document.querySelector('.popUp');
const saveBtn = document.getElementById('saveBtn');
const photoInput = document.getElementById('photoInput');
const cryptoInput = document.getElementById('cryptoInput');
const closeSettings = document.getElementById('close');

let photos ='food'
let crypto ='bitcoin'



function hideSettings(){
    popUp.id = 'hide';
};

function showSettings(){
    popUp.id = 'show';
};

settings.addEventListener('click', showSettings);

closeSettings.addEventListener('click', hideSettings);

// function initialPopup(){
//     gsap.set(popUp,{scale:0});

// };

// initialPopup();



// function popping(){
//     gsap.fromTo(popUp,{
//         opacity:0, scale: 0
//     },{
//         opacity: 1, scale: 1, delay:2, duration:0.4, ease: Power1.easeOut
//     });
// }

// function popOut(){
//     gsap.to(popUp,{
//         opacity:0, scale:0, duration:0.3, ease: Power1.easeOut
//     });
// };

// settings.addEventListener('click', openSettings);

// function openSettings(){
//     gsap.fromTo(settings,{
//         rotation: '0deg' 
//     },{
//         rotation: '360deg', duration: 2, ease: Power1.easeOut
//     });

//     popping()
// }


const getPhotos = async (photos) => {

    const base = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape';
    const query = `&query=${photos}`
    
    try{
        const response =  await fetch(base + query);
        const data = await response.json();
        console.log(data);
        document.body.style.backgroundImage = `url(${data.urls.full})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    }catch(error){
        console.log(error)
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    }
    

}

getPhotos(photos);


const getCrypto = async (crypto) => {
    const base = 'https://api.coingecko.com/api/v3/coins/';
    const query = `${crypto}`

    try{
        const response =  await fetch(base + query);
        const data = await response.json();
        document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
    document.getElementById("crypto-bottom").innerHTML = `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
    `
    }catch(error){
        console.log(error)
        document.getElementById('crypto-top').innerHTML = "please check your spelling";
        document.getElementById("crypto-bottom").innerHTML =``
    }
}

getCrypto(crypto);

// fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${photos}`)
//     .then(res => res.json())
//     .then(data => {
//         document.body.style.backgroundImage = `url(${data.urls.full})`
// 		document.getElementById("author").textContent = `By: ${data.user.name}`
//     })
//     .catch(err => {
       
//         document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
// 		document.getElementById("author").textContent = `By: Dodi Achmad`
//     })

// fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
//     .then(res => {
//         if (!res.ok) {
//             throw Error("Something went wrong")
//         }
//         return res.json()
//     })
//     .then(data => {
//         document.getElementById("crypto-top").innerHTML = `
//             <img src=${data.image.small} />
//             <span>${data.name}</span>
//         `
//         document.getElementById("crypto").innerHTML += `
//             <p>🎯: $${data.market_data.current_price.usd}</p>
//             <p>👆: $${data.market_data.high_24h.usd}</p>
//             <p>👇: $${data.market_data.low_24h.usd}</p>
//         `
//     })
//     .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000);




// navigator.geolocation.getCurrentPosition(position =>{
//    async() =>{
//         const base = 'https://apis.scrimba.com/openweathermap/data/2.5/weather'
//         const query = `?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    
//         try{
//             const response = await fetch(base + query);
//             const data = response.json();
//             console.log(data)
//             const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
//             document.getElementById("weather").innerHTML = `
//                 <img src=${iconUrl} />
//                 <p class="weather-temp">${Math.round(data.main.temp)}º</p>
//                 <p class="weather-city">${data.name}</p>
//             `
//         } catch(error){
//             console.log(error);
            
//         }
//     }
// })


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});



saveBtn.addEventListener('click',()=> {

    
    photos = photoInput.value;
    crypto = cryptoInput.value.toLowerCase();

    getCrypto(crypto);


    getPhotos(photos);


    hideSettings();

    cryptoInput.value =''
    photoInput.value =''

    
   
})


closeSettings.addEventListener('click', ()=>{
    popOut();
})

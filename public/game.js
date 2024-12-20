const backgroundImage = new Image();
backgroundImage.src = 'assets/main-menu.png'

backgroundImage.onload = () => {
     
    document.body.style.backgroundImage = `url(${backgroundImage.src})`;
    document.body.style.backgroundSize = "cover";  
    document.body.style.backgroundPosition = "center";  
    document.body.style.backgroundRepeat = "no-repeat";  

    
    document.body.style.height = "100vh";
    document.body.style.margin = "0";  


};

const playBtnDay = document.getElementById('btn-day')
playBtnDay.addEventListener('click',()=>{
    window.location.href = '/game-day'
})

const playBtnNight = document.getElementById('btn-night')
playBtnNight.addEventListener('click',()=>{
    window.location.href = '/game-night'
})
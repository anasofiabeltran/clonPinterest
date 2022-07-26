users={};
numberUsers=20;


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

async function userApi(id){
    try{
        const API = await fetch('https://randomuser.me/api/')
        console.log(API.status);
        const res = await API.json()
        users[id]=[`${res.results[0].name.first} ${res.results[0].name.last}`,res.results[0].picture.thumbnail]
    }catch{
        users[id]=[`desconocido`,'./assets/icons/user.png']
    }
    
}



function uploadImages(image,name,div,user){
    const spaceImage = document.createElement('div');
    const spaceDescription = document.createElement('div');
    const descriptionImage = document.createElement('p')
    const imaUser = document.createElement('img')
    const img = document.createElement('img');


    img.src=image;
    imaUser.src=user;
    imaUser.className='imageUser';
    descriptionImage.textContent=`pokemon: ${name}`;


    spaceDescription.append(imaUser,descriptionImage);
    spaceImage.append(img,spaceDescription);
    
    div.append(spaceImage);
}


function api(div,users){
    
    for(let i=1; i<300; i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(res => res.json())
        .then(data => {
                uploadImages(data.sprites.front_default,data.forms[0].name,div,users[getRndInteger(0, numberUsers)][1]);
        })

    }
}

async function load(){
    const div = document.querySelector('.principalContainer');
    for(let i=0; i<numberUsers; i++){
        div.innerHTML=`<h3>Cargando ${i}/${numberUsers}...</h3>`;
        await userApi(i);
    }
    div.innerHTML='';
    api(div,users);
}

load();
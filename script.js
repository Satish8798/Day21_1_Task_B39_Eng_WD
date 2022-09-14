//function to return players list json data
function getBdlPlayersData(){ 
    try {
        const playersData= fetch('https://www.balldontlie.io/api/v1/players'); //using fetch to retrieve data
        console.log(playersData)
        
        /* returning json data using then if resloved 
            or else returning error if rejected */
         return playersData.then(response=>response.json()).then(data=>data).catch(error=>{ 
            console.log(error)
            return error;
         })
    } catch (error) {
        console.log(error);
    }
}

//function to display the players data on webpage
function displayBdlPlayersData(){
    
    //creating a promise 
    const playersData=new Promise((resolve,reject)=>{
        let data= getBdlPlayersData();
        console.log(data);
        if(data){
            resolve(data);
        }else{
            reject(error);
        } 
    })

    //accessing the div element where data is to be displayed
    let displayPlayersDiv = document.querySelector(".display-data"); 

    displayPlayersDiv.innerHTML="";

    //chaining then to proceed with further steps
    playersData.then(playersData=>{
        console.log(playersData);
        playersData.data.forEach(player=>{
            displayPlayersDiv.innerHTML+=`
            <div class="player-card">
                <h4 class=name>${player.first_name} ${player.last_name}</h4>
                <p> Position : ${player.position}</p>
                <p>Team : ${player.team.full_name}</p>
                <p>city : ${player.team.city}</p>
                <p>division : ${player.team.division}</p>
            </div>
        `
        })
    }).catch(error=>{   //chaining with catch at end if any error occurs
        console.log(error);
    })
}
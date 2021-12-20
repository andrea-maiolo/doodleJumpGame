document.addEventListener('DOMContentLoaded' , ()=>{

    const grid= document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let startingPoint = 150;
    let doodlerBottomSpace = startingPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId
    let downTimerId
    let isJumping = true

    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left
        doodler.style.left =  doodlerLeftSpace + "px";
        doodler.style.bottom = doodlerBottomSpace +"px";
    }

    class Platform{
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left +"px"
            visual.style.bottom = this.bottom +'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms(){
        for (let i = 0; i < platformCount; i++) {
            let platformGap = 600/platformCount
            let newPlatformBottom = 100 + i * platformGap
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
            console.log(platforms)
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace > 200){
            platforms.forEach(p=>{
                p.bottom -=4;
                let visual = p.visual
                visual.style.bottom = p.bottom +'px'
            })
        }
    }

    function jump(){
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function(){
            doodlerBottomSpace +=20
            doodler.style.bottom = doodlerBottomSpace +'px';
            if(doodlerBottomSpace > startingPoint +200){
                fall()
                isJumping = false
            }
        },30)
    }

    function fall(){
        isJumping =false
        clearInterval(upTimerId)
        downTimerId = setInterval(function(){
            doodlerBottomSpace -=5;
            doodler.style.bottom = doodlerBottomSpace +'px';
            if(doodlerBottomSpace <=0){
                gameOver()
            }
            platforms.forEach(p =>{
                if(
                    (doodlerBottomSpace >= p.bottom)&&
                    (doodlerBottomSpace <= p.bottom+15)&&
                    ((doodlerLeftSpace +65) >= p.left)&&
                    (doodlerLeftSpace <= (p.left +85))&&
                    !isJumping
                ){
                    console.log("landed")
                    startingPoint = doodlerBottomSpace
                    jump()
                }
            })
          
        },30)
    }

    function gameOver(){
        console.log('game over')
        isGameOver = true;
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    // function moveLeft(){}

    function control(){
        if(e.key === "ArrowLeft"){
            //move left
        }else if (e.key === "arrowRigth"){
            //move right
        }else if(e.key ==="ArrowUp"){
            //move straight
        }
    }

    function start(){
        if(!isGameOver){
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30);
            jump(startingPoint)
        }
    }
    //create a button for this 
    start()
});
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
    let leftTimerId
    let rightTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let score = 0


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
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace > 200){
            platforms.forEach(p=>{
                p.bottom -=4;
                let visual = p.visual
                visual.style.bottom = p.bottom +'px'

                if(p.bottom < 10){
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
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
        while(grid.firstChild){
         grid.removeChild(grid.firstChild)   
        }
        grid.innerHTML = score
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        clearInterval(upTimerId)
        clearInterval(downTimerId)

    }

    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight =false
        }
        isGoingLeft =true
        leftTimerId = setInterval(function(){
            if(doodlerLeftSpace >=0){
                doodlerLeftSpace -=5
                doodler.style.left = doodlerLeftSpace +'px';
            }else{ moveRight()}
        },30)
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerId)
            isGoingLeft =false
        }
        isGoingRight =true
        rightTimerId = setInterval(function(){
            if(doodlerLeftSpace <= 340){
                doodlerLeftSpace +=5
                doodler.style.left = doodlerLeftSpace +'px';
            }else{ moveLeft()}
        },30)
    }

    function moveStraight(){
            clearInterval(leftTimerId)
            clearInterval(rightTimerId)
            isGoingLeft =false
            isGoingRight =false
    }

    function control(e){
        console.log(e.key)
        if(e.key === 'ArrowLeft'){
            moveLeft()
        }else if (e.key === 'ArrowRight'){
            moveRight()
        }else if(e.key ==='ArrowUp'){
            moveStraight()
        }
    }

    function start(){
        if(!isGameOver){
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30);
            jump(startingPoint)
            document.addEventListener('keyup', control)
        }
    }
    //create a button for this 
    start()
});
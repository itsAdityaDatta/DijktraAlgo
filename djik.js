
  var len=66;
  var brt=26;
  var box = 20;
  var count = 0;
  var starti;
  var startj;
  var endi;
  var endj;
  var pooli;
  var poolj;
  var poolCount = 0;
  var initCount = 0;
  var unable = 0;
  var speed =15;

  var balls = new Array(len);
  for(var i=0;i<len;i++){
    balls[i] = new Array(brt);
  }

  function setup()
  {
    var canvas = createCanvas(1340, 534);
    canvas.parent("canvasDiv");
    for(var i=0;i<len;i++){
      for(var j=0;j<brt;j++){
        balls[i][j] = {
          x : box*i+10,
          y : box*j+6,
          status : 0,
          dist : 9999,
          active : false,
          display: function(){

            if(this.active == false){
              fill(255,255,255);
              stroke(0,150,150);

              if(this.status == 1){
                fill(0,235,0,175);
                stroke(0,150,0);
              }

              if(this.status == 2){
                fill(0,150,150,155);
                stroke(0,150,0);
              }

            }
            else{
              if(this.status == 0){
                fill(0,0,0);
                stroke(0,0,0);

              }
              else if(this.status == 1){
                fill(0,0,190);
                stroke(0,0,80);
              }
              else if(this.status == 2){
                fill(170,0,0);
                stroke(120,0,0);
              }

              else if(this.status == 3){
                fill(0,170,0);
                stroke(0,0,0);
              }

            }
            strokeWeight(1);
              var aRect = rect(this.x,this.y,box,box);
              
          }
        }
      }
    }

    for(var k=0;k<len;k++){
      for(var l=0;l<brt;l++){
        if(k == 0 || k==len-1 || l==0 || l== brt-1){
          balls[k][l].active = true;
        }

      }
    }

  }

  function draw()
  {
    clear();
    for(var k=0;k<len;k++){
      for(var l=0;l<brt;l++){
        balls[k][l].display();
      }
    }

  }
  function mouseClicked()
  {
    mouseDragged()
  }

  function mouseDragged()
  {
    for(var i=0;i<len;i++){
      for(var j=0;j<brt;j++){
        if(balls[i][j].x < (mouseX) && balls[i][j].x > (mouseX-box) && balls[i][j].y < (mouseY) && balls[i][j].y > (mouseY-box)){
         
         if(balls[i][j].active == false){
            if(count == 0)
            {
              endi = i;
              endj = j;
              balls[i][j].status = 2;
              balls[i][j].active = true;
              count++;
            }
            else if(count == 1)
            {
              starti = i;
              startj = j;
              balls[i][j].status = 1;
              balls[i][j].active = true;
              document.getElementById('canvasDiv').style.cursor = 'default';
              count = 3;
            }
            else if(count==2){
              balls[i][j].status = 0;
              balls[i][j].active = true;
            }

            else if(count == 6){
              pooli = i;
              poolj = j;
              balls[i][j].status = 3;
              balls[i][j].active = true;
              document.getElementById('canvasDiv').style.cursor = 'default';
              count = 3;
              poolCount = 1;
            }

         }

         else if(balls[i][j].active == true && count == 5 && balls[i][j].status == 0 && i!= 0 && i!=len-1 && j != 0 && j!= brt-1){ // eraseWalls
            balls[i][j].active = false;

         }
          
        }
      }
    }
  }




  function assign(i,j){
    
    if(i<=0 || i>=len-1 || j<=0 || j>=brt-1){
      return;
    }
    if(balls[i-1][j].active == false ){
      if(balls[i-1][j].dist > (balls[i][j].dist + 1) ){
         balls[i-1][j].dist = balls[i][j].dist + 1;
         assign(i-1,j);
      }
    }

    if(balls[i][j-1].active == false ){
      if(balls[i][j-1].dist > (balls[i][j].dist + 1) ){
         balls[i][j-1].dist = balls[i][j].dist + 1;
         assign(i,j-1);
      }
    }


    if(balls[i+1][j].active == false ){
      if(balls[i+1][j].dist > (balls[i][j].dist + 1) ){
         balls[i+1][j].dist = balls[i][j].dist + 1;
         assign(i+1,j);
      }
    }

    if(balls[i][j+1].active == false ){
      if(balls[i][j+1].dist > (balls[i][j].dist + 1) ){
         balls[i][j+1].dist = balls[i][j].dist + 1;
         assign(i,j+1);
      }
    }
  }




  var pathD = 0;
  var pathD2 = 0;
  

  var finalPathD = 0;
  function path(i,j){
    console.log(i,j);
    if(balls[i][j].dist == 0){
      balls[i][j].status = 2;
      if(pathD!=0){
         
          if(initCount == 0){
            pathD2 = pathD;
            initCount ++;
          }
          if(unable == 0){

            if(poolCount == 0){
               $("#myModal").modal();
              document.getElementById('modal-title').innerHTML= 'DISTANCE';
              document.getElementById('modal-body').innerHTML= '<br>&nbsp&nbsp  ' + pathD2 + ' Blocks';
              document.getElementById('noise').play();
              pathD = 0; 
            }
             else if (poolCount != 0){

                if(boobCount == 0){
                  boobCount = 1;
                  for(var i=0;i<len;i++){
                    for(var j=0;j<brt;j++){
                      balls[i][j].dist = 9999;
                    }
                  }
                  poolCount = 2;
                  balls[starti][startj].dist = 0;
                  assign(starti,startj);
                  path(pooli,poolj);
                  pathD = 0; 
                 
                }
                else if(boobCount == 1){
                   $("#myModal").modal();
                  var sum = pathD2 + pathD + 1;
                  document.getElementById('modal-title').innerHTML= 'DISTANCE';
                  document.getElementById('modal-body').innerHTML= '<br>&nbsp&nbsp  ' + sum + ' Blocks';
                  document.getElementById('noise').play();
                  count = 4;
                  document.getElementById('canvasDiv').style.cursor = 'default';    
                }
            }
          }
        }

      return;
    }

    var minD = Math.min(balls[i+1][j].dist,balls[i-1][j].dist,balls[i][j-1].dist,balls[i][j+1].dist);
    if(minD !=9999){
      if(balls[i-1][j].dist == minD){
        balls[i-1][j].status = 1;
        if(poolCount == 2){
          balls[i-1][j].status = 2;
        }
        pathD++;
        setTimeout(function(){path(i-1,j);},speed);
      }

      else if(balls[i+1][j].dist == minD){
        balls[i+1][j].status = 1 ;
        if(poolCount == 2){
          balls[i+1][j].status = 2;
        }
        pathD++;
        setTimeout(function(){path(i+1,j);},speed);
      }
      else if(balls[i][j-1].dist == minD){
        balls[i][j-1].status = 1;
        if(poolCount == 2){
          balls[i][j-1].status = 2;
        }
        pathD++;
        setTimeout(function(){path(i,j-1);},speed);
      }
      else if(balls[i][j+1].dist == minD){
        balls[i][j+1].status = 1;
        if(poolCount == 2){
          balls[i][j+1].status = 2;
        }
        pathD++;
        setTimeout(function(){path(i,j+1);},speed);
      }
    }

    else if(minD == 9999){
     $("#myModal").modal();
          document.getElementById('modal-title').innerHTML= 'SORRY';
          document.getElementById('modal-body').innerHTML= '<br>&nbsp&nbsp  Unable to reach destination';
          document.getElementById('noise').play();
          unable = 1;
          pathD = 0; 
      
    }


  }
  var uberBug = 0;
  var boobCount = 0;
  function Init(){
    uberBug = 1;
    document.getElementById('WB').style.border = 'none';
    document.getElementById('EW').style.border = 'none';
    document.getElementById('UP').style.border = 'none';

    if(poolCount ==0){
      balls[starti][startj].dist = 0;
      assign(starti,startj);
      path(endi,endj);
      count = 4;
      document.getElementById('canvasDiv').style.cursor = 'default';
    }

    else{
      
        balls[pooli][poolj].dist = 0;
        assign(pooli,poolj);
        path(endi,endj);
        count = 4;
        document.getElementById('canvasDiv').style.cursor = 'default';
        
    }




  }

  function clearAll(){
    count = 0;
    poolCount = 0;
    initCount = 0;
    unable =0;
    uberBug=0;

    starti = 9999;
    endi = 9999;
    startj = 9999;
    endj = 9999;
    pathD = 0;
    pathD2 = 0;
    boobCount = 0;
    document.getElementById('canvasDiv').style.cursor = 'pointer';

    document.getElementById('WB').style.border = 'none';
    document.getElementById('EW').style.border = 'none';
    document.getElementById('UP').style.border = 'none';
    
    for(var i=0;i<len;i++){
      for(var j=0;j<brt;j++){
        balls[i][j] = {
          x : box*i+10,
          y : box*j+6,
          status : 0,
          dist : 9999,
          active : false,
          display: function(){

            if(this.active == false){
              fill(255,255,255);
              stroke(0,150,150);

              if(this.status == 1){
                fill(0,235,0,175);
                stroke(0,100,0);
              }

              if(this.status == 2){
                fill(0,150,150,155);
                stroke(0,150,0);
              }


            }
            else{
              if(this.status == 0){
                fill(0,0,0);
                stroke(0,0,0);

              }
              else if(this.status == 1){
                fill(0,0,190);
                stroke(0,0,80);
              }
              else if(this.status == 2){
                fill(170,0,0);
                stroke(120,0,0);
              }

              else if(this.status == 3){
                fill(0,170,0);
                stroke(0,0,0);
              }


            }
            strokeWeight(1);
            var aRect = rect(this.x,this.y,box,box);
          }
        }
      }
    }

    for(var k=0;k<len;k++){
      for(var l=0;l<brt;l++){
        if(k == 0 || k==len-1 || l==0 || l== brt-1){
          balls[k][l].active = true;
        }

      }
    }

  }

  function wall(){

    document.getElementById('WB').style.border = 'solid 4px black';
    document.getElementById('EW').style.border = 'none';
    document.getElementById('UP').style.border = 'none';

    if(count == 3 || count == 5 || count == 7 ||count ==6){
      document.getElementById('canvasDiv').style.cursor = 'pointer';
      count = 2;
    }

  }

  function erase(){
    document.getElementById('WB').style.border = 'none';
    document.getElementById('EW').style.border = 'solid 4px black';
    document.getElementById('UP').style.border = 'none';

    if(count == 2 || count == 3 || count == 7 || count == 6){
      document.getElementById('canvasDiv').style.cursor = 'pointer';
      count = 5;
    }

  }

  function pool(){
   document.getElementById('UP').style.border = 'solid 4px black';
    document.getElementById('EW').style.border = 'none';
    document.getElementById('WB').style.border = 'none';

    if(poolCount == 0 && count >=2 && uberBug==0){
      count = 6;
      document.getElementById('canvasDiv').style.cursor = 'pointer';
    }
    else if(poolCount == 0 && count <2 && uberBug==0){
      return;
    }
    else{ 
      document.getElementById('canvasDiv').style.cursor = 'default';
      count = 7;
    }
  }

  function instruc(){
    $("#myModal2").modal();
  }
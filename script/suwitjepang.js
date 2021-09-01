let skor = document.querySelector('.score > .count');
let hiSkor = document.querySelector('.highscore > .count');
let skorWrap = document.querySelector('.score');
let highScoreWrap = document.querySelector('.highscore');
let player='',end='',count=0,ex=0,highScore=0;


//add the score in the 'skor' variable
function last(count){
    skor.innerHTML = count;
}

//add highscore in the 'hiSkor' variable
function high(count) {
    //count == 'skor' variable
    if(count > highScore){
        highScore = count;
        hiSkor.innerHTML = highScore;
    }
}

//all program / start game when button 'MULAI' is clicked by player
function main(){
    skorWrap.style.display = "flex";
    highScoreWrap.style.display = "flex";
swal.fire({
    allowOutsideClick:false,
    imageUrl:"images/head.svg",
    title:"Selamat Datang Di Game Suwit Jawa",
    showCancelButton:true,
    cancelButtonText:'<i class="fas fa-times"></i> Keluar',
    reverseButtons:true,
    imageWidth:250,
    customClass:{
        title:"title",
        actions:"end",
        cancelButton:"cancel",
    }
}).then((result)=>{
  if(result.isConfirmed){
      rules();
  }
  else{
    skorWrap.style.display = "none";
    highScoreWrap.style.display = "none";
      swal.close()
  }
})

//game rules section
function rules() {
    swal.fire({
        title:"Ketentuan Jika anda :",
        html:'<b>Menang : Lanjut Bermain</b>' + '<br>' +'<b>Seri : Pertanyaan</b>' +'<br>' + '<b>Kalah : Keluar</b>',
        showCloseButton:true,
        allowOutsideClick:false,
        imageUrl:"images/compliant.png",
        customClass:{
            title:"title",
            container:"text",
        }
    }).then((result)=>{
        if(result.isConfirmed){
            start();
        }
        else if(result.dismiss == Swal.DismissReason.close){
            star();
        }
    })
}

//player choosing his choice : scissor rock or paper
function start(){    
    swal.fire({
        title:"Tentukan pilihan anda :",
        allowOutsideClick:false,
        imageUrl:"images/confused.png",
        customClass:{
            title:"title",
            actions:"end"
        },
        input:"radio",
  inputOptions:{
      'Manusia': "Manusia",
      'Gajah': "Gajah",
      'Semut':"Semut"
  },
  inputValidator: (value) => {
      player = value;
      if(!player){
          return 'Pilih salah satu , tidak boleh kosong!'
      }
  }
    }).then((result)=>{
        if(result.isConfirmed){
            // Every time the player clicks the OK button the computer will choose his choice randomly
            let comp = Math.round(Math.random()*6)+1;
            if(comp < 3){
                comp = 'Manusia';
            }
            else if(comp < 5 && comp > 2){
                comp = 'Gajah';
            }
            else {
                comp = 'Semut';
            }
            flow(player,comp)
            condition(player,comp,end,ex)
        }
    })
}

//get results from a comparison of player and computer options
function flow(player,comp){
    if(player == comp){
        end = 'SERI !'
    }
    else if(player == 'Manusia'){
       end = (comp == 'Gajah') ? 'KALAH !' : 'MENANG !';
    }
    else if(player == 'Gajah'){
        end = (comp == 'Manusia') ? 'MENANG !' : 'KALAH !';
    }
    else if(player == 'Semut'){
        end = (comp == 'Gajah') ? 'MENANG !' : 'KALAH !';
    }
}

//check a condition for add a score
function condition(player,comp,end,ex){
    if(end == 'SERI !'){
        ex=2;
        overlay(player,comp,end,ex)
        count+=1;
        last(count)
        skorWrap.classList.add('plus');
        setTimeout(() => {
            skorWrap.classList.remove('plus');
        }, 150);
    }
    else if(end == 'MENANG !'){
        count+=3;
        last(count)
        skorWrap.classList.add('plus');
        setTimeout(() => {
            skorWrap.classList.remove('plus');
        }, 150);
        ex=1;
        overlay(player,comp,end,ex)
    }
    else if(end == 'KALAH !'){
        overlay(player,comp,end,ex)
        if(count > 0){
            count-=1;
            last(count)
            skorWrap.classList.add('minus');
            setTimeout(() => {
                skorWrap.classList.remove('minus');
            }, 150);
        }
    }
}

//show a results win lose or draw
function overlay(player,comp,end,ex){
    if(end == 'MENANG !' || end == 'KALAH !'){
        swal.fire({
            allowOutsideClick:false,
            imageUrl:"images/"+ end + ".png",
            title:"ANDA "+ end,
            text:"Anda memilih " + player + ", Komputer memilih " + comp ,
            customClass:{
                title:"title",
                container:"text",
                popup:"bg" + `${ex}`,
            }
        }).then((result)=>{
            if(result.isConfirmed){
                if(end == 'MENANG !'){
                    start();
                }
                else{
                    high(count)
                    star()
                }
            }
        })
    }
    else{
        swal.fire({
            allowOutsideClick:false,
            imageUrl:"images/"+ end + ".png",
            title: "HASIL " + end,
            reverseButtons:true,
            showCancelButton:true,
            cancelButtonText:'<i class="fas fa-times"></i> Keluar',
            text:"Anda memilih " + player + " Komputer memilih " + comp ,
            confirmButtonText:'Lanjut',
            customClass:{
                title:"title",
                container:"text",
                cancelButton:"cancel",
                actions:"full",
                popup:"bg" + `${ex}`,
            }
        }).then((result)=>{
            if(result.isConfirmed){
                start();
            }
            else{
                high(count)
                star()
            }
        })
    }
}
}

//popup or display for the results section of the player's score
function score(ex){
    swal.fire({
        title:"Skormu : " + count,
        allowOutsideClick:false,
        imageUrl:"images/score.png",
        showCancelButton:true,
        cancelButtonText:'<i class="fas fa-redo-alt"></i> Ulang',
        reverseButtons:true,
        html:
        `<img src="images/${ex}.png" widht="50" height="50">`,
        customClass:{
            title:"title",
            actions:"full",
            cancelButton:"cancel",
        }
    }).then((result)=>{
        if(result.isConfirmed){
            count=0;
            last(count)
            skorWrap.style.display = "none";
            highScoreWrap.style.display = "none";
        }
        else{
            count=0;
            last(count)
            main()
        }
    })
}

//a function to check the total score and display a star image according to the score
function star(ex){
    if(count >= 0 && count <=3){
        ex=1;
        score(ex);
    }
    else if(count >= 4 && count <=7){
        ex=2;
        score(ex);
    }
    else if(count >= 8 && count <=11){
        ex=3;
        score(ex);
    }
    else if(count >= 12 && count <=15){
        ex=4;
        score(ex);
    }
    else if(count >=16){
        ex=5;
        score(ex);
    }
}

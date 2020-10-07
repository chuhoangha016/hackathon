const card1 = document.getElementById("card1")
const card2 = document.getElementById("card2")
const card3 = document.getElementById("card3")
const button = document.getElementsByTagName("button")[0]
const block = document.getElementById("block")

var slot1 = {pos:card1.getBoundingClientRect().left,
            card: card1}
var slot2 = {pos:card2.getBoundingClientRect().left,
            card: card2}
var slot3 = {pos:card3.getBoundingClientRect().left,
            card: card3}

var slots = [slot1,slot2,slot3]

card1.addEventListener("click",function(){
    block.style.display = "block"
    console.log("card1: lose")
    card1.style.transform = "rotateY(" + "180" + "deg)"
    setTimeout(function(){
        card2.style.transform = "rotateY(" + "180" + "deg)"
        card3.style.transform = "rotateY(" + "180" + "deg)"
        button.disabled = false
    },500)
})

card2.addEventListener("click",function(){
    block.style.display = "block"
    console.log("card2: win")
    card2.style.transform = "rotateY(" + "180" + "deg)"
    setTimeout(function(){
        card1.style.transform = "rotateY(" + "180" + "deg)"
        card3.style.transform = "rotateY(" + "180" + "deg)"
        button.disabled = false
    },500)
})

card3.addEventListener("click",function(){
    block.style.display = "block"
    console.log("card3: lose")
    card3.style.transform = "rotateY(" + "180" + "deg)"
    setTimeout(function(){
        card1.style.transform = "rotateY(" + "180" + "deg)"
        card2.style.transform = "rotateY(" + "180" + "deg)"
        button.disabled = false
    },500)
})

button.addEventListener("click", function(){
    button.disabled = true
    block.style.display = "block"
    count = 0
    card1.style.transform = "rotateY(" + "180" + "deg)"
    card2.style.transform = "rotateY(" + "180" + "deg)"
    card3.style.transform = "rotateY(" + "180" + "deg)"
    setTimeout(function(){
        card1.style.transform = "initial"
        card2.style.transform = "initial"
        card3.style.transform = "initial"
        setTimeout(move,500)
    },1000)
})

function move(){
    count++
    var rand1 = Math.floor(Math.random()*3)
    var rand2 = Math.floor(Math.random()*3)
    while (rand1==rand2) {
        rand2 = Math.floor(Math.random()*3)
    }
    if (rand1<rand2) {
        moving1 = slots[rand1]
        moving2 = slots[rand2]
    } else {
        moving1 = slots[rand2]
        moving2 = slots[rand1]
    }

    var time = 0;
    speedX = (moving2.pos-moving1.pos)/20
    var id = setInterval(frame, 10);
    function frame() {
        if (time == 20) {
            clearInterval(id);
            temp = slots[rand2].card
            slots[rand2].card = slots[rand1].card
            slots[rand1].card = temp
        } else {
            time++; 
            moving1.card.style.left = moving1.pos + speedX*time + "px"
            moving2.card.style.left = moving2.pos - speedX*time + "px"
        }
    }
    if (count<10) { setTimeout(move,270) }
    else {
        setTimeout(function(){
            block.style.display = "none"
        },210)
    }
}
// swarm

var rand = function(){ return 0|( Math.random()*500 ) }

// init entities
const l=350
entities = []
for( var i=l;i--;)
    entities[i]={x:rand(), y:rand(), target:3, vx:0, vy:0, color:rand()%2}

var honeyPot = [
    {x:100, y:100},
    {x:140, y:100},
    {x:412, y:153},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:130, y:360},
]

// loop
var loop = function(){

    // fly
    for( var i=l;i--;){

        var ax = 0
        var ay = 0

        var Ox = entities[i].x
        var Oy = entities[i].y

        for( var j=l;j--;)
            if(i!=j){
                var OUx = Ox - entities[j].x
                var OUy = Oy - entities[j].y

                var d = Math.max( 1, OUx*OUx + OUy*OUy )

                var k = entities[j].color == entities[i].color ? 0.2 : 2

                ax += k*OUx/(d*Math.sqrt(d))
                ay += k*OUy/(d*Math.sqrt(d))

            }

        var OUx = honeyPot[ entities[i].target ].x - Ox
        var OUy = honeyPot[ entities[i].target ].y - Oy

        var d = Math.max( 0.1, OUx*OUx + OUy*OUy )

        ax += 0.05*OUx/Math.sqrt(d)
        ay += 0.05*OUy/Math.sqrt(d)

        entities[i].vx = entities[i].vx * 0.9 +  ax * 0.2
        entities[i].vy = entities[i].vy * 0.9 +  ay * 0.2

        entities[i].x += entities[i].vx * 18
        entities[i].y += entities[i].vy * 18

        if ( d < 26 )
            entities[i].target = entities[i].target > 1 ? entities[i].color : rand()%(honeyPot.length-2)+2
    }

    //draw
    c.clearRect(0,0,500,500)
    for( var i=l;i--;){
        c.beginPath()
        c.fillStyle= entities[i].color ? '#123534' : '#abc214'
        c.strokeStyle= entities[i].color ? '#123534' : '#abc214'
        c.arc( entities[i].x, entities[i].y, 2, 0, 6.28 )
        c.fill()
        c.beginPath()
        c.moveTo(entities[i].x, entities[i].y)
        c.lineTo(entities[i].x - entities[i].vx * 50, entities[i].y - entities[i].vy * 50)
        c.stroke()

    }

    for( var i=honeyPot.length;i--;){
        c.strokeStyle= i>1 ? '#ab4135' : i ? '#123534' : '#abc214'
        c.beginPath()
        c.arc( honeyPot[i].x, honeyPot[i].y, 16, 0, 6.28 )
        c.stroke()
    }

    // loop
    requestAnimationFrame( loop )
}
loop()

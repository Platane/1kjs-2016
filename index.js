// swarm

var rand = function(){ return 0|( Math.random()*500 ) }

// init entities
entities = []
for( var i=100;i--;)
    entities[i]={x:rand(), y:rand(), target:rand()%4, vx:0, vy:0}

var honeyPot = [
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
]

// loop
var loop = function(){

    // fly
    for( var i=100;i--;){

        var ax = 0
        var ay = 0

        var Ox = entities[i].x
        var Oy = entities[i].y

        for( var j=100;j--;)
            if(i!=j){
                var OUx = Ox - entities[j].x
                var OUy = Oy - entities[j].y

                var d = Math.max( 1, OUx*OUx + OUy*OUy )

                ax += 2*OUx/(d*Math.sqrt(d))
                ay += 2*OUy/(d*Math.sqrt(d))
            }

        var OUx = honeyPot[ entities[i].target ].x - Ox
        var OUy = honeyPot[ entities[i].target ].y - Oy

        var d = Math.max( 0.1, OUx*OUx + OUy*OUy )

        ax += 0.05*OUx/Math.sqrt(d)
        ay += 0.05*OUy/Math.sqrt(d)

        entities[i].vx = entities[i].vx * 0.5 +  ax * 1.9
        entities[i].vy = entities[i].vy * 0.5 +  ay * 1.9

        entities[i].x += entities[i].vx * 4
        entities[i].y += entities[i].vy * 4

        if ( d < 16 )
            entities[i].target = rand()%honeyPot.length
    }

    //draw
    c.clearRect(0,0,500,500)
    for( var i=100;i--;){
        c.beginPath()
        c.arc( entities[i].x, entities[i].y, 2, 0, 6.28 )
        c.fill()
    }

    for( var i=honeyPot.length;i--;){
        c.beginPath()
        c.arc( honeyPot[i].x, honeyPot[i].y, 16, 0, 6.28 )
        c.stroke()
    }

    // loop
    requestAnimationFrame( loop )
}
loop()

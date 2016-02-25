// swarm

var rand = function(){ return 0|( Math.random()*500 ) }

// init entities
const l=60
entities = []
for( var i=l;i--;)
    entities[i]={x:rand(), y:rand(), target:3, vx:0, vy:0, color:rand()%1}

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

var x0 = 30
var fatness = 16
var friendlyness = 0.04
var fn = function( x ) {
    return  10 / ( x *x ) - friendlyness * Math.exp( -( x- x0 )*( x- x0 ) / ( fatness * fatness ) )
}

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

                var d = Math.max( 1, Math.sqrt( OUx*OUx + OUy*OUy ) )

                var k = entities[j].color == entities[i].color ? fn( d ) : 2 / ( d * d )

                ax += k*OUx/d
                ay += k*OUy/d

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

    ;(function(){
        var A = entities[ 123 % entities.length ]
        var B = entities[ 17 % entities.length ]
        var vx = B.x - A.x
        var vy = B.y - A.y
        var l = Math.sqrt( vx*vx + vy*vy )
        vx/=l
        vy/=l
        for(var k=500;k--;){
            var co = Math.min( 0.5, fn( k ) )

            c.strokeStyle = 'hsl(' + ( (co/ 0.5)*360 ) + ', 80%, 60%)'
            c.lineWidth = 1.6
            c.beginPath()
            c.moveTo( A.x + vx * k - vy* 10, A.y + vy * k + vx* 10 )
            c.lineTo( A.x + vx * k + vy* 10, A.y + vy * k - vx* 10 )
            c.stroke()
        }
    })()

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

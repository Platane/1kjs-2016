// swarm

var rand = function(){ return 0|( Math.random()*500 ) }

// init entities
var l=200
var n_team = 3
entities = []
for( var i=l;i--;)
    entities[i]={x:rand(), y:rand(), target:3, vx:0, vy:0, color:rand()%n_team}

var honeyPot = [
    {x:100, y:100},
    {x:140, y:100},
    {x:126, y:153},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:rand(), y:rand()},
    {x:130, y:360},
]

var x0 = 25
var fatness = 10
var friendlyness = 0.007
var revulsion = 0.5
var fn = function( x ) {
    return  revulsion / ( x *x ) - friendlyness * Math.exp( -( x- x0 )*( x- x0 ) / ( fatness * fatness ) )
}

// loop
var loop = function(){

    // fly
    for( var i=l;i--;){

        var ax = 0
        var ay = 0

        var Ox = entities[i].x
        var Oy = entities[i].y

        var friendshipx = 0
        var friendshipy = 0

        for( var j=l;j--;)
            if(i!=j){
                var OUx = Ox - entities[j].x
                var OUy = Oy - entities[j].y

                var d = Math.sqrt( OUx*OUx + OUy*OUy )


                if ( entities[j].color == entities[i].color ) {

                    var k = Math.min( 0.5, fn( d ) )
                    friendshipx += k*OUx/d
                    friendshipy += k*OUy/d

                } else {

                    var k = Math.min( 0.5, 3 / ( d * d ) )
                    ax += k*OUx/d
                    ay += k*OUy/d
                }
            }

        var friendshipl = Math.sqrt( friendshipx * friendshipx + friendshipy * friendshipy )

        ax += friendshipx / friendshipl * Math.min( friendshipl, 0.08 )
        ay += friendshipy / friendshipl * Math.min( friendshipl, 0.08 )

        var OUx = honeyPot[ entities[i].target ].x - Ox
        var OUy = honeyPot[ entities[i].target ].y - Oy

        var d = Math.max( 0.1, OUx*OUx + OUy*OUy )

        ax += 0.1*OUx/Math.sqrt(d)
        ay += 0.1*OUy/Math.sqrt(d)

        entities[i].vx = entities[i].vx * 0.92 +  ax * 0.1
        entities[i].vy = entities[i].vy * 0.92 +  ay * 0.1

        entities[i].x += entities[i].vx * 18
        entities[i].y += entities[i].vy * 18

        if ( d < 26 )
            entities[i].target = entities[i].target >= n_team ? entities[i].color : rand()%(honeyPot.length-n_team)+n_team
    }

    //draw


    c.clearRect(0,0,500,500)

    // draw tethering
    for( var i=l;i--;)
    for( var j=i;j--;)
        if(entities[i].color == entities[j].color && i % 2 == 0 && j % 3 == 0 ){

            var OUx = entities[i].x - entities[j].x
            var OUy = entities[i].y - entities[j].y

            var d = Math.sqrt( OUx*OUx + OUy*OUy )

            var x = 1 - Math.abs( d - 30 ) / 5

            if ( x > 0 ) {
                c.lineWidth = 0.5
                c.strokeStyle = 'hsla(' + ( entities[i].color*75 + 12 ) + ', 50%, 60%, '+ x +' )'
                c.beginPath()
                c.moveTo( entities[i].x, entities[i].y )
                c.lineTo( entities[j].x, entities[j].y )
                c.stroke()
            }

        }

    // draw entities
    for( var i=l;i--;){
        var color = 'hsl(' + ( entities[i].color*75 + 12 ) + ', 50%, 60%)'
        c.beginPath()
        c.fillStyle= color
        c.strokeStyle= color
        c.arc( entities[i].x, entities[i].y, 2, 0, 6.28 )
        c.fill()
        c.beginPath()
        c.moveTo(entities[i].x, entities[i].y)
        c.lineTo(entities[i].x - entities[i].vx * 50, entities[i].y - entities[i].vy * 50)
        c.stroke()

    }

    // draw influence
    ;(function(){
        var A = entities[ 123 % entities.length ]
        var B = entities[ 17 % entities.length ]
        A = {x:0,y:5}
        B = {x:500,y:5}
        var vx = B.x - A.x
        var vy = B.y - A.y
        var l = Math.sqrt( vx*vx + vy*vy )
        vx/=l
        vy/=l
        for(var k=500;k--;){

            var res = 0.03

            var co = Math.min( res, fn( k ) )

            c.strokeStyle = 'hsl(' + ( (co/ res)*360 ) + ', 80%, 60%)'
            c.lineWidth = 1
            c.beginPath()
            c.moveTo( A.x + vx * k - vy* 10, A.y + vy * k + vx* 10 )
            c.lineTo( A.x + vx * k + vy* 10, A.y + vy * k - vx* 10 )
            c.stroke()
        }
    })()

    //draw honey pot
    for( var i=honeyPot.length;i--;){
        c.strokeStyle= i >= n_team ? '#7356b1' : 'hsl(' + ( i*75 + 12 ) + ', 50%, 60%)'
        c.beginPath()
        c.arc( honeyPot[i].x, honeyPot[i].y, 16, 0, 6.28 )
        c.stroke()
    }



    // loop
    requestAnimationFrame( loop )
}
loop()

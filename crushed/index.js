// swarm
m=Math
r = function(){ return 0|( m.random()*640 ) }

l=180
e = []
for(i=l;i--;)
    e[i]={x:r(), y:r(), t:i%9, u:0, v:0, c:r()%3}


h = [
    {x:120,y:120},
    {x:70,y:170},
    {x:170,y:70},
]
for(k=3;k<9;)
    h[k ++]={x:r()+80, y:r() +80}

var pointers=[]
a.onmousemove = function(e){
    pointers = [{x: e.pageX,y: e.pageY}]
}
a.ontouchmove= function(e){
    pointers = []
    for( var i=e.touches.length; i--; )
        pointers.push({ x:e.touches[i].pageX, y:e.touches[i].pageY })
}
a.onclick=function(e){
    for(var i=h.length; i--;)
    {
        var OUx = h[ i ].x - e.pageX
        var OUy = h[ i ].y - e.pageY

        var d = Math.max( 0.1, OUx*OUx + OUy*OUy )

        if ( d < 30 )
            for( var k=e.length; k--;)
                e[k].t = i
    }
}

// loop
u = function(){

    // fly
    for( i=l;i--;){

        ax = 0
        ay = 0

        o=e[i]

        Ox = o.x
        Oy = o.y

        // for each other entity
        fx = 0
        fy = 0

        for( j=l;j--;)
            if(i!=j){

                x = Ox - e[j].x
                y = Oy - e[j].y

                d = Math.sqrt(x*x + y*y )


                if ( e[j].c == o.c ) {

                    k = m.min( 1, 1.8 / ( d *d ) - 0.01 * m.exp( -( d- 45 )*( d- 45 ) / ( 17 * 17 ) ) )
                    fx += k*x/d
                    fy += k*y/d

                } else {

                    k = m.min( 1, 6 / ( d * d ) )
                    ax += k*x/d
                    ay += k*y/d
                }
            }

        // limit firendship influence
        // prevent from forming a firendship ball
        j = m.sqrt( fx * fx + fy * fy )
        j = j / m.min( j, 0.08 )

        ax += fx / j
        ay += fy / j


        // honey pot influence

        x = h[ o.t ].x - Ox
        y = h[ o.t ].y - Oy

        d =m.sqrt(m.max( 0.1, x*x + y*y ))

        ax += 0.1*x/d
        ay += 0.1*y/d


        // pointer influence
        // for( var j = pointers.length; j--;) {
        //     var OUx = Ox - pointers[j].x
        //     var OUy = Oy - pointers[j].y
        //
        //
        //     k = m.min( 0.5, 80 / ( h * h ) ) / m.sqrt( OUx*OUx + OUy*OUy )
        //     ax += k*OUx
        //     ay += k*OUy
        // }




        // physic step

        o.u = o.u * 0.92 +  ax * 0.1
        o.v = o.v * 0.92 +  ay * 0.1

        o.x += o.u * 22
        o.y += o.v * 22

        if ( d < 20 )
            e[i].t = e[i].t >= 3 ? e[i].c : (r()%6)+3
    }

    //draw


    c.clearRect(0,0,800,800)

    // draw tethering
    for( i=l;i--;)
    for( j=i;j--;)
        if(e[i].c == e[j].c && i+j % 6 ){

            x = e[i].x - e[j].x
            y = e[i].y - e[j].y

            d = m.sqrt( x*x + y*y )

            k = 1 - m.abs( d - 30 ) / 5

            if ( x > 0 ) {
                c.lineWidth = 0.9
                c.strokeStyle = 'hsla(' + ( e[i].c*75 + 12 ) + ', 50%, 60%, '+ k +' )'
                c.beginPath()
                c.moveTo( e[i].x, e[i].y )
                c.lineTo( e[j].x, e[j].y )
                c.stroke()
            }

        }

    // draw e
    for( i=l;i--;){
        color = 'hsl(' + ( e[i].c*75 + 12 ) + ', 50%, 60%)'
        c.strokeStyle= color
        c.lineWidth = 1.7
        c.beginPath()
        c.arc( e[i].x, e[i].y, 2.8, 0, 6.28 )
        c.moveTo(e[i].x, e[i].y)
        c.lineTo(e[i].x - e[i].u * 60, e[i].y - e[i].v * 60)
        c.stroke()

    }

    //draw honey pot
    for( i=h.length;i--;){
        c.strokeStyle= i >= 3 ? '#7356b1' : 'hsl(' + ( i*75 + 12 ) + ', 50%, 60%)'
        c.beginPath()
        c.arc( h[i].x, h[i].y, 22, 0, 6.28 )
        c.stroke()
    }



    // loop
    requestAnimationFrame( u )
}
u()

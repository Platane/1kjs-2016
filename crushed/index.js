// swarm
m=Math
z=m.sqrt
b=m.min
r = function(){ return 0|( m.random()*640 ) }

l=225
e = []
for(i=l;i--;)
    e[i]={x:r(), y:r(), t:i%9, u:0, v:0, c:r()%3 ,s:0}


h = [
    {x:120,y:120,s:0},
    {x:60,y:200,s:0},
    {x:200,y:60,s:0},
]
for(k=3;k<9;)
    h[k ++]={x:r()+80, y:r() +80}

n=g=0
a.onmousemove = function(e){
    n=e.pageX
    g=e.pageY
}

// loop
u = function(){

    c.clearRect(0,0,800,800)

    //draw honey pot
    for( i=9;i--;){
        c.globalAlpha = c.lineWidth =1
        c.strokeStyle= i > 2 ? '#aaa' : 'hsl(' + ( i*75 + 12 ) + ',50%,60%)'
        c.beginPath()
        c.arc( h[i].x, h[i].y, 22, 0, 6.3 )
        c.stroke()
        c.beginPath()
        c.lineWidth = 4
        c.arc( h[i].x, h[i].y, 24, 0, h[i].s/100 )
        c.stroke()
    }

    // fly
    for( i=l;i--;){

        o=e[i]

        p = o.x
        q = o.y

        v = w = s = t = 0


        // draw
        c.globalAlpha = c.lineWidth =1
        c.strokeStyle= 'hsl(' + ( o.c*75 + 12 ) + ',50%,60%)'
        c.beginPath()
        c.arc( p, q, 2.8, 0, 6.3 )
        c.moveTo(p, q)
        c.lineTo(p - o.u * 60, q - o.v * 60)
        c.stroke()


        for( j=l;j--;)
            if(i!=j){

                x = p - e[j].x
                y = q - e[j].y

                d = z(x*x + y*y )


                if ( e[j].c == o.c ) {

                    k = b( 1, 2 / ( d *d ) - 0.01 * m.exp( -( d- 45 )*( d- 45 ) / ( 17 * 17 ) ) )
                    v += k*x/d
                    w += k*y/d

                    k = 1 - m.abs( d - 30 ) / 8

                    if ( k > 0 && !((i+j) % 4) && i<j ) {
                        c.globalAlpha = k
                        c.lineWidth = 0.5
                        c.moveTo( p, q )
                        c.lineTo( e[j].x, e[j].y )
                        c.stroke()
                    }

                } else {

                    k = b( 2, 10 / ( d * d ) )
                    s += k*x/d
                    t += k*y/d
                }
            }


        // limit firendship influence
        // prevent from forming a firendship ball
        j = z( v * v + w * w )
        j = j / b( j, 0.02 )

        s += v / j
        t += w / j


        // honey pot influence

        x = h[ o.t ].x - p
        y = h[ o.t ].y - q

        d =z(m.max( 0.1, x*x + y*y ))

        s += 0.1*x/d
        t += 0.1*y/d


        // pointer influence
        x = p - n
        y = q - g

        k = z( x*x + y*y )
        k = b( 0.5, 80 / ( k*k ) ) / k
        s += k*x
        t += k*y





        // physic step

        o.x += (o.u = o.u * 0.92 +  s * 0.1) * 22
        o.y += (o.v = o.v * 0.92 +  t * 0.1) * 22

        if ( d < 18 ){
            h[ o.t ].s ++
            o.t = o.t >= 3 ? o.c : (r()%6)+3
        }

    }

    // loop
    requestAnimationFrame( u )
    // setTimeout(u,16)
}
u()

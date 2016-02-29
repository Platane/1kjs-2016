

var body=document.querySelector('body')
body.setAttribute('style','margin:0;display:flex;align-items:center;justify-content:center;')

var MAX_WIDTH  = 800
var MAX_HEIGHT = 800

var canvas = document.createElement('canvas')
canvas.width = Math.min( MAX_WIDTH, window.innerWidth )
canvas.height= Math.min( MAX_HEIGHT, window.innerHeight )
// canvas.setAttribute('style','width:100%;height:100%;')

body.appendChild(canvas)

window.a = canvas
window.b = body
window.c = canvas.getContext('2d')
window.d = document



var body=document.querySelector('body')
body.setAttribute('style','margin:0')

var canvas = document.createElement('canvas')
// canvas.setAttribute('style','width:100%;height:100%;')
canvas.width=500
canvas.height=500

body.appendChild(canvas)

window.a = canvas
window.b = body
window.c = canvas.getContext('2d')
window.d = document

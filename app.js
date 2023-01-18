const canvas = document.querySelector("canvas")
const toolBtn = document.querySelectorAll(".tool")
const fillColor = document.querySelector("#fill-color"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picked"),
Erasier = document.querySelector("#erasier"),
clearCanvasBtn =document.querySelector(".clear-canvas"),
saveCanvasBtn =document.querySelector(".save-img")
console.log(clearCanvasBtn)
console.log(saveCanvasBtn)

console.log(colorBtns)
console.log(fillColor)
sizeSlider = document.querySelector("#size-slider")
console.log(sizeSlider)
let ctx = canvas.getContext("2d"),
isDrawing = false,
brushWidth = 5,
selectedTool = "brush",
prevMouseX,
prevMouseY,
snapshot,
selectColor = "#000"

const setCanvassBackground = ()=>{
    ctx.fillStyle = "#fff"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = selectColor
}


window.addEventListener("load", () => {
canvas.width = canvas.offsetWidth,
canvas.height= canvas.offsetHeight,
setCanvassBackground()
})
const startDrawing = (e)=>{
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.strokeStyle = selectColor,
    ctx.fillStyle = selectColor
    ctx.lineWidth = brushWidth
    console.log(snapshot)
}
const drawReactangle = (e) =>{
    if(!fillColor.checked){
   return ctx.strokeRect(e.offsetX,e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)

    }
ctx.fillRect(e.offsetX,e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}
const drawCircle = (e)=>{
    ctx.beginPath()
    const radius= 
    Math.sqrt(Math.pow(prevMouseX - e.offsetX,2)) +Math.pow(prevMouseY -e.offsetY,2)
ctx.arc(prevMouseX, prevMouseY,radius, 0,2 *Math.PI)
fillColor.checked ? ctx.fill() : ctx.stroke()

}
colorBtns.forEach(btn =>{
    btn.addEventListener("click",e=>{
        document.querySelector(".options .select").classList.remove("select")
        btn.classList.add("select")
        const bgColor = window.getComputedStyle(btn).getPropertyValue("background-color")
       selectColor =bgColor
        console.log(bgColor)

    })
})
const drawTringle = (e)=>{
    ctx.beginPath()
ctx.moveTo(prevMouseX,prevMouseY)
ctx.lineTo( e.offsetX,e.offsetY)
ctx.lineTo(prevMouseX*2 - e.offsetX ,e.offsetY)
ctx.closePath()
fillColor.checked ? ctx.fill() : ctx.stroke()
ctx.stroke()
}


const drawing = e =>{
    if(!isDrawing) return
    ctx.putImageData(snapshot, 0 ,0)
    // if(selectedTool =- 'brush' || selectedTool == 'erasier'){
    //     ctx.strokeStyle = selectedTool == 'erasier' ? '#fff ': selectColor;
    //     ctx.lineTo(e.offsetX,e.offsetY)
    //     ctx.stroke()
    // }
    switch (selectedTool){
        case "brush":
         ctx.lineTo(e.offsetX,e.offsetY)
          ctx.stroke()
          break
        case "rectangle":
            drawReactangle(e);
            break
          default:
            break
            case "circle":
                drawCircle(e);
             break
             case "triangle":
                drawTringle(e);
                break
            case "erasier":
                ctx.strokeStyle = "#fff"
                ctx.lineTo(e.offsetX,e.offsetY)
                ctx.stroke()
                break
                
         
    }
}

const stopDraw = ()=>{
    isDrawing = false

}
clearCanvasBtn.addEventListener("click", ()=>{
    ctx.clearRect(0 ,0, canvas.width, canvas.height)
    setCanvassBackground()
})

colorPicker.addEventListener("change", ()=>{
    colorPicker.parentElement.style.background = colorPicker.value,
    colorPicker.parentElement.click()
    })
    saveCanvasBtn.addEventListener("click",()=>{
        const link = document.createElement('a')
        link.download = `Doston ${Date.now()}.jpg`
        link.href = canvas.toDataURL()
        link.click()
    })
toolBtn.forEach((btn) =>{
    btn.addEventListener("click" , ()=>{
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id
        console.log(selectedTool)
    })
})


sizeSlider.addEventListener("change",()=>(brushWidth=sizeSlider.value))

canvas.addEventListener('mousedown',startDrawing)
canvas.addEventListener('mousemove',drawing)
canvas.addEventListener('mouseup',stopDraw)
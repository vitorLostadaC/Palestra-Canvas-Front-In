const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500

let offsetX = 0
let offsetY = 0
let scale = 1
let isDragging = false
let lastX = 0
let lastY = 0

function drawCircle() {
  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2)
  ctx.fill()
}

function updateCoordinates() {
  const coordsElement = document.getElementById('coordinates')
  coordsElement.textContent = `X: ${offsetX.toFixed(2)}, Y: ${offsetY.toFixed(
    2
  )}, Scale: ${scale.toFixed(2)}`
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.translate(offsetX, offsetY)
  ctx.scale(scale, scale)
  drawCircle()
  ctx.restore()
  updateCoordinates()
}

// Dragging functionality
canvas.addEventListener('mousedown', (e) => {
  isDragging = true
  lastX = e.clientX
  lastY = e.clientY
})

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const deltaX = e.clientX - lastX
    const deltaY = e.clientY - lastY
    offsetX += deltaX
    offsetY += deltaY
    lastX = e.clientX
    lastY = e.clientY
    draw()
  }
})

canvas.addEventListener('mouseup', () => {
  isDragging = false
})

canvas.addEventListener('mouseleave', () => {
  isDragging = false
})

// Touchpad scrolling and zooming
canvas.addEventListener('wheel', (e) => {
  e.preventDefault()

  // Check if it's a pinch-to-zoom gesture (Ctrl key or touchpad pinch)
  if (e.ctrlKey) {
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1

    // Get mouse position relative to canvas
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate zoom center based on mouse position
    const centerX = mouseX - offsetX
    const centerY = mouseY - offsetY

    scale *= zoomFactor
    offsetX -= centerX * (zoomFactor - 1)
    offsetY -= centerY * (zoomFactor - 1)
  } else {
    // Regular scrolling (panning)
    offsetX -= e.deltaX
    offsetY -= e.deltaY
  }

  draw()
})

// Keep the button controls for additional navigation
document.getElementById('up').addEventListener('click', () => {
  offsetY -= 10
  draw()
})

document.getElementById('down').addEventListener('click', () => {
  offsetY += 10
  draw()
})

document.getElementById('left').addEventListener('click', () => {
  offsetX -= 10
  draw()
})

document.getElementById('right').addEventListener('click', () => {
  offsetX += 10
  draw()
})

// Zoom controls
function handleZoom(zoomFactor) {
  const centerScreenX = canvas.width / 2 - offsetX
  const centerScreenY = canvas.height / 2 - offsetY
  scale *= zoomFactor
  offsetX -= centerScreenX * (zoomFactor - 1)
  offsetY -= centerScreenY * (zoomFactor - 1)
  draw()
}

document.getElementById('zoomIn').addEventListener('click', () => {
  handleZoom(1.1)
})

document.getElementById('zoomOut').addEventListener('click', () => {
  handleZoom(0.9)
})

draw()

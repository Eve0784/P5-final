
let svgImgs = [];
let bottomLayer;
let maskLayer;
let circlePos;
let circleSize = 400;
let circleRadius = 200;
let velocity;

// ------------------------Paleta amplia de colores folk vibrantes---------------------------------------//
let folkColorPalette = [
  '#D32F2F', '#F57C00', '#FBC02D','#388E3C', '#1976D2', '#7B1FA2',
  '#C2185B', '#5D4037', '#E64A19', '#AFB42B', '#00796B', '#0288D1',
  '#8E24AA', '#C62828', '#EF6C00', '#6D4C41'
];

let currentColors = [];
let targetColors = [];
let colorChangeInterval = 4000; // Cambiar cada 4 segundos
let lastColorChange = 0;
let transitionProgress = 1; // 0 a 1
let isTransitioning = false;

function preload() {
  for (let i = 1; i <= 8; i++) {
    svgImgs.push(loadImage(`assets/${i}.svg`));
  }
}

function setup() {
  let canvas = createCanvas(700, 700);
  canvas.style('display', 'block');
  canvas.style('margin', '0 auto');

  bottomLayer = createGraphics(width, height);
  maskLayer = createGraphics(width, height);
  circlePos = createVector(random(width), random(height));
  velocity = p5.Vector.random2D().mult(2);

  //------------------------------------------ Inicializar colores----------------------------------------------------//
  shuffleColors();
  currentColors = [...targetColors];
}

function draw() {
  background(0);
  //------------------------------------------ Actualizar transición---------------------------------------------------//
  if (isTransitioning) {
    transitionProgress += 0.02; // Aumenta el progreso 2% por frame
    if (transitionProgress >= 1) { // Si llegó al 100%
      transitionProgress = 1;
      isTransitioning = false;   // Termina la transición
      currentColors = [...targetColors];    // Actualiza colores finales
    }
  }

  //========================================== CAPA INFERIOR (OCULTA) ================================================ //
  bottomLayer.clear();     // Limpia la capa
  let rowHeight = height / 8;   // Divide el canvas en 8 filas (700/8 = 87.5px cada una)

  for (let i = 0; i < 8; i++) {
    let y = i * rowHeight;   // Posición vertical de cada fila

  // ----------------------------------------Interpolación suave entre colores--------------------------------------//
    let currentColor = color(currentColors[i]);    // Color actual
    let targetColor = color(targetColors[i]);     // Color objetivo
    let interpolatedColor = lerpColor(currentColor, targetColor, transitionProgress); //lerpColor() mezcla gradualmente entre dos coloresù
    //  según el progreso (0 = color actual, 1 = color objetivo).

    bottomLayer.noStroke();  //Dibuja la fila de color
    bottomLayer.fill(interpolatedColor);  // la rellena con el color seleccionado a random
    bottomLayer.rect(0, y, width, rowHeight); // Rectángulo de toda la fila

    // -------------------------------------SVG centrado en su fila  ----------------------------------------------//
    let img = svgImgs[i];
    bottomLayer.image(
      img,
      0,
      y,
      width,
      rowHeight
    );
  }
  // ======================================== MÁSCARA CIRCULAR ====================================================//
  maskLayer.clear();    // Limpia la máscara
  maskLayer.noStroke();
  maskLayer.fill(255);  // Blanco = área visible

  // ----------- -------------Mueve la posición según la velocidad -----------------------------------//
  circlePos.add(velocity);

  // -------------------------Variable para detectar rebote -----------------------------------//
  let bounced = false;

  // ------------------------------------Rebote en bordes -----------------------------------//
  if (circlePos.x <= circleRadius) {
    circlePos.x = circleRadius;    // Ajusta posición
    velocity.x *= -1;             // Invierte dirección horizontal
    bounced = true;
  }
  if (circlePos.x >= width - circleRadius) {
    circlePos.x = width - circleRadius;
    velocity.x *= -1;
    bounced = true;
  }
  if (circlePos.y <= circleRadius) {
    circlePos.y = circleRadius;
    velocity.y *= -1;
    bounced = true;
  }
  if (circlePos.y >= height - circleRadius) {
    circlePos.y = height - circleRadius;
    velocity.y *= -1;
    bounced = true;
  }

  //--------------------------------- Cambiar colores cuando hay rebote -----------------------------------//
  if (bounced && !isTransitioning) {  
    startTransition();    // Inicia nueva transición de colores
  } 
  // ---------------------------------Dibuja el círculo en la máscara -----------------------------------//
  maskLayer.ellipse(circlePos.x, circlePos.y, circleSize);

 // ============================================= APLICAR MÁSCARA   ===============================================================//
  let revealed = bottomLayer.get();   // Copia la capa inferior
  revealed.mask(maskLayer);          // Aplica la máscara (solo muestra donde hay blanco)
  image(revealed, 0, 0);             // Dibuja el resultado final en el canvas
}
// ======================================    FUNCIONES DE COLOR     ==============================================================//
function shuffleColors() {
  targetColors = [];   // Vacía el array de colores objetivo
  let tempPalette = [...folkColorPalette];    // Copia la paleta completa

  // -------------------Seleccionar 8 colores aleatorios sin repetir -----------------------------------//
  for (let i = 0; i < 8; i++) {
    let randomIndex = floor(random(tempPalette.length)); // Índice aleatorio
    targetColors.push(tempPalette[randomIndex]);        // Añade el color
    tempPalette.splice(randomIndex, 1);                 // Elimina ese color para no repetir
  }
}

function startTransition() {
  isTransitioning = true;      // Activa la bandera de transición
  transitionProgress = 0;      // Resetea el progreso a 0%
  lastColorChange = millis();  // Guarda el tiempo actual
  shuffleColors();            // Genera nuevos colores objetivo
}

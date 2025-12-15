
// let svgImgs = [];
// let bottomLayer;
// let maskLayer;
// let circlePos;
// let circleSize = 400; // 50
// let circleRadius = 200;   // 25 en el cuadro 100x100
// let velocity;

// // ------------------------Paleta amplia de colores folk vibrantes---------------------------------------//
// let folkColorPalette = [
//   '#D32F2F', '#F57C00', '#FBC02D','#388E3C', '#1976D2', '#7B1FA2',
//   '#C2185B', '#5D4037', '#E64A19', '#AFB42B', '#00796B', '#0288D1',
//   '#8E24AA', '#C62828', '#EF6C00', '#6D4C41'
// ];

// let currentColors = [];
// let targetColors = [];
// let colorChangeInterval = 4000; // Cambiar cada 4 segundos
// let lastColorChange = 0;
// let transitionProgress = 1; // 0 a 1
// let isTransitioning = false;

// function preload() {
//   for (let i = 1; i <= 8; i++) { // aca 5 imagenes o 4
//     svgImgs.push(loadImage(`assets/${i}.svg`));
//   }
// }

// function setup() {
//   let canvas = createCanvas(700, 700); // 100x100
//   canvas.style('display', 'block');
//   canvas.style('margin', '0 auto');

//   bottomLayer = createGraphics(width, height);
//   maskLayer = createGraphics(width, height);
//   circlePos = createVector(random(width), random(height));
//   velocity = p5.Vector.random2D().mult(2); // por 0.5 cambia la velocidad en el cuadro 100x100

//   //------------------------------------------ Inicializar colores----------------------------------------------------//
//   shuffleColors();
//   currentColors = [...targetColors];
// }

// function draw() {
//   background(0);
//   //------------------------------------------ Actualizar transición---------------------------------------------------//
//   if (isTransitioning) {
//     transitionProgress += 0.02; // Aumenta el progreso 2% por frame
//     if (transitionProgress >= 1) { // Si llegó al 100%
//       transitionProgress = 1;
//       isTransitioning = false;   // Termina la transición
//       currentColors = [...targetColors];    // Actualiza colores finales
//     }
//   }

//   //========================================== CAPA INFERIOR (OCULTA) ================================================ //
//   bottomLayer.clear();     // Limpia la capa
//   let rowHeight = height / 8;   // Divide el canvas en 8 filas (700/8 = 87.5px cada una) cambia a el numero de imagenes que quieres que se muestren

//   for (let i = 0; i < 8; i++) { // tambien aca cambiar depende de las imagenes
//     let y = i * rowHeight;   // Posición vertical de cada fila

//   // ----------------------------------------Interpolación suave entre colores--------------------------------------//
//     let currentColor = color(currentColors[i]);    // Color actual
//     let targetColor = color(targetColors[i]);     // Color objetivo
//     let interpolatedColor = lerpColor(currentColor, targetColor, transitionProgress); //lerpColor() mezcla gradualmente entre dos coloresù
//     //  según el progreso (0 = color actual, 1 = color objetivo).

//     bottomLayer.noStroke();  //Dibuja la fila de color
//     bottomLayer.fill(interpolatedColor);  // la rellena con el color seleccionado a random
//     bottomLayer.rect(0, y, width, rowHeight); // Rectángulo de toda la fila

//     // -------------------------------------SVG centrado en su fila  ----------------------------------------------//
//     let img = svgImgs[i];
//     bottomLayer.image(
//       img,
//       0,
//       y,
//       width,
//       rowHeight
//     );
//   }
//   // ======================================== MÁSCARA CIRCULAR ====================================================//
//   maskLayer.clear();    // Limpia la máscara
//   maskLayer.noStroke();
//   maskLayer.fill(255);  // Blanco = área visible

//   // ----------- -------------Mueve la posición según la velocidad -----------------------------------//
//   circlePos.add(velocity);

//   // -------------------------Variable para detectar rebote -----------------------------------//
//   let bounced = false;

//   // ------------------------------------Rebote en bordes -----------------------------------//
//   if (circlePos.x <= circleRadius) {
//     circlePos.x = circleRadius;    // Ajusta posición
//     velocity.x *= -1;             // Invierte dirección horizontal
//     bounced = true;
//   }
//   if (circlePos.x >= width - circleRadius) {
//     circlePos.x = width - circleRadius;
//     velocity.x *= -1;
//     bounced = true;
//   }
//   if (circlePos.y <= circleRadius) {
//     circlePos.y = circleRadius;
//     velocity.y *= -1;
//     bounced = true;
//   }
//   if (circlePos.y >= height - circleRadius) {
//     circlePos.y = height - circleRadius;
//     velocity.y *= -1;
//     bounced = true;
//   }

//   //--------------------------------- Cambiar colores cuando hay rebote -----------------------------------//
//   if (bounced && !isTransitioning) {  
//     startTransition();    // Inicia nueva transición de colores
//   } 
//   // ---------------------------------Dibuja el círculo en la máscara -----------------------------------//
//   maskLayer.ellipse(circlePos.x, circlePos.y, circleSize);

//  // ============================================= APLICAR MÁSCARA   ===============================================================//
//   let revealed = bottomLayer.get();   // Copia la capa inferior
//   revealed.mask(maskLayer);          // Aplica la máscara (solo muestra donde hay blanco)
//   image(revealed, 0, 0);             // Dibuja el resultado final en el canvas
// }
// // ======================================    FUNCIONES DE COLOR     ==============================================================//
// function shuffleColors() {
//   targetColors = [];   // Vacía el array de colores objetivo
//   let tempPalette = [...folkColorPalette];    // Copia la paleta completa

//   // -------------------Seleccionar 8 colores aleatorios sin repetir -----------------------------------//
//   for (let i = 0; i < 8; i++) { // tambnien cambiar los colores dependiendo las imagenes a mostrar
//     let randomIndex = floor(random(tempPalette.length)); // Índice aleatorio
//     targetColors.push(tempPalette[randomIndex]);        // Añade el color
//     tempPalette.splice(randomIndex, 1);                 // Elimina ese color para no repetir
//   }
// }

// function startTransition() {
//   isTransitioning = true;      // Activa la bandera de transición
//   transitionProgress = 0;      // Resetea el progreso a 0%
//   lastColorChange = millis();  // Guarda el tiempo actual
//   shuffleColors();            // Genera nuevos colores objetivo
// }


// // https://openprocessing.org/sketch/2799456


let svgImgs = [];
let bottomLayer;
let maskLayer;
let circlePos;
let circleSize = 400; // Proporcional a canvas 100x100
let circleRadius = 200; // Radio del círculo
let velocity;

// ------------------------Paleta amplia de colores folk vibrantes---------------------------------------//
let folkColorPalette = [
  '#D32F2F', '#F57C00', '#FBC02D','#388E3C', '#1976D2', '#7B1FA2',
  '#C2185B', '#5D4037', '#E64A19', '#AFB42B', '#00796B'
];

let currentColors = [];
let targetColors = [];
let colorChangeInterval = 4000;
let lastColorChange = 0;
let transitionProgress = 1;
let isTransitioning = false;

// ================== NUEVO: Array para las imágenes seleccionadas ==================
let selectedImages = [];
const NUM_IMAGES = 4; // Número de imágenes a mostrar

function preload() {
  for (let i = 1; i <= 8; i++) {
    svgImgs.push(loadImage(`assets/${i}.svg`));
  }
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.style('display', 'block');
  canvas.style('margin', '0 auto');
  
  // Desactiva el suavizado para SVGs más nítidos
  noSmooth();

  bottomLayer = createGraphics(width, height);
  maskLayer = createGraphics(width, height);
  
  // Mejora la calidad de renderizado de las capas
  bottomLayer.pixelDensity(4);
  maskLayer.pixelDensity(4);
  
  circlePos = createVector(random(width), random(height));
  velocity = p5.Vector.random2D().mult(0.5); // Velocidad proporcional al tamaño

  // ================== NUEVO: Seleccionar imágenes aleatorias ==================
  selectRandomImages();
  
  //------------------------------------------ Inicializar colores----------------------------------------------------//
  shuffleColors();
  currentColors = [...targetColors];
}

function draw() {
  background(0);
  //------------------------------------------ Actualizar transición---------------------------------------------------//
  if (isTransitioning) {
    transitionProgress += 0.02;
    if (transitionProgress >= 1) {
      transitionProgress = 1;
      isTransitioning = false;
      currentColors = [...targetColors];
    }
  }

  //========================================== CAPA INFERIOR (OCULTA) ================================================ //
  bottomLayer.clear();
  let rowHeight = height / NUM_IMAGES; // Ahora divide entre 4 filas

  for (let i = 0; i < NUM_IMAGES; i++) { // Solo itera 4 veces
    let y = i * rowHeight;

    // ----------------------------------------Interpolación suave entre colores--------------------------------------//
    let currentColor = color(currentColors[i]);
    let targetColor = color(targetColors[i]);
    let interpolatedColor = lerpColor(currentColor, targetColor, transitionProgress);

    bottomLayer.noStroke();
    bottomLayer.fill(interpolatedColor);
    bottomLayer.rect(0, y, width, rowHeight);

    // -------------------------------------SVG centrado en su fila (usando imagen aleatoria) ----------------------------------------------//
    let img = selectedImages[i]; // Usa la imagen seleccionada aleatoriamente
    
    // Mejora el renderizado usando imageMode CENTER
    bottomLayer.imageMode(CORNER);
    bottomLayer.image(
      img,
      0,
      y,
      width,
      rowHeight
    );
  }
  
  // ======================================== MÁSCARA CIRCULAR ====================================================//
  maskLayer.clear();
  maskLayer.noStroke();
  maskLayer.fill(255);

  // ----------- -------------Mueve la posición según la velocidad -----------------------------------//
  circlePos.add(velocity);

  // -------------------------Variable para detectar rebote -----------------------------------//
  let bounced = false;

  // ------------------------------------Rebote en bordes -----------------------------------//
  if (circlePos.x <= circleRadius) {
    circlePos.x = circleRadius;
    velocity.x *= -1;
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
    startTransition();
  } 
  
  // ---------------------------------Dibuja el círculo en la máscara -----------------------------------//
  maskLayer.ellipse(circlePos.x, circlePos.y, circleSize);

  // ============================================= APLICAR MÁSCARA   ===============================================================//
  let revealed = bottomLayer.get();
  revealed.mask(maskLayer);
  image(revealed, 0, 0);
}

// ================== NUEVA FUNCIÓN: Seleccionar imágenes aleatorias ==================
function selectRandomImages() {
  selectedImages = []; // Vacía el array
  let tempImages = [...svgImgs]; // Copia todas las imágenes disponibles
  
  // Seleccionar NUM_IMAGES imágenes sin repetir
  for (let i = 0; i < NUM_IMAGES; i++) {
    let randomIndex = floor(random(tempImages.length));
    selectedImages.push(tempImages[randomIndex]);
    tempImages.splice(randomIndex, 1); // Elimina para no repetir
  }
}

// ======================================    FUNCIONES DE COLOR     ==============================================================//
function shuffleColors() {
  targetColors = [];
  let tempPalette = [...folkColorPalette];

  // -------------------Seleccionar NUM_IMAGES colores aleatorios sin repetir -----------------------------------//
  for (let i = 0; i < NUM_IMAGES; i++) { // Ahora solo necesita 4 colores
    let randomIndex = floor(random(tempPalette.length));
    targetColors.push(tempPalette[randomIndex]);
    tempPalette.splice(randomIndex, 1);
  }
}

function startTransition() {
  isTransitioning = true;
  transitionProgress = 0;
  lastColorChange = millis();
  shuffleColors();
  selectRandomImages(); // ¡Cambia las imágenes también!
}
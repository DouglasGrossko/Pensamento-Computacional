//variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 23;
let raio = diametro / 2;

//variaveis da velocidade da Bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 165;
let raqueteComprimento = 11;
let raqueteAltura = 90;

//variáveis da RaqueteOponente
let xRaqueteOponente = 584;
let yRaqueteOponente = 165;
let velocidadeyRaqueteOponente = 165;

//variavel colidiu biblioteca
let colidiu = false;

//placar
let meusPontos = 0;
let oponentePontos = 0;

//sons
let raquetada;
let ponto;
let trilha;

//Possibilitando o erro da raquete do oponente
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  moverBolinha();
  verificarcoliçãoBolinhacomBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisãoRaqueteBiblioteca(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  colisãoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente);
  mostrarPontos();
  marcarPontos();
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function moverBolinha() {
  xBolinha += velocidadexBolinha
  yBolinha += velocidadeyBolinha
}

function verificarcoliçãoBolinhacomBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 6;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 6;
  }
   // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete = constrain(yRaquete, 0, 310);
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function colisãoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeyRaqueteOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 45;
  yRaqueteOponente += velocidadeyRaqueteOponente + chanceDeErrar;
  calculaChanceDeErrar();
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 10){
    chanceDeErrar = 60
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function mostrarPontos(){
  stroke(255);
  textAlign(CENTER)
  textSize(25);
  fill(color(255,140,0));
  rect(175, 25, 50, 30, 10);
  fill(255);
  text(meusPontos, 200, 50);
  fill(color(255,140,0));
  rect(375, 25, 50, 30, 10);
  fill(255);
  text(oponentePontos, 400, 50);
}

function marcarPontos(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    oponentePontos += 1;
    ponto.play();
  }
}
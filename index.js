function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function lastChar(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1);
}

function isDuplicated(vector) {
    var counts = [];
    for(var i = 0; i <= vector.length; i++) {
        if(counts[vector[i]] === undefined) {
            counts[vector[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

function pintaTela(vector, saiu, comida){

	if(saiu != -1){
		cell = document.getElementById(saiu);

		cell.style.background = "white";
	}

	for(var i = 0; i < vector.length; i++){
		cell = document.getElementById(vector[i]);

		cell.style.background = "black";
	}

	cell = document.getElementById(comida);

	cell.style.background = "red";

}
	

function geraComida(tamanho, vector){

	var aux = vector.slice(0);

	var linha = Math.floor((Math.random() * tamanho) + 1);

	var letter = "a";

	var coluna = Math.floor((Math.random() * tamanho) + 1);

	for(var i = 1; i < coluna; i++){
		letter = nextChar(letter);
	}

	aux.push(linha + " " + letter);

	if(isDuplicated(aux)){
		return geraComida(tamanho, vector);
	}

	return linha + " " + letter;
}

function fazerTabuleiro(){

	var tamanho = document.getElementById("tm").value;

	document.getElementById("abc").innerHTML = "";


	var table = document.getElementById("table");

	var letra = "a";

	for(var k = 1; k <= tamanho-1; k++){
    		letra = nextChar(letra);
	}

	var lastLetra = letra;

	for(var i = tamanho; i >= 1; i--){
    	var row = table.insertRow(0);

		for(var j = tamanho; j >= 1; j--){
    		var cell = row.insertCell(0);
    		cell.id = j + " " + letra;
		}

		letra = lastChar(letra);
	}

	var num = 1;

	letra = "a";

	var sentido = "right";
	var seta = "right";

	var snake = [];

	var saiu = snake.shift();

	snake.push(num + " " + letra);

	var comida = geraComida(tamanho, snake);

	pintaTela(snake, -1, comida);

	var velocidade = 500;

	var pt = 0;
   	
   	var buffer = []

	document.getElementById("pt").style.display = "block";

	var myFunction = function(){
	
		clearInterval(interval);

		document.onkeypress = function(event){
			var x = event.which;
   			
   			if(x == 97 && sentido != "right"){
   				sentido = "left";
   			} else if(x == 100 && sentido != "left"){
   				sentido = "right";
   			} else if(x == 119 && sentido != "down"){
   				sentido = "up";
   			} else if(x == 115 && sentido != "up"){
   				sentido = "down";
   			}
   			if(buffer.length < 4){
   				buffer.push(sentido);
   			}
		}

		if(buffer.length > 0){
			seta = buffer.shift()
		} 

		if(seta == "right"){
			num++;
		} else if(seta == "left"){
			num--;
		} else if(seta == "down"){
			letra = nextChar(letra);
		} else if(seta == "up"){
			letra = lastChar(letra);
		}

		if(num < 1 || num > tamanho || letra == lastChar("a") || letra == nextChar(lastLetra) || isDuplicated(snake)){
			table.innerHTML = "You Lose!";
			document.getElementById("def").style.display = "block";
		}

		snake.push(num + " " + letra);

		if(comida == snake[snake.length-1]){
			saiu = -1;
			comida = geraComida(tamanho, snake);
			pt++;
			document.getElementById("pt").innerHTML = pt + " pontos";
			velocidade = velocidade*0.9;
		} else {
			saiu = snake.shift();
		}

		pintaTela(snake, saiu, comida);

		interval = setInterval(myFunction, velocidade);
	}

	var interval = setInterval(myFunction, velocidade);
	
}
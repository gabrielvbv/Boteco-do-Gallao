$("#btnPepsi").on('click', function() {
    $("#lblCoca").addClass("lblDisabled");
    $("#btnCoca").addClass("btnDisabled");
    $("#inputCoca").prop("readonly", true);

    $("#lblPepsi").removeClass("lblDisabled");
    $("#btnPepsi").removeClass("btnDisabled");
    $("#inputPepsi").prop("readonly", false);
});

$("#btnCoca").on('click', function() {
    $("#lblPepsi").addClass("lblDisabled");
    $("#btnPepsi").addClass("btnDisabled");
    $("#inputPepsi").prop("readonly", true);

    $("#lblCoca").removeClass("lblDisabled");
    $("#btnCoca").removeClass("btnDisabled");
    $("#inputCoca").prop("readonly", false);
});

// Pega os valores digitados na tela
var verificaDrink = function() {
    let coca, pepsi, rum, gelo;
    
    if ($("#btnCoca").hasClass("disabled")) {
        coca = -1;
        pepsi = $("#inputPepsi").val();
    }
    else {
        coca = $("#inputCoca").val();
        pepsi = -1;
    }
    rum = $("#inputRum").val();
    gelo = $("#inputGelo").val();

    console.log("Coca: " + coca);
    console.log("Pepsi: " + pepsi);
    console.log("Rum: " + rum);
    console.log("Gelo: " + gelo);

    calculaCubaLibre(coca, pepsi, rum, gelo);
};

var calculaCoca = function(coca) {
    let forte, suave, fraca;

    // Calcula a coca forte
    if (coca >= 50 && coca < 52) {
        forte = 1;
    }
    else if (coca >= 52 && coca <= 54) {
        forte = (54-coca)/(54-52);
    }
    else {
        forte = 0;
    }

    // Calcula a coca suave
    if (coca >= 52 && coca < 54) {
        suave = 1-((54-coca)/(54-52));
    }
    else if (coca >= 54 && coca < 56) {
        suave = 1;
    }
    else if (coca >= 56 && coca <= 58) {
        suave = (58-coca)/(58-56);
    }
    else {
        suave = 0;
    }

    // Calcula a coca fraca
    if (coca >= 56 && coca < 58) {
        fraca = 1-((58-coca)/(58-56));
    }
    else if (coca >= 58 && coca <= 60) {
        fraca = 1;
    }
    else {
        fraca = 0;
    }

    return new Array(forte, suave, fraca);
};

var calculaPepsi = function(pepsi) {
    let forte, suave, fraca;
    
    // Calcula a pepsi forte
    if (pepsi >= 60 && pepsi < 62) {
        forte = 1;
    }
    else if (pepsi >= 62 && pepsi <= 64) {
        forte = (64-pepsi)/(64-62);
    }
    else {
        forte = 0;
    }

    // Calcula a pepsi suave
    if (pepsi >= 62 && pepsi < 64) {
        suave = 1-((64-pepsi)/(64-62));
    }
    else if (pepsi >= 64 && pepsi < 66) {
        suave = 1;
    }
    else if (pepsi >= 66 && pepsi <= 68) {
        suave = (68-pepsi)/(68-66);
    }
    else {
        suave = 0;
    }

    // Calcula a pepsi fraca
    if (pepsi >= 66 && pepsi < 68) {
        fraca = 1-((68-pepsi)/(68-66));
    }
    else if (pepsi >= 68 && pepsi <= 70) {
        fraca = 1;
    }
    else {
        fraca = 0;
    }

    return new Array(forte, suave, fraca);
};

var calculaRum = function(rum) {
    let forte, suave, fraco;
    
    // Calcula o rum forte
    if (rum >= 23 && rum < 28) {
        forte = 1-((28-rum)/(28-23));
    }
    else if (rum >= 28 && rum <= 30) {
        forte = 1;
    }
    else {
        forte = 0;
    }

    // Calcula o rum suave
    if (rum >= 15 && rum < 20) {
        suave = 1-((20-rum)/(20-15));
    }
    else if (rum >= 20 && rum < 25) {
        suave = 1;
    }
    else if (rum >= 25 && rum <= 27) {
        suave = (27-rum)/(27-25);
    }
    else {
        suave = 0;
    }

    // Calcula o rum fraco
    if (rum >= 10 && rum < 15) {
        fraco = 1;
    }
    else if (rum >= 15 && rum <= 20) {
        fraco = (20-rum)/(20-15);
    }
    else {
        fraco = 0;
    }

    return new Array(forte, suave, fraco);
};

var calculaGelo = function(gelo) {
    if (gelo == 20) {
        return 1;
    }
    return 0;
};

var calculaCubaLibre = function(coca, pepsi, rum, gelo) {
    let grauRefri, grauRum, grauGelo, grauDrink = new Array(3);
    let forte = 0, suave = 1, fraco = 2;
    let isCuba;

    // -1 é o valor do refrigerante que não foi escolhido
    if (coca != -1) {
        grauRefri = calculaCoca(coca);
    }
    else {
        grauRefri = calculaPepsi(pepsi);
    }
    grauRum = calculaRum(rum);
    grauGelo = calculaGelo(gelo);

    grauDrink[forte] = Math.max(Math.min(grauRefri[forte], grauRum[suave], grauGelo),
                                Math.min(grauRefri[forte], grauRum[forte], grauGelo),
                                Math.min(grauRefri[suave], grauRum[forte], grauGelo));
                                
    grauDrink[suave] = Math.max(Math.min(grauRefri[forte], grauRum[fraco], grauGelo),
                                Math.min(grauRefri[suave], grauRum[suave], grauGelo),
                                Math.min(grauRefri[fraco], grauRum[forte], grauGelo));

    grauDrink[fraco] = Math.max(Math.min(grauRefri[fraco], grauRum[fraco], grauGelo),
                                Math.min(grauRefri[fraco], grauRum[suave], grauGelo),
                                Math.min(grauRefri[suave], grauRum[fraco], grauGelo));

    console.log(grauDrink);

    // Cria uma função chamada "testaCuba" que recebe um grau como parâmetro e retorna se esse grau é igual a 0
    let testaCuba = (grau) => grau === 0;

    // Passa cada item do array para a função testaCuba
    if (grauRefri.every(testaCuba) || grauRum.every(testaCuba) || grauGelo === 0) {
        isCuba = false;
    }
    else {
        isCuba = true;
    }

    // Equação final!!!
    let paladarDrink = Math.max(grauDrink[forte], grauDrink[suave], grauDrink[fraco]);

    sessionStorage.setItem("isCuba", isCuba);
    sessionStorage.setItem("grauDrink", grauDrink);
};

var carregaPgFinal = function() {
    let isCuba = sessionStorage.getItem("isCuba");
    let grauDrink = sessionStorage.getItem("grauDrink");

    // Define o paladar da bebida
    let paladar = new Array();
    if (grauDrink[0] != 0) {
        paladar.push("Forte");
    }
    if (grauDrink[2] != 0) {
        paladar.push("Suave")
    }
    if (grauDrink[4] != 0) {
        paladar.push("Fraco")
    }

    // Define o preço da bebida
    let preco;
    if (isCuba == "true") {
        switch (paladar[0]) {
            case "Fraco": 
                preco = 15; break;
            case "Suave":
                preco = 20; break;
            case "Forte":
                preco = 25;
        }
    }
    else {
        preco = 10;
    }
    
    // Indices do grauDrinl diferentes pq a var grauDrink é pega como string "0,0,0"
    $("#forcaDrink").html("Ele é " + grauDrink[0] + " forte, " + grauDrink[2] + " suave, e " + grauDrink[4] + " fraco!");

    if (isCuba == "true") {
        $("#simCuba").html("É um Cuba Libre " + paladar.join(" e ") + "!");
    }
    else {
        $("#imgCuba").prop("hidden", true);
        $("#imgCoca").prop("hidden", false);
        $("#naoCuba").prop("hidden", false);
        $("#simCuba").prop("hidden", true);
        $("#outroDrink").prop("hidden", false);
    }

    $("#preco").html("Preço: R$" + preco + ",00");
}


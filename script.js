const desafios = [
    { prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", titulo: "YoPRO: Sabor Doce", missao: "Qual ingrediente é usado para deixar a bebida doce sem usar o açúcar comum?", alvos: ["Adoçante (Sucralose)"], opcoes: ["Mel", "Adoçante (Sucralose)", "Açúcar Mascavo", "Caldo de Cana"], explica: "Eles usam adoçantes artificiais, como a Sucralose, para dar sabor doce sem adicionar calorias, mas o gosto pode ser mais artificial." },
    
    { prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", titulo: "YoPRO: Textura", missao: "O que eles colocam na bebida para ela não ficar rala como água?", alvos: ["Goma / Espessante"], opcoes: ["Farinha de trigo", "Goma / Espessante", "Amido de milho", "Gema de ovo"], explica: "Usam espessantes (como a Carragena) para imitar a cremosidade de uma vitamina natural." },
    
    { prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", titulo: "Trio: O Falso Saudável", missao: "Na lista de ingredientes, qual nome difícil é apenas um 'açúcar disfarçado'?", alvos: ["Maltodextrina"], opcoes: ["Aveia em flocos", "Maltodextrina", "Fibra alimentar", "Sódio"], explica: "A Maltodextrina vira açúcar rapidinho no seu sangue, dando fome logo depois de comer a barra." },
    
    { prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", titulo: "Trio: Sal no Doce?", missao: "Até em doces como essa barra tem sal (sódio). O excesso disso faz mal para quê?", alvos: ["Aumenta a Pressão"], opcoes: ["Dá espinhas", "Aumenta a Pressão", "Causa cáries", "Enfraquece os ossos"], explica: "A indústria usa sódio para conservar e realçar o sabor até nos doces. Com o tempo, isso pode causar pressão alta." },
    
    { prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", titulo: "Whey: Objetivo", missao: "As pessoas compram esse pó famoso nas academias principalmente para ingerir o quê?", alvos: ["Proteína"], opcoes: ["Gorduras boas", "Proteína", "Vitamina C", "Cálcio"], explica: "O foco do Whey é entregar uma grande quantidade de proteína de forma rápida para ajudar na força e nos músculos." },
    
    { prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", titulo: "Whey: De onde vem?", missao: "De onde a fábrica tira essa proteína para fazer o pó?", alvos: ["Do soro do leite"], opcoes: ["Da carne de boi", "Do soro do leite", "Do grão de soja", "Do trigo"], explica: "Whey Protein nada mais é do que a proteína que sobra no soro do leite líquido quando as fábricas vão fazer queijo." },
    
    { prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", titulo: "Grego: Cremosidade", missao: "Por que esse iogurte grego de prateleira é tão cremoso parecendo sobremesa?", alvos: ["Mais creme e gordura"], opcoes: ["Porque é muito batido", "Mais creme e gordura", "Vem congelado", "Tem muita água"], explica: "Para ficar grosso e gostoso, eles costumam adicionar creme de leite e gordura, o que aumenta bastante as calorias." },
    
    { prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", titulo: "Grego: O Perigo Doce", missao: "Quando você lê '16g de Carboidratos' na tabela desse iogurte, você está comendo o quê?", alvos: ["Muito açúcar misturado"], opcoes: ["Muita fibra saudável", "Muito açúcar misturado", "Pedaços de frutas", "Muitas vitaminas"], explica: "A maior parte desse número vem de puro açúcar jogado na mistura para deixar o iogurte com sabor de doce." }
];

let index = 0, score = 0, respondido = false;

const homeScreen = document.getElementById('home-screen'), gameArena = document.getElementById('game-arena');
const resultsScreen = document.getElementById('results-screen'), hud = document.getElementById('game-hud');
const laser = document.getElementById('laser-line'), grid = document.getElementById('ingredients-grid');
const feedbackBox = document.getElementById('feedback-text'), btnNext = document.getElementById('btn-next-question');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('btn-start').onclick = () => { homeScreen.classList.add('hidden'); gameArena.classList.remove('hidden'); hud.classList.remove('hidden'); carregarDesafio(); };
document.getElementById('btn-prev').onclick = () => { if(index > 0) { index--; carregarDesafio(); } };
document.getElementById('btn-next-skip').onclick = () => { if(index < 7) { index++; carregarDesafio(); } else { finalizar(); } };
document.getElementById('btn-home').onclick = () => { location.reload(); };

btnNext.onclick = () => { if(index < 7) { index++; carregarDesafio(); } else { finalizar(); } };

function carregarDesafio() {
    respondido = false; 
    btnNext.classList.add('hidden');
    const d = desafios[index];
    document.getElementById('current-phase-num').textContent = index + 1;
    document.getElementById('phase-title').textContent = "Escaneando";
    document.getElementById('phase-instruction').textContent = "Identificando dados da embalagem...";
    grid.innerHTML = ''; 
    feedbackBox.textContent = "Iniciando leitura óptica..."; 
    document.getElementById('img-frente').src = d.frente; 
    document.getElementById('img-rotulo').src = d.rotulo;
    laser.classList.add('scanning');
    
    setTimeout(() => { 
        laser.classList.remove('scanning'); 
        montarPergunta(d); 
    }, 1500);
}

function montarPergunta(d) {
    document.getElementById('phase-title').textContent = d.titulo;
    document.getElementById('phase-instruction').textContent = d.missao;
    feedbackBox.textContent = ""; 
    grid.innerHTML = '';
    
    const opcoesMisturadas = shuffleArray([...d.opcoes]);

    opcoesMisturadas.forEach(opt => {
        const p = document.createElement('div'); 
        p.className = 'pill animate-up'; 
        p.textContent = opt;
        p.onclick = () => {
            if (respondido) return; 
            respondido = true;
            if (d.alvos.includes(opt)) {
                p.classList.add('correct'); 
                score += 100; 
                document.getElementById('score').textContent = score;
                feedbackBox.innerHTML = `<strong>Acertou!</strong> ${d.explica}`;
                confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 }, colors: ['#A8DADC', '#457B9D', '#1D3557'] });
            } else { 
                p.classList.add('wrong'); 
                feedbackBox.innerHTML = `<strong>Ops!</strong> ${d.explica}`; 
            }
            btnNext.classList.remove('hidden');
        };
        grid.appendChild(p);
    });
}

function finalizar() {
    gameArena.classList.add('hidden'); 
    hud.classList.add('hidden'); 
    resultsScreen.classList.remove('hidden');
    
    const maxScore = desafios.length * 100;
    document.getElementById('final-score-val').textContent = `${score}/${maxScore}`;
    
    const rankMsg = document.getElementById('rank-message');
    if (score >= 800) rankMsg.textContent = "Incrível! Você tem um olhar clínico para rótulos.";
    else if (score >= 500) rankMsg.textContent = "Muito bem! Você já consegue fazer escolhas mais conscientes.";
    else rankMsg.textContent = "Continue praticando. Ler rótulos é um hábito que se constrói!";
}

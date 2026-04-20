const desafios = [
    { 
        prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", 
        titulo: "Bebida Pronta: Doce Mágico?", 
        missao: "O que eles colocam para a bebida ficar doce sem usar açúcar de verdade?", 
        alvos: ["Adoçante artificial"], 
        opcoes: ["Mel de abelha", "Adoçante artificial", "Açúcar mascavo", "Caldo de cana"], 
        explica: "Eles usam adoçante para enganar o paladar e não colocar calorias, mas o gosto fica mais artificial." 
    },
    { 
        prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", 
        titulo: "Bebida Pronta: Grossinha", 
        missao: "Por que essa bebida é tão cremosa e não é rala igual água?", 
        alvos: ["Eles misturam gomas"], 
        opcoes: ["Muito leite", "Eles misturam gomas", "Amido de milho", "Gema de ovo"], 
        explica: "A fábrica usa um pozinho chamado 'goma' para engrossar a bebida, imitando uma vitamina de verdade." 
    },
    { 
        prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", 
        titulo: "Barrinha: O Falso Saudável", 
        missao: "Qual palavra esquisita no rótulo é só um 'açúcar escondido'?", 
        alvos: ["Maltodextrina"], 
        opcoes: ["Aveia", "Maltodextrina", "Fibras", "Castanhas"], 
        explica: "Maltodextrina é um pó que vira açúcar puro na sua barriga. Dá fome rapidinho logo depois de comer!" 
    },
    { 
        prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", 
        titulo: "Barrinha: Sal no Doce?", 
        missao: "Acredite, tem sal (sódio) nessa barrinha doce! O que o excesso de sal faz?", 
        alvos: ["Sobe a pressão"], 
        opcoes: ["Dá dor de cabeça", "Sobe a pressão", "Causa cáries", "Enfraquece os ossos"], 
        explica: "A fábrica bota sal para o doce durar mais na prateleira. Mas muito sal faz mal pro coração e sobe a pressão." 
    },
    { 
        prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", 
        titulo: "Pó de Academia: Para quê?", 
        missao: "O que tem nesse pó famoso que ajuda a criar e consertar músculos?", 
        alvos: ["Muita Proteína"], 
        opcoes: ["Gordura boa", "Muita Proteína", "Vitamina C", "Cálcio dos ossos"], 
        explica: "A proteína é como se fosse o 'tijolinho' que o corpo usa para construir os músculos depois de um esforço físico." 
    },
    { 
        prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", 
        titulo: "Pó de Academia: De onde vem?", 
        missao: "Você sabia que esse pó vem de algo muito comum na cozinha? De onde é?", 
        alvos: ["Do soro do leite"], 
        opcoes: ["Da carne de boi", "Do soro do leite", "Da planta da soja", "Da farinha de trigo"], 
        explica: "'Whey' é só uma palavra chique em inglês para 'Soro do Leite'. É aquela aguinha que sobra quando vão fazer queijo!" 
    },
    { 
        prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", 
        titulo: "Iogurte Grego: A Sobremesa", 
        missao: "O que deixa esse iogurte tão cremoso e pesado, parecendo uma sobremesa?", 
        alvos: ["Creme de leite adicionado"], 
        opcoes: ["Foi muito batido", "Creme de leite adicionado", "Foi congelado", "Tem muita água"], 
        explica: "Para ficar tão gostoso, a fábrica mistura creme de leite e mais gordura. Fica uma delícia, mas engorda mais!" 
    },
    { 
        prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", 
        titulo: "Iogurte Grego: O Perigo", 
        missao: "A tabela diz que ele tem muito 'Carboidrato'. O que isso significa nesse caso?", 
        alvos: ["Que é cheio de açúcar"], 
        opcoes: ["Que tem muita fibra", "Que é cheio de açúcar", "Que tem pedaços de fruta", "Que dá saúde"], 
        explica: "Em produtos assim do mercado, a palavra bonita 'carboidrato' quase sempre esconde colheradas de açúcar branco escondidas." 
    }
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

document.getElementById('btn-start').onclick = () => { 
    homeScreen.classList.add('hidden'); 
    gameArena.classList.remove('hidden'); 
    hud.classList.remove('hidden'); 
    carregarDesafio(); 
};

document.getElementById('btn-prev').onclick = () => { 
    if(index > 0) { index--; carregarDesafio(); } 
};

document.getElementById('btn-next-skip').onclick = () => { 
    if(index < 7) { index++; carregarDesafio(); } else { finalizar(); } 
};

document.getElementById('btn-home').onclick = () => { 
    location.reload(); 
};

btnNext.onclick = () => { 
    if(index < 7) { index++; carregarDesafio(); } else { finalizar(); } 
};

function carregarDesafio() {
    respondido = false; 
    btnNext.classList.add('hidden');
    const d = desafios[index];
    
    document.getElementById('current-phase-num').textContent = index + 1;
    document.getElementById('phase-title').textContent = "Escaneando";
    document.getElementById('phase-instruction').textContent = "Procurando as pistas na embalagem...";
    grid.innerHTML = ''; 
    feedbackBox.textContent = "Olhando o rótulo com atenção..."; 
    
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
    if (score >= 800) rankMsg.textContent = "Fantástico! Ninguém mais te engana no supermercado.";
    else if (score >= 500) rankMsg.textContent = "Muito bem! Você já está aprendendo a fugir das pegadinhas.";
    else rankMsg.textContent = "É só o começo! Continue prestando atenção no que você come.";
}

const desafios = [
    { 
        prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", 
        titulo: "Bebida Pronta: Doce Mágico?", 
        missao: "Se não tem açúcar normal, o que a fábrica coloca para a bebida ficar docinha?", 
        alvos: ["Adoçante"], 
        opcoes: ["Mel de abelha", "Adoçante", "Açúcar mascavo", "Caldo de cana"], 
        explica: "A fábrica usa adoçantes artificiais para o produto ficar doce sem somar calorias. O corpo sente o doce, mas o sabor fica artificial." 
    },
    { 
        prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", 
        titulo: "Bebida Pronta: Cremosa", 
        missao: "Por que essa bebida de caixinha é tão grossinha e não é rala igual água?", 
        alvos: ["Eles colocam um pó que engrossa"], 
        opcoes: ["Tem muito leite", "Eles colocam um pó que engrossa", "É feita com muitas frutas", "Batem com muito gelo"], 
        explica: "Eles adicionam pós chamados espessantes (ou gomas) para a bebida imitar a textura de uma vitamina batida na hora." 
    },
    { 
        prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", 
        titulo: "Barrinha: Falsa Saudável", 
        missao: "As barrinhas parecem saudáveis, mas o que eles escondem na lista com nomes muito difíceis?", 
        alvos: ["Açúcar disfarçado"], 
        opcoes: ["Frutas de verdade", "Açúcar disfarçado", "Sementes naturais", "Pedaços de castanhas"], 
        explica: "Eles usam nomes estranhos (como xarope ou maltodextrina). Para o corpo, isso é puro açúcar escondido, que não enche a barriga." 
    },
    { 
        prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", 
        titulo: "Barrinha: Sal no Doce?", 
        missao: "Acredite, até o doce tem sal na embalagem! O que muito sal faz com o corpo?", 
        alvos: ["Sobe a pressão do sangue"], 
        opcoes: ["Dá dor de estômago", "Sobe a pressão do sangue", "Faz os dentes caírem", "Enfraquece os ossos"], 
        explica: "A fábrica coloca sal para o doce durar meses na prateleira. Comer isso sempre faz o coração trabalhar mais e a pressão subir." 
    },
    { 
        prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", 
        titulo: "Pó de Academia", 
        missao: "O que tem dentro desse pó famoso que as pessoas tomam para ficar mais fortes?", 
        alvos: ["Muitas proteínas"], 
        opcoes: ["Gorduras que dão energia", "Muitas proteínas", "Somente vitaminas", "Cálcio puro para os ossos"], 
        explica: "A proteína é o tijolo que o corpo usa para construir e consertar o músculo depois de fazer força ou exercício." 
    },
    { 
        prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", 
        titulo: "Pó de Academia: Origem", 
        missao: "Você sabia que a proteína desse pote vem de algo muito comum? De onde é?", 
        alvos: ["Soro do Leite"], 
        opcoes: ["Da carne do boi", "Soro do Leite", "Da planta da soja", "Da farinha de trigo seca"], 
        explica: "Whey é só o nome em inglês para o 'soro do leite'. É a aguinha nutritiva que sobra na fábrica quando eles fazem o queijo." 
    },
    { 
        prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", 
        titulo: "Grego: Parecendo Sobremesa", 
        missao: "O que eles misturam nesse iogurte do mercado para ele ficar pesado parecendo uma sobremesa?", 
        alvos: ["Creme de leite e gordura"], 
        opcoes: ["Fica batendo por horas", "Creme de leite e gordura", "Congelam na fábrica", "Apenas frutas puras"], 
        explica: "Para o iogurte ficar gostoso e cremoso daquele jeito, a fábrica joga creme de leite na mistura, deixando o pote muito mais gordo." 
    },
    { 
        prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", 
        titulo: "Grego: O Alerta", 
        missao: "Na tabela diz que ele tem muito 'Carboidrato'. Para iogurtes coloridos de mercado, o que isso esconde?", 
        alvos: ["Muitas colheres de açúcar branco"], 
        opcoes: ["Fibras boas para o intestino", "Muitas colheres de açúcar branco", "Pedaços de frutas frescas", "Leite puro da fazenda"], 
        explica: "Palavras bonitas na tabela podem te enganar. Num iogurte industrial com sabor doce, esse número significa muito açúcar adicionado." 
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
    document.getElementById('phase-title').textContent = "Lendo a embalagem";
    document.getElementById('phase-instruction').textContent = "Procurando pistas...";
    grid.innerHTML = ''; 
    feedbackBox.textContent = "Aguarde, analisando os dados..."; 
    
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
                feedbackBox.innerHTML = `<strong>Puxa, errou!</strong> ${d.explica}`; 
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
    if (score >= 800) rankMsg.textContent = "Excelente! Você está pronto para fazer compras muito melhores.";
    else if (score >= 500) rankMsg.textContent = "Muito bem! Você já aprendeu a fugir das piores pegadinhas do mercado.";
    else rankMsg.textContent = "Esse é só o começo! Continue treinando o olhar na hora das compras.";
}

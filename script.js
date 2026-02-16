const desafios = [
    { prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", titulo: "YoPRO: Adoçantes", missao: "Qual edulcorante substitui o açúcar neste produto?", alvos: ["Sucralose"], opcoes: ["Mel", "Sucralose", "Açúcar mascavo", "Glicose"], explica: "A Sucralose é um edulcorante que confere doçura sem as calorias do açúcar comum." },
    { prod: "YoPRO Chocolate", frente: "assets/yopro-frente.png", rotulo: "assets/yopro-rotulo.png", titulo: "YoPRO: Textura", missao: "Qual ingrediente garante a consistência densa?", alvos: ["Carragena"], opcoes: ["Farinha", "Carragena", "Amido", "Ovo"], explica: "A Carragena é utilizada para estabilizar e espessar bebidas lácteas." },
    { prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", titulo: "Trio: Carboidratos", missao: "Qual destes é um carboidrato processado presente no produto?", alvos: ["Maltodextrina"], opcoes: ["Aveia", "Maltodextrina", "Sal", "Fibra"], explica: "A Maltodextrina possui alto índice glicêmico e rápida absorção." },
    { prod: "Barra de Cereal Trio", frente: "assets/trio-frente.png", rotulo: "assets/trio-rotulo.png", titulo: "Trio: Sódio", missao: "Por que o sódio é monitorado em alimentos processados?", alvos: ["Pressão Arterial"], opcoes: ["Aumentar Brilho", "Pressão Arterial", "Melhorar Cor", "Saúde Óssea"], explica: "O consumo excessivo de sódio está correlacionado ao aumento da pressão arterial." },
    { prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", titulo: "Whey: Nutrientes", missao: "Qual o macronutriente predominante neste suplemento?", alvos: ["Proteína"], opcoes: ["Gordura", "Proteína", "Vitamina C", "Sódio"], explica: "O Whey Protein concentra proteínas essenciais para a reparação muscular." },
    { prod: "Whey Max Titanium", frente: "assets/whey-frente.png", rotulo: "assets/whey-rotulo.png", titulo: "Whey: Origem", missao: "Qual a fonte principal da proteína deste produto?", alvos: ["Soro do Leite"], opcoes: ["Soja", "Soro do Leite", "Trigo", "Milho"], explica: "A proteína é extraída do soro do leite durante a fabricação de queijos." },
    { prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", titulo: "Grego: Gorduras", missao: "O que confere a consistência densa ao iogurte grego?", alvos: ["Teor de Gordura"], opcoes: ["Água", "Teor de Gordura", "Injeção de Ar", "Sódio"], explica: "A densidade do iogurte grego advém do maior teor de gorduras lácteas." },
    { prod: "Iogurte Grego Vigor", frente: "assets/grego-frente.png", rotulo: "assets/grego-rotulo.png", titulo: "Grego: Carboidratos", missao: "Neste produto, os carboidratos totais derivam de:", alvos: ["Açúcares e Lactose"], opcoes: ["Fibras", "Açúcares e Lactose", "Proteína", "Minerais"], explica: "Engloba a lactose do leite e açúcares adicionados para sabor." }
];

let index = 0, score = 0, respondido = false;

const homeScreen = document.getElementById('home-screen'), gameArena = document.getElementById('game-arena');
const resultsScreen = document.getElementById('results-screen'), hud = document.getElementById('game-hud');
const laser = document.getElementById('laser-line'), grid = document.getElementById('ingredients-grid');
const feedbackBox = document.getElementById('feedback-text'), btnNext = document.getElementById('btn-next-question');

document.getElementById('btn-start').onclick = () => { homeScreen.classList.add('hidden'); gameArena.classList.remove('hidden'); hud.classList.remove('hidden'); carregarDesafio(); };
document.getElementById('btn-prev').onclick = () => { if(index > 0) { index--; carregarDesafio(); } };
document.getElementById('btn-next-skip').onclick = () => { if(index < 7) { index++; carregarDesafio(); } else { finalizar(); } };
document.getElementById('btn-home').onclick = () => { location.reload(); };

btnNext.onclick = () => { if(index < 7) { index++; carregarDesafio(); } else { finalizar(); } };

function carregarDesafio() {
    respondido = false; btnNext.classList.add('hidden');
    const d = desafios[index];
    document.getElementById('current-phase-num').textContent = index + 1;
    document.getElementById('phase-title').textContent = "Escaneando";
    document.getElementById('phase-instruction').textContent = "Identificando dados nutricionais.";
    grid.innerHTML = ''; feedbackBox.textContent = "Iniciando leitura óptica..."; 
    document.getElementById('img-frente').src = d.frente; document.getElementById('img-rotulo').src = d.rotulo;
    laser.classList.add('scanning');
    setTimeout(() => { laser.classList.remove('scanning'); montarPergunta(d); }, 1500);
}

function montarPergunta(d) {
    document.getElementById('phase-title').textContent = d.titulo;
    document.getElementById('phase-instruction').textContent = d.missao;
    feedbackBox.textContent = ""; grid.innerHTML = '';
    d.opcoes.forEach(opt => {
        const p = document.createElement('div'); p.className = 'pill animate-up'; p.textContent = opt;
        p.onclick = () => {
            if (respondido) return; respondido = true;
            if (d.alvos.includes(opt)) {
                p.classList.add('correct'); score += 100; document.getElementById('score').textContent = score;
                feedbackBox.innerHTML = `<strong>Correto.</strong> ${d.explica}`;
                confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ['#A8DADC', '#B5EAD7'] });
            } else { p.classList.add('wrong'); feedbackBox.innerHTML = `<strong>Incorreto.</strong> ${d.explica}`; }
            btnNext.classList.remove('hidden');
        };
        grid.appendChild(p);
    });
}

function finalizar() {
    gameArena.classList.add('hidden'); hud.classList.add('hidden'); resultsScreen.classList.remove('hidden');
    document.getElementById('final-score-val').textContent = score;
    const rankMsg = document.getElementById('rank-message');
    if (score >= 800) rankMsg.textContent = "Excelente! Você é um mestre dos rótulos.";
    else if (score >= 500) rankMsg.textContent = "Muito bom! Você possui conhecimento crítico.";
    else rankMsg.textContent = "Continue praticando para dominar a análise técnica.";
}
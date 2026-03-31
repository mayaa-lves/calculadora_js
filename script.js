let valorAtual = '';
let valorAnterior = '';
let operacao = '';

// Pegando os elementos da tela
const visor = document.getElementById('current');
const visorHistorico = document.getElementById('history');
const listaNoPainel = document.getElementById('lista-historico-itens');
const painel = document.getElementById('painel-historico');

// ve se tem algum historico, se nao tem, começa vazio []
let bancoDeDados = JSON.parse(localStorage.getItem('minhasContas')) || [];

function adicionarNumero(numero) {
    valorAtual = valorAtual + numero;
    visor.innerText = valorAtual;
}

function limpar() {
    valorAtual = '';
    valorAnterior = '';
    operacao = '';
    visor.innerText = '0';
    visorHistorico.innerText = '';
}

function definirOperacao(sinal) {
    if (valorAtual === '') return;
    
    operacao = sinal;
    valorAnterior = valorAtual;
    valorAtual = '';
    
    visorHistorico.innerText = valorAnterior + " " + sinal;
    visor.innerText = '';
}

function calcular() {
    if (operacao === '' || valorAtual === '') return;

    let n1 = parseFloat(valorAnterior);
    let n2 = parseFloat(valorAtual);
    let resultado = 0;

    if (operacao === '+') resultado = n1 + n2;
    if (operacao === '-') resultado = n1 - n2;
    if (operacao === '*') resultado = n1 * n2;
    if (operacao === '/') resultado = n1 / n2;

    // Salva a conta no navegador (LocalStorage)
    let textoDaConta = valorAnterior + " " + operacao + " " + valorAtual + " = " + resultado;
    bancoDeDados.push(textoDaConta); // Coloca na lista
    localStorage.setItem('minhasContas', JSON.stringify(bancoDeDados)); // Salva no navegador

    // Mostra no visor
    visorHistorico.innerText = textoDaConta;
    visor.innerText = resultado;

    // Prepara para a próxima conta
    valorAtual = resultado.toString();
    valorAnterior = '';
    operacao = '';
}

// Funções do histórico
function mostrarHistoricoCompleto() {
    listaNoPainel.innerHTML = ""; 

    // Para cada conta que está salva, cria uma linha nova
    bancoDeDados.forEach(function(conta) {
        let novaDiv = document.createElement('div');
        novaDiv.classList.add('item-historico');
        novaDiv.innerText = conta;
        listaNoPainel.appendChild(novaDiv);
    });

    painel.classList.add('aberto'); // Sobe a aba
}

function fecharHistorico() {
    painel.classList.remove('aberto'); // Desce a aba
}

function limparLocalStorage() {
    bancoDeDados = []; // Esvazia a lista no código
    localStorage.clear(); // Apaga tudo que salvou no navegador
    mostrarHistoricoCompleto(); // Atualiza a tela (vai ficar vazia)
}

// Botões extras
function backspace() { 
    valorAtual = valorAtual.slice(0, -1); 
    visor.innerText = valorAtual || '0'; 
}
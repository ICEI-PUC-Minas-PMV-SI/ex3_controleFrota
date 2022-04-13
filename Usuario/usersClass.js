class Usuario {
  constructor(nome, sobrenome, dia, mes, ano, email, senha, cpf) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.dia = dia;
    this.mes = mes;
    this.ano = ano;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
  }

  // Adding a method to the constructor
  greet() {
    return `${this.nome} says hello.`;
  }
}

// Creating a new class from the parent
class Motorista extends Usuario {
  constructor(name, spell) {
    // Chain constructor with super
    super(name);

    // Add a new property
    this.spell = spell;
  }
}

var form = document.querySelector('form');
var nome = document.getElementById('nome');
var nomeInvalido = document.getElementById('nomeInvalido');
var sobrenome = document.getElementById('sobrenome');
var sobrenomeInvalido = document.getElementById('sobrenomeInvalido');
var dia = document.getElementById('dia');
var diaInvalido = document.getElementById('diaInvalido');
var mes = document.getElementById('mes');
var mesInvalido = document.getElementById('mesInvalido');
var ano = document.getElementById('ano');
var anoInvalido = document.getElementById('anoInvalido');
var email = document.getElementById('email');
var emailInvalido = document.getElementById('emailInvalido');
var senha = document.getElementById('senha');
var senhaInvalido = document.getElementById('senhaInvalido');
var confirmarSenha = document.getElementById('confirmarSenha');
var confirmarSenhaInvalido = document.getElementById('confirmarSenhaInvalido');



var submit = document.getElementById('btnsubmit');


//var hero1 = new Hero();
//form.onsubmit = function(e)

submit.addEventListener("click", function(e) {
  e.preventDefault();
  var validarEmail = function (email) {
    var regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
  }
  var validarSenha = function (senha) {
    var regexSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-$*&@#])(?:([0-9a-zA-Z-$*&@#])(?!\1)){8,}$/i;
    return regexSenha.test(senha);
  }
  var senhaValida = "";
  if (nome.value === '') {
    nomeInvalido.textContent = 'Você precisa preencher seu nome!';
  } else if (nome.value !== '') {
    nomeInvalido.textContent = '';
  }
  if (sobrenome.value === '') {
    sobrenomeInvalido.textContent = 'Você precisa preencher seu sobrenome!';
  } else if (sobrenome.value !== '') {
    sobrenomeInvalido.textContent = '';
  }
  if (dia.value === '') {
    diaInvalido.textContent = 'Você precisa preencher o dia da data do seu aniversário!';
  } else if (dia.value !== '') {
    diaInvalido.textContent = '';
  }
  if (mes.value === '') {
    mesInvalido.textContent = 'Você precisa preencher o mês da data do seu aniversário!';
  } else if (mes.value !== '') {
    mesInvalido.textContent = '';
  }
  if (ano.value === '') {
    anoInvalido.textContent = 'Você precisa preencher o ano da data do seu aniversário!';
  } else if (ano.value !== '') {
    anoInvalido.textContent = '';
  }
  if (email.value === '') {
    emailInvalido.textContent = 'Você precisa preencher o seu endereço de e-mail!';
  } else if (validarEmail(email.value) === false) {
    emailInvalido.textContent = 'O seu endereço de e-mail não é válido, por favor, verifique.';
  } else if (validarEmail(email.value) === true) {
    emailInvalido.textContent = '';
  }
  if (senha.value === '') {
    senhaInvalido.textContent = 'Você precisa preencher a sua senha!';
  } else if (validarSenha(senha.value) === false) {
    senhaInvalido.textContent = 'A senha informada não é válida, por favor, verifique.';
  } else if (validarSenha(senha.value) === true) {
    senhaInvalido.textContent = '';
  }


  if (confirmarSenha.value === '') {
    confirmarSenhaInvalido.textContent = 'Você precisa confirmar a sua senha!';
  } else if (validarSenha(confirmarSenha.value) === false) {
    confirmarSenhaInvalido.textContent = 'A senha informada não é válida, por favor, verifique.';
  } else if ((validarSenha(senha.value) === true && validarSenha(confirmarSenha.value) === true) &&
  (senha.value !== confirmarSenha.value)) {
    confirmarSenhaInvalido.textContent = 'As senhas não são iguais, por favor, verifique.';
  } else if ((validarSenha(senha.value) === true && validarSenha(confirmarSenha.value) === true) &&
  (senha.value === confirmarSenha.value)) {
    senhaValida = "OK";
    confirmarSenhaInvalido.textContent = '';
  }




  if (nome.value.length > 0 && sobrenome.value.length > 0 && dia.value.length > 0 &&
  mes.value.length > 0 && ano.value.length > 0 && validarEmail(email.value) === true &&
  senhaValida.length > 0) {
    let usuario = new Usuario(nome.value, sobrenome.value, dia.value, mes.value, ano.value,
    email.value, senha.value);
    console.log(usuario);
    console.log(usuario.greet());
  }

  return;
});
//Model para registro de carros
const CarRegister = mongoose.model('CarRegister', carModel);

const register = new CarRegister({
  modelo: 'Ferrari F40',
  fabricante: 'Ferrari',
  anoFabricacao: '1991',
  anoModelo: '1991',
  combustivel: 'Gasolina',
  carroceria: 'esportiva',
  resumo: {
    descricao: 'Veículo de ostentação',
    autor: 'Cleverson Rocha'
  },
  reservado: true
});

register.save()
  .then(() => {
    console.log(chalk.yellow('Registro salvo!'))
  }).catch(err => {
    console.log(err);
  })
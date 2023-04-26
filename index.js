const fetch = require('node-fetch');

const cadastrarPessoa = async () => {
  const nome = 'Fulano';
  const cpf = '123.456.789-00';
  const data_nascimento = '2000-01-01T00:00:00.000Z';
  const matricula = '00001';
  const email = 'fulano@example.com';
  const id_unidade = 1;

  try {
    const response = await fetch('http://localhost:3000/insertPessoa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        cpf,
        data_nascimento,
        matricula,
        email,
        id_unidade,
      }),
    });

    if (response.ok) {
      console.log('Pessoa cadastrada com sucesso');
    } else {
      console.error('Erro ao cadastrar pessoa');
    }
  } catch (error) {
    console.error(error);
  }
};

cadastrarPessoa();


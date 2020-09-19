
// Exercício 1
function checaIdade(idade) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      (idade >= 18) ? resolve() : reject();
    }, 2000)
  });
}

function renderLi(data, ul) {
  var li = document.createElement('li');
  var textFork = data.fork ? ' (Fork)' : '';
  var text = document.createTextNode(data.name + textFork);
  li.appendChild(text);
  ul.appendChild(li);
}

function cleanUlHTML() {
  ul.innerHTML = '';
}

function errorsResponse(error) {
  if (error.response.status == 404) {
    return alert('Usuário inexistente');
  }
  return console.warn('Erro na requisição');
}

checaIdade(20)
  .then(function (response) {
    console.log('Maior que 18');
  })
  .catch(function (error) {
    console.warn('Menor que 18');
  })

// Exercício 2 e 3

var ul = document.querySelector('ul');

// On Button Click
document.querySelector('#listDataUser')
  .onclick = () => {
    // Get name of username
    let userName = document.querySelector('input[name=user]');

    // Create a li
    let liLoading = document.createElement('li');

    // Create and add a text to li element
    let text = document.createTextNode('Carregando...');
    liLoading.appendChild(text);

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Add li into ul before request is sents
      ul.appendChild(liLoading);
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    cleanUlHTML();
    axios.get(`https://api.github.com/users/${userName.value}/repos`)
      .then(function (response) {
        cleanUlHTML();
        response.data.forEach(element => {
          renderLi(element, ul);
        })
      })
      .catch(function (error) {
        cleanUlHTML();
        errorsResponse(error);
      })
  }
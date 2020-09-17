
// Exercício 1
function checaIdade(idade) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (idade >= 18) {
        resolve();
      } else {
        reject();
      }
    }, 2000)
  });
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

// Button
document.querySelector('#listDataUser').onclick = () => {
  var userName = document.querySelector('input[name=user]');

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

  ul.innerHTML = '';
  axios.get(`https://api.github.com/users/${userName.value}/repos`)
    .then(function (response) {
      ul.innerHTML = '';
      response.data.forEach(element => {
        var li = document.createElement('li');
        var textFork = element.fork ? ' (Fork)' : '';
        var text = document.createTextNode(element.name + textFork);
        li.appendChild(text);
        ul.appendChild(li);
      })
    })
    .catch(function (error) {
      ul.innerHTML = '';
      if (error.response.status == 404) {
        alert('Usuário inexistente');
      } else {
        console.warn('Erro na requisição');
      }
    })
}
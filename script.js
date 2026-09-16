
// PRODUTOS


const produtos = [

  {
    id: 1,

    nome: "Dog Tag Militar Dupla",

    preco: 49.90,

    imagem: "images.assets/dogtag.png",

    descricao:
      "Plaqueta de identificação militar dupla em aço inox com corrente e silenciadores de borracha."
  },

  {
    id: 2,

    nome: "Mochila Tática Modular 45L",

    preco: 229.90,

    imagem: "images.assets/mochila.png",

    descricao:
      "Mochila tática preta de alta resistência com sistema MOLLE e compartimentos multifuncionais."
  },

  {
    id: 3,

    nome: "Kit Patches Táticos Emborrachados",

    preco: 35.00,

    imagem: "images.assets/patch.png",

    descricao:
      "Conjunto de patches emborrachados em alto relevo com fixação por velcro."
  }

];



// VARIÁVEIS


let carrinho = [];



// ELEMENTOS


const produtosContainer =
  document.getElementById("produtos-container");

const cartCount =
  document.getElementById("cart-count");

const cartItems =
  document.getElementById("cart-items");

const cartTotal =
  document.getElementById("cart-total");

const welcomeMsg =
  document.getElementById("welcome-msg");

const authBtn =
  document.getElementById("auth-btn");



// FORMATAR PREÇO


function formatarPreco(valor) {

  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

}



// RENDERIZAR PRODUTOS


function renderizarProdutos() {

  produtosContainer.innerHTML = "";

  produtos.forEach((produto) => {

    const card =
      document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <img
        class="product-image"
        src="${produto.imagem}"
        alt="${produto.nome}"
        loading="lazy"
      >

      <div class="product-info">

        <h3>
          ${produto.nome}
        </h3>

        <p class="description">
          ${produto.descricao}
        </p>

        <div class="price">
          R$ ${formatarPreco(produto.preco)}
        </div>

        <button
          type="button"
          onclick="adicionarAoCarrinho(${produto.id})"
        >
          🛒 Adicionar ao Carrinho
        </button>

      </div>

    `;

    produtosContainer.appendChild(card);

  });

}



// ADICIONAR AO CARRINHO


function adicionarAoCarrinho(id) {

  const produto =
    produtos.find(
      item => item.id === id
    );

  if (!produto) {
    return;
  }

  carrinho.push(produto);

  atualizarCarrinho();

  alert(
    `${produto.nome} foi adicionado ao carrinho!`
  );

}


// REMOVER DO CARRINHO


function removerDoCarrinho(index) {

  carrinho.splice(index, 1);

  atualizarCarrinho();

}



// ATUALIZAR CARRINHO


function atualizarCarrinho() {

  cartCount.textContent =
    carrinho.length;

  cartItems.innerHTML = "";

  if (carrinho.length === 0) {

    cartItems.innerHTML = `
      <li class="empty-cart">
        Seu carrinho está vazio.
      </li>
    `;

    cartTotal.textContent = "0,00";

    return;
  }


  let total = 0;


  carrinho.forEach(
    (produto, index) => {

      total += produto.preco;


      const item =
        document.createElement("li");


      item.innerHTML = `

        <span class="cart-product-name">
          ${produto.nome}
        </span>

        <span class="cart-product-price">
          R$ ${formatarPreco(produto.preco)}
        </span>

        <button
          type="button"
          class="remove-item"
          onclick="removerDoCarrinho(${index})"
        >
          Remover
        </button>

      `;


      cartItems.appendChild(item);

    }
  );


  cartTotal.textContent =
    formatarPreco(total);

}


// ABRIR LOGIN


function openLogin() {

  closeModal("register-modal");

  const modal =
    document.getElementById("login-modal");

  modal.style.display = "flex";

}



// ABRIR CADASTRO


function openRegister() {

  closeModal("login-modal");

  const modal =
    document.getElementById("register-modal");

  modal.style.display = "flex";

}



// ABRIR CARRINHO


function openCart() {

  atualizarCarrinho();

  const modal =
    document.getElementById("cart-modal");

  modal.style.display = "flex";

}



// FECHAR MODAL


function closeModal(id) {

  const modal =
    document.getElementById(id);

  modal.style.display = "none";

}



// CADASTRO


document
  .getElementById("register-form")
  .addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const nome =
        document
          .getElementById("register-name")
          .value
          .trim();


      const email =
        document
          .getElementById("register-email")
          .value
          .trim()
          .toLowerCase();


      const senha =
        document
          .getElementById("register-password")
          .value;


      const confirmarSenha =
        document
          .getElementById("register-confirm-password")
          .value;


      if (senha !== confirmarSenha) {

        alert("As senhas não são iguais.");

        return;
      }


      if (senha.length < 6) {

        alert(
          "A senha precisa ter pelo menos 6 caracteres."
        );

        return;
      }


      const usuarios =
        JSON.parse(
          localStorage.getItem("mamforceUsers")
        ) || [];


      const usuarioExiste =
        usuarios.some(
          usuario =>
            usuario.email === email
        );


      if (usuarioExiste) {

        alert(
          "Este e-mail já está cadastrado."
        );

        return;
      }


      const novoUsuario = {

        nome: nome,

        email: email,

        senha: senha

      };


      usuarios.push(novoUsuario);


      localStorage.setItem(
        "mamforceUsers",
        JSON.stringify(usuarios)
      );


      alert(
        "Cadastro realizado com sucesso!"
      );


      this.reset();


      openLogin();

    }
  );



// LOGIN


document
  .getElementById("login-form")
  .addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const email =
        document
          .getElementById("login-email")
          .value
          .trim()
          .toLowerCase();


      const senha =
        document
          .getElementById("login-password")
          .value;


      const usuarios =
        JSON.parse(
          localStorage.getItem("mamforceUsers")
        ) || [];


      const usuario =
        usuarios.find(
          item =>
            item.email === email &&
            item.senha === senha
        );


      if (!usuario) {

        alert(
          "E-mail ou senha incorretos."
        );

        return;
      }


      localStorage.setItem(
        "mamforceLoggedUser",
        JSON.stringify(usuario)
      );


      atualizarUsuario();


      closeModal("login-modal");


      this.reset();


      alert(
        `Bem-vindo à MAM-FORCE, ${usuario.nome}!`
      );

    }
  );



// ATUALIZAR USUÁRIO


function atualizarUsuario() {

  const usuario =
    JSON.parse(
      localStorage.getItem(
        "mamforceLoggedUser"
      )
    );


  if (usuario) {

    welcomeMsg.textContent =
      `Olá, ${usuario.nome}!`;

    authBtn.textContent =
      "Sair";

    authBtn.onclick =
      logout;

  } else {

    welcomeMsg.textContent =
      "";

    authBtn.textContent =
      "Login";

    authBtn.onclick =
      openLogin;

  }

}



// LOGOUT


function logout() {

  localStorage.removeItem(
    "mamforceLoggedUser"
  );


  atualizarUsuario();


  alert(
    "Você saiu da sua conta."
  );

}



// FINALIZAR PEDIDO


function checkout() {

  if (carrinho.length === 0) {

    alert(
      "Seu carrinho está vazio."
    );

    return;
  }


  const usuario =
    JSON.parse(
      localStorage.getItem(
        "mamforceLoggedUser"
      )
    );


  if (!usuario) {

    alert(
      "Faça login ou cadastre-se para finalizar o pedido."
    );

    closeModal("cart-modal");

    openLogin();

    return;
  }


  const total =
    carrinho.reduce(
      (soma, produto) =>
        soma + produto.preco,
      0
    );


  alert(
    `Pedido criado com sucesso!\n\n` +
    `Cliente: ${usuario.nome}\n` +
    `Itens: ${carrinho.length}\n` +
    `Total: R$ ${formatarPreco(total)}`
  );


  carrinho = [];


  atualizarCarrinho();


  closeModal("cart-modal");

}



// FECHAR MODAIS CLICANDO FORA


document
  .querySelectorAll(".modal")
  .forEach(
    modal => {

      modal.addEventListener(
        "click",
        function(event) {

          if (
            event.target === modal
          ) {

            modal.style.display =
              "none";

          }

        }
      );

    }
  );



// TECLA ESC


document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      document
        .querySelectorAll(".modal")
        .forEach(
          modal => {
            modal.style.display =
              "none";
          }
        );

    }

  }
);



// INICIALIZAÇÃO


renderizarProdutos();

atualizarCarrinho();

atualizarUsuario();

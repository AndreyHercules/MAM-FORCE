const produtos = [
  {
    id: 1,
    nome: "Dog Tag Militar Dupla",
    preco: 49.90,
    imagem: "img/dogtag.jpg",
    descricao: "Plaqueta de identificação militar dupla em aço inox com corrente e silenciadores de borracha."
  },
  {
    id: 2,
    nome: "Mochila Tática Modular 45L",
    preco: 229.90,
    imagem: "img/mochila.jpg",
    descricao: "Mochila tática preta de alta resistência com sistema MOLLE e compartimentos multifuncionais."
  },
  {
    id: 3,
    nome: "Kit Patches Táticos Emborrachados",
    preco: 35.00,
    imagem: "img/patches.jpg",
    descricao: "Conjunto de patches emborrachados em alto relevo com fixação por velcro."
  }
];

function renderizarProdutos() {
  const container = document.getElementById("produtos-container");
  if (!container) return;

  container.innerHTML = "";

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" style="width:100%; height:200px; object-fit:cover; border-radius:4px; margin-bottom:1rem;">
      <h3>${p.nome}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">${p.descricao}</p>
      <div class="price">R$ ${p.preco.toFixed(2)}</div>
      <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao Carrinho</button>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderizarProdutos);
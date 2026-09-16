const products = [
    { id: 1, name: "Dog Tag Personalizada", price: 45.00, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300", desc: "Aço inoxidável com gravação a laser." },
    { id: 2, name: "Patch Emborrachado Tático", price: 25.00, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300", desc: "Fixação em velcro de alta aderência." },
    { id: 3, name: "Mochila Tática MOLLE 45L", price: 280.00, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300", desc: "Nylon 600D resistente à água." }
  ];
  
  let cart = JSON.parse(localStorage.getItem('mam_cart')) || [];
  let currentUser = localStorage.getItem('mam_user') || null;
  
  function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p><strong>R$ ${p.price.toFixed(2)}</strong></p>
        <button onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
      </div>
    `).join('');
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('mam_cart', JSON.stringify(cart));
    updateUI();
  }
  
  function openModal() { document.getElementById('login-modal').style.display = 'flex'; }
  function openCart() { renderCartModal(); document.getElementById('cart-modal').style.display = 'flex'; }
  function closeModal(id) { document.getElementById(id).style.display = 'none'; }
  
  function renderCartModal() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = cart.map(item => `<li>${item.name} - R$ ${item.price.toFixed(2)}</li>`).join('');
    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }
  
  function checkout() {
    if (cart.length === 0) return alert("Carrinho vazio!");
    if (!currentUser) return alert("Faça login para finalizar!");
    alert(`Pedido confirmado para: ${currentUser}`);
    cart = [];
    localStorage.removeItem('mam_cart');
    updateUI();
    closeModal('cart-modal');
  }
  
  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    currentUser = document.getElementById('username').value;
    localStorage.setItem('mam_user', currentUser);
    updateUI();
    closeModal('login-modal');
  });
  
  function logout() {
    currentUser = null;
    localStorage.removeItem('mam_user');
    updateUI();
  }
  
  function updateUI() {
    document.getElementById('cart-count').textContent = cart.length;
    const welcomeMsg = document.getElementById('welcome-msg');
    const authBtn = document.getElementById('auth-btn');
  
    if (currentUser) {
      welcomeMsg.textContent = `Operador: ${currentUser}`;
      authBtn.textContent = 'Sair';
      authBtn.onclick = logout;
    } else {
      welcomeMsg.textContent = '';
      authBtn.textContent = 'Login';
      authBtn.onclick = openModal;
    }
  }
  
  renderProducts();
  updateUI();
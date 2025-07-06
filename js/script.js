
// Toggle Menu Mobile
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
}

// Navigasi Section
function showSection(sectionId, event = null) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => link.classList.remove('active'));
  try {
    event.target.classList.add('active');
  } catch (e) {}
}

// Filter produk marketplace
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card, .card');
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Chatbot AI Agronom
const chatResponses = {
  'kapan waktu terbaik untuk menanam padi': 'Waktu terbaik menanam padi adalah pada musim hujan (Oktober-Maret)...',
  'bagaimana cara mengatasi hama wereng': 'Untuk mengatasi hama wereng: gunakan varietas tahan, tanam serempak...',
  'pupuk apa yang bagus untuk jagung': 'Gunakan NPK 15:15:15 saat tanam, dan Urea di minggu ke 3 dan 6.',
  'berapa harga jual tomat saat ini': 'Harga tomat di pasaran berkisar Rp 8.000–12.000/kg tergantung lokasi.',
  'default': 'Terima kasih atas pertanyaan Anda! Coba ajukan topik lebih spesifik.'
};

function sendMessage() {
  const userInput = document.getElementById('userInput');
  const message = userInput.value.trim();
  if (message === '') return;
  addMessage(message, 'user');
  setTimeout(() => {
    const response = generateResponse(message);
    addMessage(response, 'bot');
  }, 1000);
  userInput.value = '';
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendQuickMessage(message) {
  addMessage(message, 'user');
  setTimeout(() => {
    const response = generateResponse(message);
    addMessage(response, 'bot');
  }, 1000);
}

function addMessage(message, sender) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = sender === 'user'
    ? `<strong>Anda:</strong> ${message}`
    : `<strong>AI Agronom:</strong> ${message}`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateResponse(message) {
  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(chatResponses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }

  if (lowerMessage.includes('hama') || lowerMessage.includes('penyakit')) {
    return 'Untuk masalah hama dan penyakit tanaman, penting untuk melakukan identifikasi terlebih dahulu...';
  }

  if (lowerMessage.includes('pupuk') || lowerMessage.includes('nutrisi')) {
    return 'Jenis tanaman apa yang akan dipupuk? Saya bantu rekomendasinya.';
  }

  if (lowerMessage.includes('harga') || lowerMessage.includes('pasar')) {
    return 'Pantau juga harga di pasar lokal dan platform e-commerce.';
  }

  if (lowerMessage.includes('cuaca') || lowerMessage.includes('iklim')) {
    return 'Selalu cek prakiraan cuaca sebelum menanam.';
  }

  return chatResponses['default'];
}
  function showConsult(type) {
  document.querySelectorAll('.consult-box').forEach(box => box.classList.remove('active'));
  document.querySelectorAll('.consult-switcher button').forEach(btn => btn.classList.remove('active'));

  document.getElementById(`consult-${type}`).classList.add('active');
  document.querySelector(`.consult-switcher button[onclick="showConsult('${type}')"]`).classList.add('active');
}

// Logika metode pembayaran
function confirmPayment() {
  const selected = document.querySelector('.method.selected');
  if (selected) {
    const metode = selected.querySelector('span')?.innerText || "Metode tidak dikenal";
    alert("✅ Simulasi pembayaran berhasil via: " + metode);
  } else {
    alert("❗ Silakan pilih metode pembayaran terlebih dahulu.");
  }
}

// Highlight metode pembayaran yang dipilih
document.addEventListener('DOMContentLoaded', function () {
  const methods = document.querySelectorAll('.method');
  methods.forEach(method => {
    method.addEventListener('click', function () {
      methods.forEach(m => m.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  document.getElementById("productGrid").addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("cta-button")) {
      window.location.href = "payment.html";
    }
  });
});

function tambahProduk(event) {
  event.preventDefault();
  const nama = document.getElementById('namaProduk').value;
  const harga = document.getElementById('hargaProduk').value;
  const stok = document.getElementById('stokProduk').value;
  const deskripsi = document.getElementById('deskripsiProduk').value;
  const petani = document.getElementById('petaniProduk').value;
  const satuan = document.getElementById('satuanProduk').value;
  const gambarInput = document.getElementById('gambarProduk');
  const file = gambarInput.files[0];
  const imageURL = URL.createObjectURL(file);

  const produkBaru = `
    <div class="product-card">
      <div class="product-image" style="background-image: url('${imageURL}');"></div>
      <div class="product-info">
        <h3 class="product-title">${nama}</h3>
        <p class="product-price">Rp ${parseInt(harga).toLocaleString('id-ID')}/${satuan}</p>
        <p class="product-farmer">Petani: ${petani}</p>
        <p class="product-desc">${deskripsi}</p>
        <p class="product-stock"><strong>Stok:</strong> ${stok}</p>
        <button class="cta-button" onclick="showSection('payment')">Beli Sekarang</button>
      </div>
    </div>
  `;

  const grid = document.getElementById('productGrid');
  grid.insertAdjacentHTML('beforeend', produkBaru);
  event.target.reset();
}
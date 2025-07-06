// Navigation
    function showSection(sectionId, event = null) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Show selected section
        document.getElementById(sectionId).classList.add('active');
        
        // Update nav links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => link.classList.remove('active'));
        try {
            event.target.classList.add('active');
        } catch(e) {}
        
    }

    // Marketplace filter
    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Chat functionality
    const chatResponses = {
        'kapan waktu terbaik untuk menanam padi': 'Waktu terbaik menanam padi adalah pada musim hujan (Oktober-Maret) untuk sawah tadah hujan, atau bisa sepanjang tahun untuk sawah irigasi. Pastikan lahan sudah diolah dengan baik dan pilih varietas yang sesuai dengan kondisi lokasi Anda.',
        'bagaimana cara mengatasi hama wereng': 'Untuk mengatasi hama wereng: 1) Gunakan varietas tahan wereng, 2) Tanam serempak dengan tetangga, 3) Pantau populasi wereng secara rutin, 4) Gunakan pestisida ramah lingkungan jika diperlukan, 5) Jaga kebersihan saluran air dan pematang.',
        'pupuk apa yang bagus untuk jagung': 'Untuk jagung, gunakan pupuk dasar NPK dengan perbandingan 15:15:15 saat tanam. Tambahkan pupuk susulan Urea pada umur 3-4 minggu dan 6-7 minggu setelah tanam. Pupuk organik seperti kompos juga sangat baik untuk kesehatan tanah.',
        'berapa harga jual tomat saat ini': 'Harga tomat saat ini di pasaran berkisar Rp 8.000-12.000 per kg tergantung kualitas dan lokasi. Untuk mendapat harga terbaik, pastikan tomat dalam kondisi segar dan pilih waktu panen yang tepat.',
        'default': 'Terima kasih atas pertanyaan Anda! Sebagai AI Agronom, saya siap membantu dengan berbagai topik pertanian seperti jadwal tanam, pengendalian hama, pemupukan, dan analisis harga pasar. Bisakah Anda memberikan pertanyaan yang lebih spesifik?'
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
        
        if (sender === 'user') {
            messageDiv.innerHTML = `<strong>Anda:</strong> ${message}`;
        } else {
            messageDiv.innerHTML = `<strong>AI Agronom:</strong> ${message}`;
        }
        
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
            return 'Untuk masalah hama dan penyakit tanaman, penting untuk melakukan identifikasi yang tepat terlebih dahulu. Apakah Anda bisa mendeskripsikan gejala yang terlihat pada tanaman? Saya akan membantu memberikan solusi yang tepat.';
        }

        if (lowerMessage.includes('pupuk') || lowerMessage.includes('nutrisi')) {
            return 'Pemupukan yang tepat sangat penting untuk pertumbuhan tanaman optimal. Jenis tanaman apa yang akan dipupuk? Saya akan memberikan rekomendasi pupuk yang sesuai dengan kebutuhan tanaman Anda.';
        }

        if (lowerMessage.includes('harga') || lowerMessage.includes('pasar')) {
            return 'Harga komoditas pertanian sangat dipengaruhi oleh faktor musim, kualitas, dan lokasi pemasaran. Untuk informasi harga terkini, saya sarankan juga memantau harga di pasar lokal dan platform e-commerce.';
        }

        if (lowerMessage.includes('cuaca') || lowerMessage.includes('iklim')) {
            return 'Cuaca memang sangat berpengaruh terhadap keberhasilan pertanian. Pastikan untuk selalu memantau prakiraan cuaca dan menyesuaikan kegiatan pertanian. Apakah ada kegiatan pertanian spesifik yang ingin anda diskusikan?';
        }

        return chatResponses['default'];
    }
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
});

    function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('show');
}

<template>
    <div class="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10">
        Tentang Sistem Rekomendasi Kami
      </h1>
      <p class="text-lg md:text-xl text-gray-600 text-center mb-12">
        BuyBuddy hadir dengan teknologi rekomendasi canggih yang membantu Anda menemukan produk terbaik berdasarkan preferensi dan riwayat belanja Anda. Sistem kami menggabungkan beberapa algoritma modern untuk memberikan pengalaman belanja yang personal dan menyenangkan.
      </p>
  
      <div class="space-y-10">
        <!-- Card Collaborative Filtering -->
        <div class="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-purple-800 mb-4">Collaborative Filtering</h2>
          <p class="text-gray-700">
            Algoritma ini menganalisis perilaku dan kesamaan antar pengguna berdasarkan riwayat pembelian serta penilaian produk. Dengan cara ini, kami dapat merekomendasikan produk yang sesuai dengan selera pengguna lain yang memiliki preferensi serupa.
          </p>
        </div>
  
        <!-- Card Apriori Algorithm -->
        <div class="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-purple-800 mb-4">Apriori Algorithm</h2>
          <p class="text-gray-700">
            Algoritma Apriori digunakan untuk menemukan pola asosiasi antar produk dalam transaksi. Dengan mengidentifikasi kombinasi produk yang sering dibeli bersama, sistem kami membantu Anda menemukan produk pelengkap yang mungkin belum terpikirkan.
          </p>
        </div>
  
        <!-- Card Teknologi Lain -->
        <div class="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-purple-800 mb-4">Teknologi dan Kecerdasan Buatan</h2>
          <p class="text-gray-700">
            Kami juga mengintegrasikan berbagai teknologi terkini dan machine learning untuk meningkatkan akurasi rekomendasi. Data besar dan analisis mendalam memungkinkan sistem kami untuk terus belajar dan berkembang, memberikan saran produk yang semakin relevan seiring waktu.
          </p>
        </div>
      </div>
  
      <div class="mt-12 text-center">
        <a
          href="/explore"
          class="inline-block px-8 py-4 bg-purple-800 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition duration-300"
        >
          Mulai Jelajahi Produk
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutView",
  };
  </script>
  
  <style scoped>
  /* Tambahan jika diperlukan, misalnya animasi fade-in */
  </style>
  
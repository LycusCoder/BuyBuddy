<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
            <h2 class="text-center text-3xl font-extrabold text-gray-900">Daftar Akun BuyBuddy</h2>
            <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
                <!-- Username -->
                <div class="relative">
                    <Icon :icon="['fas', 'user']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="username" v-model="username" type="text" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.username }
                    ]" placeholder="Username" />
                </div>

                <!-- Nama Lengkap -->
                <div class="relative">
                    <Icon :icon="['fas', 'user']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="name" v-model="name" type="text" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.name }
                    ]" placeholder="Nama Lengkap" />
                </div>

                <!-- Email -->
                <div class="relative">
                    <Icon :icon="['fas', 'envelope']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="email" v-model="email" type="email" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.email }
                    ]" placeholder="Email" />
                </div>

                <!-- Password -->
                <div class="relative">
                    <Icon :icon="['fas', 'lock']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="password" v-model="password" type="password" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.password }
                    ]" placeholder="Password" />
                </div>

                <!-- Konfirmasi Password -->
                <div class="relative">
                    <Icon :icon="['fas', 'lock']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="confirmPassword" v-model="confirmPassword" type="password" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.confirmPassword }
                    ]" placeholder="Konfirmasi Password" />
                </div>

                <!-- Nomor HP -->
                <div class="relative">
                    <Icon :icon="['fas', 'phone']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="nomorhp" v-model="nomorhp" type="text" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.nomorhp }
                    ]" placeholder="Nomor HP" />
                </div>

                <!-- Alamat -->
                <div class="relative">
                    <Icon :icon="['fas', 'map-marker-alt']" class="absolute left-3 top-2.5 text-gray-500" />
                    <textarea id="alamat" v-model="alamat" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.alamat }
                    ]" placeholder="Alamat"></textarea>
                </div>

                <!-- Preferensi -->
                <div class="relative">
                    <select v-model="preferences" multiple required :class="[
                        'appearance-none rounded relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.preferences }
                    ]">
                        <option disabled value="">Pilih Preferensi</option>
                        <option value="snacks">Makanan Ringan</option>
                        <option value="fashion">Fashion</option>
                        <option value="cultural">Budaya</option>
                        <option value="electronics">Elektronik</option>
                        <option value="books">Buku</option>
                    </select>
                    <div v-if="formErrors.preferences" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <!-- Avatar URL -->
                <div class="relative">
                    <input id="avatar" v-model="avatar" type="text" :class="[
                        'appearance-none rounded relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': formErrors.avatar }
                    ]" placeholder="Avatar URL (opsional)" />
                    <div v-if="formErrors.avatar" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <button type="submit" :disabled="isLoading"
                    class="relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50">
                    <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span v-if="isLoading">Memproses...</span>
                    <span v-else>Daftar</span>
                </button>
            </form>
            <p class="mt-2 text-center text-sm text-gray-600">
                Sudah punya akun?
                <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
                    Masuk disini
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const isLoading = ref(false);
const formErrors = ref({});

const username = ref('');
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const nomorhp = ref('');
const alamat = ref('');
const avatar = ref('');
const preferences = ref([]);

const validateForm = () => {
    formErrors.value = {};

    if (!username.value) formErrors.value.username = true;
    if (!name.value) formErrors.value.name = true;
    if (!email.value) formErrors.value.email = true;
    if (!password.value) formErrors.value.password = true;
    if (!confirmPassword.value) formErrors.value.confirmPassword = true;
    if (!nomorhp.value) formErrors.value.nomorhp = true;
    if (!alamat.value) formErrors.value.alamat = true;
    if (preferences.value.length === 0) formErrors.value.preferences = true;

    return Object.keys(formErrors.value).length === 0;
};

const handleRegister = async () => {
    if (!validateForm()) {
        toast.error('Mohon lengkapi semua field wajib', {
            position: 'top-right',
            timeout: 3000,
        });
        return;
    }

    if (password.value !== confirmPassword.value) {
        toast.error('Password tidak cocok', {
            position: 'top-right',
            timeout: 3000,
        });
        formErrors.value.confirmPassword = true;
        return;
    }

    isLoading.value = true;

    try {
        const response = await axios.post('/api/register', {
            id: Math.floor(Math.random() * 1000), // ID unik sementara
            username: username.value,
            name: name.value,
            email: email.value,
            password: password.value,
            avatar: avatar.value || `/images/avatar${username.value}.png`,
            nomorhp: `+62 ${nomorhp.value}`, // Memastikan format nomor HP
            alamat: alamat.value,
            preferences: preferences.value,
            purchase_history: []
        });

        toast.success('Registrasi berhasil!', {
            position: 'top-right',
            timeout: 3000,
        });

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/dashboard');
    } catch (error) {
        toast.error(error.response?.data?.message || 'Registrasi gagal', {
            position: 'top-right',
            timeout: 3000,
        });
    } finally {
        isLoading.value = false;
    }
};
</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
            <h2 class="text-center text-3xl font-extrabold text-gray-900">Masuk ke BuyBuddy</h2>

            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <!-- Email Input -->
                <div class="relative">
                    <Icon :icon="['fas', 'envelope']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="email" v-model="email" type="email" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': errorMessage && !email }
                    ]" placeholder="Email" />
                </div>

                <!-- Password Input -->
                <div class="relative">
                    <Icon :icon="['fas', 'lock']" class="absolute left-3 top-2.5 text-gray-500" />
                    <input id="password" v-model="password" type="password" required :class="[
                        'appearance-none rounded relative block w-full px-10 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                        { 'border-red-500': errorMessage && !password }
                    ]" placeholder="Password" />
                </div>

                <button type="submit" :disabled="isLoading"
                    class="relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50">
                    <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span v-if="isLoading">Memproses...</span>
                    <span v-else>Masuk</span>
                </button>
            </form>

            <p class="mt-2 text-center text-sm text-gray-600">
                Belum punya akun?
                <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">
                    Daftar disini
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
const errorMessage = ref('');

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    if (!email.value || !password.value) {
        toast.error('Mohon lengkapi semua field', {
            position: 'top-right',
            timeout: 3000,
        });
        return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await axios.post('/api/login', {
            email: email.value,
            password: password.value
        });

        // Simpan data pengguna dan status login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Login berhasil!', {
            position: 'top-right',
            timeout: 2000,
        });

        router.push('/dashboard');
    } catch (error) {
        if (error.response?.status === 401) {
            toast.error('Email atau password salah', {
                position: 'top-right',
                timeout: 3000,
            });
        } else {
            toast.error('Terjadi kesalahan saat login', {
                position: 'top-right',
                timeout: 3000,
            });
        }
    } finally {
        isLoading.value = false;
    }
};
</script>
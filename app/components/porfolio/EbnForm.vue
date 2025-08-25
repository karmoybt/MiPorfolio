<template>
  <div>
    <h1>Importar Cartera</h1>
    <textarea v-model="jsonData" rows="20" cols="50" placeholder="Pega aquí el JSON de la cartera" />
    <button @click="importPortfolio">Importar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from 'nuxt/app';

const jsonData = ref('');

async function importPortfolio() {
  try {
    const parsedData = JSON.parse(jsonData.value);
    const { error } = await useFetch('/api/portfolio/ebn', {
      method: 'POST',
      body: parsedData,
    });

    if (error.value) {
      console.error('Error al importar la cartera:', error.value);
      alert('Error al importar la cartera');
    } else {
      alert('Cartera importada correctamente');
    }
  } catch (error) {
    console.error('Error al importar la cartera:', error);
    alert('Error al importar la cartera');
  }
}
</script>
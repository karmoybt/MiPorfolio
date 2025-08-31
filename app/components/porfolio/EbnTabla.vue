<template>
  <div>
    <h2 class="text-center text-2xl font-bold mb-4">Cartera de Inversiones</h2>
    <UTable
      :data="portfolios"
      class="flex-1"
      
    />
  </div>
</template>

<script setup>

// Definir la variable portfolios como una referencia reactiva
const portfolios = ref([]);

// Función para obtener los datos de la API
const fetchData = async () => {
  try {
    const res = await $fetch('/api/porfolio/ebn');
    portfolios.value = res || [];
    // Corregir la forma de mostrar portfolios.value en la consola
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Función para generar las columnas dinámicamente
const generateColumns = (data) => {
  if (data.length === 0) return [];
  const keys = Object.keys(data[0]);
  return keys.map((key) => ({
    name: key,
    key: key,
    id: key, // Añadir un id único para cada columna
  }));
};

// Inicializar las columnas dinámicamente
const dynamicColumns = ref([]);

const token  = useAuth().token
console.log( token.value);

onMounted(async () => {
  await fetchData();
  dynamicColumns.value = generateColumns(portfolios.value);

});
</script>
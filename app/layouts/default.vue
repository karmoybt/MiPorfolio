<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <div class="container">
        <h2>Mi página</h2>
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '~/components/layout/Sidebar.vue';
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 60px; /* Ancho colapsado del sidebar */
  background: #212121;
  color: #999;
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1000;
}

.sidebar.sidebar-hover {
  width: 250px; /* Ancho desplegado del sidebar */
}

.main-content {
  flex: 1;
  margin-left: 60px; /* Margen izquierdo igual al ancho colapsado del sidebar */
  transition: margin-left 0.3s ease;
}

.sidebar.sidebar-hover + .main-content {
  margin-left: 250px; /* Margen izquierdo igual al ancho desplegado del sidebar */
}

.container {
  padding: 20px;
}
</style>
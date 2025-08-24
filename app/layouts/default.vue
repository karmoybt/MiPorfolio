<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <slot />
    </div> 
  </div>
</template>

<script setup>
import Sidebar from '~/components/layout/Sidebar.vue';
</script>

<style scoped>
 .layout {
  display: flex;
} 

.sidebar {
  width: 54px;
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
  overflow: auto; /* Asegura que el contenido se desplaza dentro de .main-content */
  min-height: 100vh; /* Asegura que el contenido ocupe al menos la altura de la ventana */
}

.sidebar.sidebar-hover + .main-content {
  margin-left: 250px; /* Margen izquierdo igual al ancho desplegado del sidebar */
}

</style>
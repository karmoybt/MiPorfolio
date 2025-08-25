<template>
  <div
    class="sidebar"
    :class="{ 'sidebar-hover': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <nav class="main-menu">
      <ul>
        <li v-for="item in menuItems" :key="item.to">
          <NuxtLink :to="item.to">
            <Icon :name="item.icon" :size="24" :class="item.active ? 'text-primary-600' : 'text-neutral-600'" aria-hidden="true" />
            <span class="nav-text text-sm font-medium">{{ item.text }}</span>
          </NuxtLink>
        </li>
        <li class="logout">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import LogoutButton from '~/components/LogoutButton.vue';

export default {
  name: 'Sidebar',
  components: {
    LogoutButton
  },
  data() {
    return {
      isHovered: false,
      menuItems: [
        { to: '/', icon: 'material-symbols:space-dashboard-rounded', text: 'Home' },
        { to: '/dashboard', icon: 'mdi-light:format-align-left', text: 'Dashboard' },
        { to: '/dashboard/ebn', icon: 'mdi-light:format-align-left', text: 'Importar EBN' },

        { to: '/auth', icon: 'mdi-light:shield', text: 'Login' }
      ]
    };
  }
};
</script>

<style scoped>
.sidebar {
  width: 60px; /* Ancho colapsado */
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
  width: 250px; /* Ancho desplegado */
}

.toggle-button {
  background: none;
  border: none;
  color: white;
  font-size: 18px; /* Tamaño sutil */
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: -30px; /* Posicionado fuera del sidebar para ser sutil */
}

.main-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.main-menu li {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.main-menu li:hover {
  background-color: #000000;
  color: white;
}

.nav-icon {
  font-size: 24px;
  margin-right: 10px;
}

.nav-text {
  display: none;
}

.sidebar.sidebar-hover .nav-text {
  display: inline;
}

.logout {
  margin-top: auto;
}

.logout li {
  padding: 10px;
}

.logout li:hover {
  background-color: #000000;
  color: white;
}
</style>
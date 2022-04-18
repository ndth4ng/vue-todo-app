<template>
  <div>
    <div class="sidebar" :class="{ slide: show }">
      <div class="sidebar-header">
        <span class="sidebar-close" @click="handleClose()"
          ><i class="fa-solid fa-xmark"></i
        ></span>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-menu">
          <!-- Not auth -->
          <div v-if="!user" style="margin-top: 20px">
            <div class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/login">{{ $t("login") }}</router-link>
            </div>

            <div v-if="!user" class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/register" @click="handleClose()">{{
                $t("register")
              }}</router-link>
            </div>
          </div>

          <!-- Auth -->
          <div v-else style="margin-top: 20px">
            <div class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/">{{ $t("home") }}</router-link>
            </div>

            <div class="sidebar__menu-item" @click="handleClose()">
              <router-link to="/profile" @click="handleClose()">{{
                $t("profile")
              }}</router-link>
            </div>

            <button style="margin-top: 20px">
              {{ $t("logout") }}
            </button>
          </div>
        </div>

        <div class="sidebar-language">
          <p style="text-align: center; color: #fff; margin-bottom: 10px">
            {{ $t("change-language") }}
          </p>
          <button :disabled="lang === 'en'" @click="handleChangeLanguage('en')">
            {{ $t("english") }}
          </button>
          <button
            :disabled="lang === 'vi'"
            @click="handleChangeLanguage('vi')"
            style="margin-top: 5px"
          >
            {{ $t("vietnamese") }}
          </button>
        </div>
      </div>
    </div>
    <div @click="handleClose()" class="overlay" :class="{ slide: show }"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["user"]),
  },
  props: ["show", "lang"],
  methods: {
    handleClose: function () {
      this.$emit("onClose");
    },
    handleChangeLanguage: function (lang) {
      this.$emit("onChangeLanguage", lang);
    },
  },
};
</script>
<style scoped>
.sidebar {
  height: 100%;
  position: fixed;
  inset: 0;
  width: 300px;
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  transform: translateX(-100%);
  transition: 0.3s ease;
  border-radius: 0 10px 10px 0;
}

.sidebar-header {
  width: 100%;
  padding: 80px 40px 0;
  display: flex;
  justify-content: flex-end;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
}

.sidebar__menu-item {
  margin-top: 20px;
  text-align: center;
}

.sidebar__menu-item > a {
  text-decoration: none;
  font-size: 20px;
  color: #fff;
}

.sidebar-language {
  flex: 1;
}

.sidebar-close {
  font-size: 2rem;
  color: #fff;
}

.sidebar-language {
  display: flex;
  flex-direction: column;
}

.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.sidebar.slide {
  transform: translateX(0%);
}

.overlay.slide {
  display: block;
}

button {
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #1a936f;
  letter-spacing: 1px;
  border: none;
  color: #fff;
}

button:disabled {
  background-color: #1a936f83;
  color: rgba(255, 255, 255, 0.534);
}
</style>
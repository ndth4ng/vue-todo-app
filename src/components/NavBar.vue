<template>
  <div>
    <div class="navbar-container">
      <!-- Navbar -->
      <nav>
        <div>
          <router-link to="/"> {{ $t("home") }}</router-link>
          <router-link to="/profile"> {{ $t("profile") }}</router-link>
        </div>
        <div>
          <button v-if="lang === 'vi'" @click="changeLanguageTo('en')">
            {{ $t("english") }}
          </button>
          <button v-else @click="changeLanguageTo('vi')">
            {{ $t("vietnamese") }}
          </button>
        </div>
        <div v-if="!user">
          <router-link to="/login">{{ $t("login") }}</router-link>
          <router-link to="/register">{{ $t("register") }}</router-link>
        </div>
        <div v-else>
          <button :disabled="loading" @click="onLogout()">
            {{ $t("logout") }}
          </button>
        </div>
      </nav>
      <!-- Sidebar -->
      <span class="btn-sidebar" @click="showSidebar = true">
        <i class="fa-solid fa-bars"></i>
      </span>

      <sizebar
        :lang="lang"
        :show="showSidebar"
        @onClose="showSidebar = false"
        @onChangeLanguage="changeLanguageTo($event)"
      ></sizebar>
    </div>
  </div>
</template>
<script>
import { getLocalLang, setLocalLang } from "@/utils/localLang";
import { mapActions, mapMutations, mapState } from "vuex";
import { localize } from "vee-validate";
import SizeBar from "./SideBar.vue";

export default {
  data() {
    return {
      loading: false,
      lang: getLocalLang(),

      showSidebar: false,
    };
  },
  components: {
    sizebar: SizeBar,
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapMutations("notification", ["triggerToast"]),
    onLogout: async function () {
      this.loading = true;
      const response = await this.logout();
      if (response.success) {
        this.triggerToast({
          status: "success",
          message: this.$t("logout-success"),
        });
        this.loading = false;
        this.$router.push({ path: "/login" });
      } else {
        this.triggerToast({
          status: "danger",
          message: response.error,
        });
        this.loading = false;
      }
    },
    changeLanguageTo: function (lang) {
      this.lang = lang;
      // Local storage
      setLocalLang(lang);
      // i18n
      this.$i18n.locale = lang;
      // vee-validate locale
      localize(lang);
    },
  },
};
</script>
<style scoped>
.navbar-container {
  height: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 0 40px;
}

nav {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: #eee;
  text-decoration: none;
  margin-right: 12px;
}

nav a:last-child {
  margin-right: 0;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #1a936f;
  letter-spacing: 1px;
  border: none;
  color: #fff;
  cursor: pointer;
}

button:disabled {
  cursor: default;
  background-color: #1a936f75;
  color: rgba(255, 255, 255, 0.5);
}

.btn-sidebar {
  display: none;
  color: #fff;
  font-size: 1.5rem;
}

@media only screen and (max-width: 576px) {
  .navbar-container {
    padding: 0 20px;
    justify-content: end;
  }
  nav {
    display: none;
  }
  .btn-sidebar {
    display: block;
  }
}
</style>

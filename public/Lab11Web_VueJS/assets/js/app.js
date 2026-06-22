const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = '';

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/artikel', component: Artikel, meta: { requiresAuth: true } },
  { path: '/about', component: About },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const app = createApp({
  data() {
    return {
      loggedIn: localStorage.getItem('isLoggedIn') === 'true'
    };
  },

  methods: {
    logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      this.loggedIn = false;
      router.push('/login');
    },

    updateLoginStatus() {
      this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  }
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

router.afterEach(() => {
  setTimeout(() => {
    if (app._instance) {
      app._instance.proxy.updateLoginStatus();
    }
  }, 0);
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      alert('Sesi habis, silakan login ulang.');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

app.use(router);
app.mount('#app');
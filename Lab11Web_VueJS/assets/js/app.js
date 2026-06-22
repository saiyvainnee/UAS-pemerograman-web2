const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = 'http://localhost:8080';

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

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
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

const app = createApp({
  computed: {
    isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
});

app.use(router);
app.mount('#app');
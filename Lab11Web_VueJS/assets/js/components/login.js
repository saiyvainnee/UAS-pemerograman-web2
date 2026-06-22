const Login = {
  template: `
  <div class="auth-page">
    <div class="auth-left">
      <h2>Portal Admin Artikel</h2>
      <p>Kelola artikel, data API, dan dashboard dalam satu aplikasi SPA modern.</p>
      <div class="auth-badge">CodeIgniter 4 + VueJS 3</div>
    </div>

    <div class="auth-card">
      <h2>Masuk</h2>
      <p class="auth-subtitle">Gunakan akun administrator</p>

      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email admin" required>
        <input type="password" v-model="password" placeholder="Password" required>

        <button type="submit" class="btn-login">Login</button>
      </form>

      <div class="demo-box">
        <span>Demo akun</span>
        <b>admin@email.com</b>
        <b>admin123</b>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.email === 'admin@email.com' && this.password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', 'uas-web2-token');
        this.$router.push('/dashboard');
      } else {
        alert('Email atau password salah');
      }
    }
  }
};
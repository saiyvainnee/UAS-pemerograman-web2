const Dashboard = {
  template: `
  <div class="dashboard-card">
    <h2>📊 Dashboard Administrator</h2>
    <p class="dashboard-subtitle">Ringkasan data artikel dari REST API CodeIgniter 4.</p>

    <div class="stats-container">
      <div class="stat-box">
        <h3>Total Artikel</h3>
        <p>{{ totalArtikel }}</p>
      </div>

      <div class="stat-box">
        <h3>Publish</h3>
        <p>{{ totalPublish }}</p>
      </div>

      <div class="stat-box">
        <h3>Draft</h3>
        <p>{{ totalDraft }}</p>
      </div>

      <div class="stat-box">
        <h3>Status API</h3>
        <p>{{ apiStatus }}</p>
      </div>
    </div>

    <div class="welcome-box">
      <h3>Fitur Administrator</h3>
      <p>
        Admin dapat menambah, mengubah, menghapus, dan melihat data artikel
        melalui frontend VueJS yang terhubung ke backend API CodeIgniter 4.
      </p>
    </div>
  </div>
  `,

  data() {
    return {
      artikel: [],
      apiStatus: 'Checking...'
    };
  },

  mounted() {
    this.loadData();
  },

  computed: {
    totalArtikel() {
      return this.artikel.length;
    },
    totalPublish() {
      return this.artikel.filter(item => Number(item.status) === 1).length;
    },
    totalDraft() {
      return this.artikel.filter(item => Number(item.status) === 0).length;
    }
  },

  methods: {
    loadData() {
      axios.get(apiUrl + '/post')
        .then(response => {
          this.artikel = response.data.artikel;
          this.apiStatus = 'Online';
        })
        .catch(error => {
          console.log(error);
          this.apiStatus = 'Error';
        });
    }
  }
};
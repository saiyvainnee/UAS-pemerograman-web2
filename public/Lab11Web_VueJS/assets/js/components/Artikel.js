const Artikel = {
  template: `
    <div>
      <div class="article-header">
        <div>
          <h2>📝 Manajemen Data Artikel</h2>
          <p>Kelola data artikel melalui REST API CodeIgniter 4.</p>
        </div>

        <button @click="tambah">+ Tambah Data</button>
      </div>

      <div class="search-box">
        <input
          type="text"
          v-model="search"
          placeholder="🔍 Cari artikel berdasarkan judul..."
        >
      </div>

      <div class="modal" v-if="showForm">
        <div class="modal-content">
          <span class="close" @click="showForm = false">×</span>

          <h3>{{ formTitle }}</h3>

          <form @submit.prevent="saveData">
            <label>Judul Artikel</label>
            <input
              type="text"
              v-model="formData.judul"
              placeholder="Masukkan judul artikel"
              required
            >

            <label>Isi Artikel</label>
            <textarea
              v-model="formData.isi"
              rows="6"
              placeholder="Masukkan isi artikel"
              required
            ></textarea>

            <label>Status</label>
            <select v-model="formData.status">
              <option value="0">Draft</option>
              <option value="1">Publish</option>
            </select>

            <br><br>

            <button type="submit">Simpan</button>
            <button type="button" @click="showForm = false">Batal</button>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in filteredArtikel" :key="row.id">
            <td>{{ row.id }}</td>

            <td>
              <b>{{ row.judul }}</b>
              <p>{{ row.isi ? row.isi.substring(0, 80) : '' }}</p>
            </td>

            <td>
              <span :class="Number(row.status) === 1 ? 'status-publish' : 'status-draft'">
                {{ statusText(row.status) }}
              </span>
            </td>

            <td>
              <button class="btn-edit" @click="edit(row)">Edit</button>
              <button class="btn-delete" @click="hapus(index, row.id)">Hapus</button>
            </td>
          </tr>

          <tr v-if="filteredArtikel.length === 0">
            <td colspan="4" style="text-align:center;">
              Data artikel tidak ditemukan.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,

  data() {
    return {
      artikel: [],
      search: '',
      formData: {
        id: null,
        judul: '',
        isi: '',
        status: 0
      },
      showForm: false,
      formTitle: 'Tambah Data'
    };
  },

  computed: {
    filteredArtikel() {
      return this.artikel.filter(item =>
        item.judul.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      axios.get(apiUrl + '/post')
        .then(response => {
          this.artikel = response.data.artikel;
        })
        .catch(error => {
          console.log(error);
          alert('Gagal mengambil data artikel');
        });
    },

    tambah() {
      this.formTitle = 'Tambah Data';
      this.showForm = true;
      this.formData = {
        id: null,
        judul: '',
        isi: '',
        status: 0
      };
    },

    edit(row) {
      this.formTitle = 'Ubah Data';
      this.showForm = true;
      this.formData = {
        id: row.id,
        judul: row.judul,
        isi: row.isi,
        status: Number(row.status)
      };
    },

    saveData() {
      const data = new URLSearchParams();
      data.append('id', this.formData.id);
      data.append('judul', this.formData.judul);
      data.append('isi', this.formData.isi);
      data.append('status', this.formData.status);
      data.append('slug', this.formData.judul.toLowerCase().replaceAll(' ', '-'));

      if (this.formData.id) {
        axios.put(apiUrl + '/post/' + this.formData.id, data)
          .then(() => {
            this.loadData();
            this.resetForm();
          })
          .catch(error => {
            console.log(error);
            alert('Gagal mengubah data');
          });
      } else {
        axios.post(apiUrl + '/post', data)
          .then(() => {
            this.loadData();
            this.resetForm();
          })
          .catch(error => {
            console.log(error);
            alert('Gagal menambah data');
          });
      }
    },

    hapus(index, id) {
      if (confirm('Yakin ingin menghapus artikel ini?')) {
        axios.delete(apiUrl + '/post/' + id)
          .then(() => {
            this.artikel.splice(index, 1);
          })
          .catch(error => {
            console.log(error);
            alert('Gagal menghapus data');
          });
      }
    },

    resetForm() {
      this.formData = {
        id: null,
        judul: '',
        isi: '',
        status: 0
      };
      this.showForm = false;
    },

    statusText(status) {
      return Number(status) === 1 ? 'Publish' : 'Draft';
    }
  }
};
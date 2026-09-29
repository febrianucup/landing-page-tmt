/**
 * Default content for the landing page.
 * Every section of the page is stored here and edited from /dashboard.
 * `image: ''` means "use the bundled default asset".
 */

export const ICON_CHOICES = [
  'school',
  'dashboard',
  'insights',
  'monitoring',
  'timelapse',
  'bolt',
  'devices',
  'groups',
  'person',
  'supervisor_account',
  'admin_panel_settings',
  'badge',
  'calendar_month',
  'assignment',
  'task_alt',
  'fact_check',
  'description',
  'edit_document',
  'folder_open',
  'cloud_done',
  'shield_person',
  'verified',
  'workspace_premium',
  'savings',
  'payments',
  'query_stats',
  'timeline',
  'table_chart',
  'rocket_launch',
  'auto_awesome',
  'star',
  'support_agent',
  'call',
  'mail',
  'location_on',
  'chat',
  'link',
  'public',
  'check',
  'check_circle',
  'close',
  'arrow_forward',
  'play_circle',
]

export const TONE_CHOICES = [
  { value: 'primary', label: 'Biru' },
  { value: 'success', label: 'Hijau' },
  { value: 'accent', label: 'Violet' },
  { value: 'warning', label: 'Amber' },
  { value: 'danger', label: 'Merah' },
]

export const DEFAULT_CONTENT = {
  version: 1,
  updatedAt: null,

  brand: {
    name: 'TMT Administration',
    short: 'TMT',
    icon: 'school',
    tagline:
      'Menyederhanakan administrasi sekolah untuk Guru, Tata Usaha, dan Kepala Sekolah dalam satu platform terintegrasi.',
  },

  navbar: {
    items: [
      { id: 'nav_home', label: 'Home', href: '#home' },
      { id: 'nav_fitur', label: 'Fitur', href: '#fitur' },
      { id: 'nav_peran', label: 'Peran', href: '#peran' },
      { id: 'nav_kontak', label: 'Kontak', href: '#kontak' },
    ],
    cta: { label: 'Hubungi Kami', href: '#kontak', icon: 'call' },
  },

  hero: {
    eyebrow: 'Teacher Management Tool',
    title: 'Transformasi Digital untuk',
    highlight: 'Administrasi Sekolah',
    subtitle:
      'TMT hadir untuk menyederhanakan birokrasi, mengotomatisasi penilaian, dan memberikan visibilitas penuh bagi Kepala Sekolah. Bebaskan guru dari tumpukan kertas.',
    image: '',
    showImage: true,
    primaryCta: { label: 'Mulai Gratis', href: '#kontak', icon: 'arrow_forward' },
    secondaryCta: { label: 'Jadwalkan Demo', href: '#kontak', icon: 'play_circle' },
    showSecondaryCta: true,
    trust: 'Dipercaya oleh 500+ sekolah se-Indonesia',
    showTrust: true,
    highlights: [
      'Satu platform untuk Guru, TU, dan Kepala Sekolah',
      'Otomatisasi laporan harian dan bulanan',
      'Dashboard real-time tanpa tumpukan kertas',
    ],
  },

  stats: {
    items: [
      {
        id: 'stat_time',
        icon: 'timelapse',
        tone: 'primary',
        value: '50%',
        label: 'Penghematan waktu admin & birokrasi per minggu.',
      },
      {
        id: 'stat_paper',
        icon: 'devices',
        tone: 'success',
        value: '100%',
        label: 'Paperless. Bebas tumpukan kertas untuk pelaporan harian dan bulanan.',
      },
      {
        id: 'stat_roles',
        icon: 'groups',
        tone: 'accent',
        value: '3 Role',
        label: 'Terintegrasi sempurna untuk Guru, TU/Admin, dan Kepala Sekolah.',
      },
    ],
  },

  problems: {
    eyebrow: 'Perbandingan',
    title: 'Mengapa Beralih ke TMT?',
    description:
      'Sistem tradisional membebani pendidik. Kami merancang ulang cara kerja sekolah agar fokus kembali ke pendidikan.',
    oldTitle: 'Cara Lama',
    newTitle: 'Solusi TMT',
    items: [
      {
        id: 'prob_report',
        oldText:
          'Pelaporan harian tercecer dalam berbagai form kertas dan excel yang tidak sinkron.',
        newText:
          'Input satu pintu. Data tersimpan rapi di cloud dan otomatis terkompilasi untuk laporan bulanan.',
      },
      {
        id: 'prob_monitor',
        oldText:
          'Kepala sekolah sulit memantau kinerja harian guru secara real-time. Menunggu laporan akhir bulan.',
        newText:
          'Dashboard real-time untuk Kepsek. Pantau progres, tingkat kehadiran, dan capaian target seketika.',
      },
      {
        id: 'prob_skp',
        oldText:
          'Sistem penilaian kinerja (SKP) rumit dan manual, rawan kesalahan perhitungan administratif.',
        newText:
          'Otomatisasi kalkulasi nilai berdasarkan indikator kinerja yang disesuaikan dengan standar regulasi.',
      },
    ],
  },

  roles: {
    eyebrow: 'Peran Pengguna',
    title: 'Dibangun Spesifik untuk Setiap Peran',
    description:
      'TMT menyediakan alat yang tepat untuk orang yang tepat. Akses yang disesuaikan menjamin keamanan dan efisiensi alur kerja.',
    items: [
      {
        id: 'role_teacher',
        icon: 'person',
        tone: 'primary',
        title: 'Guru',
        subtitle: 'Pengguna Harian',
        features: [
          'Input logbook & aktivitas harian dengan cepat via mobile/desktop.',
          'Akses langsung ke arsip RPP dan modul ajar pribadi.',
          'Presensi siswa secara digital tanpa kertas.',
        ],
      },
      {
        id: 'role_admin',
        icon: 'admin_panel_settings',
        tone: 'success',
        title: 'Admin / Tata Usaha',
        subtitle: 'Operasional',
        features: [
          'Kelola master data guru, jadwal pelajaran, data siswa, dan struktur organisasi.',
          'Verifikasi dokumen administratif secara digital tanpa stempel manual.',
          'Buat laporan rekapitulasi kehadiran dengan satu klik.',
        ],
      },
      {
        id: 'role_head',
        icon: 'insights',
        tone: 'warning',
        title: 'Kepala Sekolah',
        subtitle: 'Pengawasan Strategis',
        features: [
          'Dashboard analitik komprehensif untuk performa seluruh staf.',
          'Sistem approval digital yang cepat dan terdokumentasi rapi.',
          'Identifikasi area peningkatan kinerja sekolah berbasis data.',
        ],
      },
    ],
  },

  cta: {
    title: 'Siap Meningkatkan Mutu Administrasi Sekolah Anda?',
    description:
      'Bergabunglah dengan ratusan sekolah lain yang telah beralih ke TMT. Proses implementasi cepat, panduan lengkap, dan dukungan teknis 24/7.',
    buttonLabel: 'Jadwalkan Konsultasi',
    buttonHref: '#kontak',
    image: '',
  },

  contact: {
    eyebrow: 'Kontak',
    title: 'Hubungi Tim Kami',
    description:
      'Punya pertanyaan atau ingin demo langsung? Tim kami siap membantu proses implementasi di sekolah Anda.',
    channels: [
      {
        id: 'ch_email',
        icon: 'mail',
        tone: 'primary',
        title: 'Email',
        description: 'Hubungi kami via email',
        value: 'tmtpengajar@gmail.com',
        link: 'https://mail.google.com/mail/?view=cm&fs=1&to=tmtpengajar@gmail.com',
      },
      {
        id: 'ch_phone',
        icon: 'call',
        tone: 'success',
        title: 'Telepon / WhatsApp',
        description: 'Berbicara langsung dengan tim kami',
        value: '+62 813-4767-575',
        link: 'https://wa.me/6283134767575',
      },
      {
        id: 'ch_office',
        icon: 'location_on',
        tone: 'accent',
        title: 'Kunjungi Kami',
        description: 'Alamat kantor',
        value: 'Situbondo, Jawa Timur, Indonesia',
        link: 'https://maps.app.goo.gl/74Qq7L9Qd9qkUwyA6',
      },
    ],
    form: {
      title: 'Kirim Pesan',
      description: 'Isi formulir di samping, kami membalas dalam 1x24 jam kerja.',
      submitLabel: 'Kirim Pesan',
      successMessage: 'Pesan terkirim! Tim kami akan segera menghubungi Anda.',
      errorMessage: 'Gagal mengirim pesan. Silakan coba lagi.',
      notifyByEmail: false,
      serviceId: 'service_pd25j0q',
      templateId: 'template_qc3gy1a',
      publicKey: 'WanS8Y3cM6lqvDKb8',
    },
  },

  footer: {
    description:
      'Menyederhanakan administrasi sekolah untuk Guru, Tata Usaha, dan Kepala Sekolah dalam satu platform terintegrasi.',
    columns: [
      {
        id: 'col_produk',
        title: 'Produk',
        links: [
          { id: 'fl_fitur', label: 'Fitur', href: '#fitur' },
          { id: 'fl_peran', label: 'Peran', href: '#peran' },
          { id: 'fl_kontak', label: 'Kontak', href: '#kontak' },
        ],
      },
      {
        id: 'col_perusahaan',
        title: 'Perusahaan',
        links: [
          { id: 'fl_tentang', label: 'Tentang Kami', href: '#' },
          { id: 'fl_karir', label: 'Karier', href: '#' },
        ],
      },
      {
        id: 'col_bantuan',
        title: 'Bantuan',
        links: [
          { id: 'fl_pusat', label: 'Pusat Bantuan', href: '#' },
          { id: 'fl_panduan', label: 'Panduan Pengguna', href: '#' },
        ],
      },
    ],
    copyright: '© 2026 TMT Administration. Dedicated to educational excellence.',
    legal: [
      { id: 'lg_terms', label: 'Syarat Layanan', href: '#' },
      { id: 'lg_privacy', label: 'Privasi', href: '#' },
    ],
  },

  submissions: [],
}

/** Sections exposed in the dashboard sidebar, in display order. */
export const SECTION_ROUTES = [
  { to: '/dashboard/hero', label: 'Hero', icon: 'rocket_launch', group: 'Konten' },
  { to: '/dashboard/stats', label: 'Statistik', icon: 'query_stats', group: 'Konten' },
  { to: '/dashboard/problems', label: 'Masalah vs Solusi', icon: 'fact_check', group: 'Konten' },
  { to: '/dashboard/roles', label: 'Peran', icon: 'groups', group: 'Konten' },
  { to: '/dashboard/cta', label: 'Ajakan (CTA)', icon: 'campaign', group: 'Konten' },
  { to: '/dashboard/contact', label: 'Kontak & Formulir', icon: 'mail', group: 'Konten' },
  { to: '/dashboard/navigation', label: 'Navigasi & Footer', icon: 'menu', group: 'Struktur' },
  { to: '/dashboard/analytics', label: 'Statistik Web', icon: 'monitoring', group: 'Pantauan' },
  { to: '/dashboard/submissions', label: 'Pesan Masuk', icon: 'inbox', group: 'Struktur' },
  { to: '/dashboard/settings', label: 'Pengaturan', icon: 'tune', group: 'Struktur' },
]

import React from 'react';

export default function Roles() {
  const rolesData = [
    {
      title: 'Guru',
    //   subtitle: 'The Core',
      bgIconColor: 'bg-indigo-600 text-indigo-200',
      textColor: 'text-primary hover:text-primary-container',
      checkColor: 'text-indigo-600',
      features: [
        'Input Logbook & Aktivitas Harian dengan cepat via mobile/desktop.',
        'Akses langsung ke arsip RPP dan modul ajar pribadi.',
        'Prensensi siswa secara digital tanpa kertas.'
      ]
    },
    {
      title: 'Admin / Tata Usaha',
    //   subtitle: 'Administrasi',
      bgIconColor: 'bg-emerald-500 text-slate-200',
      textColor: 'text-emerald-500 hover:opacity-80',
      checkColor: 'text-emerald-500',
      features: [
        'Kelola master data guru, jadwal pelajaran, data siswa, dan struktur organisasi.',
        // 'Verifikasi dokumen administratif secara digital (tanpa stempel manual).',
        // 'Generate laporan rekapitulasi kehadiran dengan satu klik.'

      ]
    },
    {
      title: 'Kepala Sekolah',
    //   subtitle: 'Strategic Oversight',
      bgIconColor: 'bg-amber-700 text-white',
      textColor: 'text-amber-700 hover:opacity-80',
      checkColor: 'text-amber-700',
      features: [
        'Dashboard analitik komprehensif untuk performa seluruh staf.',
        'Sistem approval digital yang cepat dan terdokumentasi rapi.',
        'Identifikasi area peningkatan kinerja sekolah berbasis data.'
      ]
    }
  ];

  return (
    <section id="peran" className="w-full bg-surface-container-lowest py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-[32px] lg:text-[36px] font-bold mb-4 text-on-surface">Dibangun Spesifik untuk Setiap Peran</h2>
          <p className="text-body-lg text-on-surface-variant max-w-3xl">TMT menyediakan alat yang tepat untuk orang yang tepat. Akses yang disesuaikan menjamin keamanan dan efisiensi alur kerja.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rolesData.map((role, idx) => (
            <div key={idx} className="flex flex-col h-full bg-surface-container-low rounded-xl p-8 hover:bg-surface-container transition-colors shadow-sm hover:shadow-md">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm ${role.bgIconColor}`}>
                <span className="material-symbols-outlined text-[32px]">school</span>
              </div>
              <h3 className="text-[24px] font-bold text-on-surface mb-2">{role.title}</h3>
              <p className="text-on-surface-variant text-label-sm font-semibold uppercase tracking-wider mb-6">{role.subtitle}</p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {role.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-body-md text-on-surface">
                    <span className={`material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5 ${role.checkColor}`}>check_circle</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* <a className={`font-semibold inline-flex items-center gap-1 transition-colors mt-auto ${role.textColor}`} href="#">
                Pelajari Fitur {role.title} <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
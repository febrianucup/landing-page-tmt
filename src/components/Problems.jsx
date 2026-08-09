import React from 'react';

export default function Problems() {
  const comparisons = [
    { oldText: 'Pelaporan harian tercecer dalam berbagai form kertas dan excel yang tidak sinkron.', newText: 'Input satu pintu. Data tersimpan rapi di cloud dan otomatis terkompilasi untuk laporan bulanan.' },
    { oldText: 'Kepala sekolah sulit memantau kinerja harian guru secara real-time. Menunggu laporan akhir bulan.', newText: 'Dashboard Real-time untuk Kepsek. Pantau progress, tingkat kehadiran, dan capaian target seketika.', },
    { oldText: 'Sistem penilaian kinerja (SKP) rumit dan manual, rawan kesalahan perhitungan administratif.', newText: 'Otomatisasi kalkulasi nilai berdasarkan indikator kinerja yang disesuaikan dengan standar regulasi.' },
  ];

  return (
    <section id="fitur" className="w-full bg-surface py-12 lg:py-24">
      <div className="px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-on-surface mb-4 text-[32px] lg:text-[36px] font-bold">Mengapa Beralih ke TMT?</h2>
          <p className="text-body-lg text-on-surface-variant">Sistem tradisional membebani pendidik. Kami merancang ulang cara kerja sekolah agar fokus kembali ke pendidikan.</p>
        </div>
      
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
          {comparisons.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-4 group">
              <div className="bg-error-container/30 flex flex-col gap-3 h-40 rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md overflow-hidden">
                <div className="text-error flex items-center gap-2">
                  <span className="material-symbols-outlined font-bold">close</span>
                  <span className="text-[16px] font-semibold">Cara Lama</span>
                </div>
                <p className="text-on-surface-variant text-body-md">{item.oldText}</p>
              </div>

              <div className="bg-secondary-container/20 relative h-40 flex flex-grow flex-col gap-3 overflow-hidden rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="text-secondary relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined font-bold">check</span>
                  <span className="text-[16px] font-semibold">Solusi TMT</span>
                </div>
                <p className="text-on-surface relative z-10 font-medium">{item.newText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
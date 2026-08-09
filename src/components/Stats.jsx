import React from 'react';

export default function Stats() {
  const statsData = [
    { icon: 'timelapse', color: 'text-primary bg-primary/10', value: '50%', desc: 'Penghematan waktu admin & birokrasi per minggu.' },
    { icon: 'devices', color: 'text-secondary bg-secondary/10', value: '100%', desc: 'Paperless. Bebas tumpukan kertas untuk pelaporan Harian/Bulanan.' },
    { icon: 'groups', color: 'text-tertiary bg-tertiary/10', value: '3 Role', desc: 'Terintegrasi sempurna untuk Guru, TU/Admin, dan Kepala Sekolah.' },
  ];

  return (
    <section className="w-full bg-surface-container-lowest py-8 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex items-start gap-4 p-6 bg-surface-container-low rounded-xl transition-transform hover:-translate-y-1 duration-300">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              </div>
              <div>
                <h3 className="text-[32px] font-bold text-on-surface mb-1">{stat.value}</h3>
                <p className="text-body-md text-on-surface-variant">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';

export default function CTA() {
  return (
    <section className="w-full relative py-28 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB42Rn2eMpW2b5DKF502C7MbO39u8ZvrLtcdUj1KFfEETDL2sgcDubqvCtX6tVqjpBTYBk4XhIDwRN6QLTKhoZgjLEVzBToC0ia7UZbDSRFpy5KQOG9TZmrRm6XB8iL5GV65iC09RUM-ee336IbGwh-AVvtbhUf1hN7LLk_KjiSnGXfR-bmhcVN-2T-__F4P-J1AxlbURTpi-GB6Gm36waAVPBQe-1Rue1SZ3N5vBFhM5Vpi-sSOwDO')` }}
      ></div>
      <div className="absolute inset-0 bg-on-primary-fixed/90 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-[32px] lg:text-[40px] leading-[40px] lg:leading-[48px] font-bold text-white mb-6">
          Siap Meningkatkan Mutu Administrasi Sekolah Anda?
        </h2>
        <p className="text-primary-fixed-dim text-[18px] mb-10 max-w-2xl">
          Bergabunglah dengan ratusan sekolah lain yang telah beralih ke TMT. Proses implementasi cepat, panduan lengkap, dan dukungan teknis 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#kontak" className="bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold text-[18px] hover:bg-primary-container transition-colors shadow-lg text-center">
            Jadwalkan Konsultasi
          </a>
          {/* <a href="#kontak" className="bg-transparent border border-primary-fixed text-primary-fixed px-8 py-4 rounded-lg font-semibold text-[18px] hover:bg-primary-fixed/10 transition-colors text-center">
            Hubungi Sales
          </a> */}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import mockup from '../assets/mockup.png';

export default function Hero() {
  return (
    <section className="w-full bg-surface pt-10 pb-14 lg:pt-16 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 z-10">
          <h1 className="text-[32px] leading-[40px] lg:text-[48px] lg:leading-[56px] font-bold text-on-surface">
            Transformasi Digital untuk{' '}
            <span className="text-primary relative inline-block">
              Administrasi Sekolah
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-fixed-dim" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4"></path>
              </svg>
            </span>
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-xl">
            TMT (Teacher Management Tool) hadir untuk menyederhanakan birokrasi, mengotomatisasi penilaian, dan memberikan visibilitas penuh bagi Kepala Sekolah. Bebaskan guru dari tumpukan kertas.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2">
              Mulai Gratis
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button className="bg-surface-container-highest text-on-surface px-8 py-3 rounded-lg font-semibold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              Lihat Demo
            </button>
          </div> */}

          {/* <div className="mt-4 flex items-center gap-3 text-label-sm text-on-surface-variant">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-surface object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt9QRxT_NS4-JCRdQpr2wiLWk8AbaRosoPJGC88Rwg6zCIxJEaTHfadf4ZDz6gsZYw6a1VTtUBjytLoitwe9TT4G0vqUUbew066aL4ol_Ix2_HxO60tuk2MFmCpooxO5RUTHTZVqn-JLMO9W-kdUPHjXeVJyxCEoXV1oYW1ntzGD9h7vjBAo_J1X6K6tzWJdNgtmtRgE_UPSfSLUyGK8WpwQFTb8FWNQQI0HrlEpbyi68SZxFD9ytR" alt="User 1" />
              <img className="w-8 h-8 rounded-full border-2 border-surface object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqTGq148j4i3oFFeWfDGT0_j2ZbiUNjmkf6TN-GvzJ7-I0qwgKb4jkZFIT6Fx7vUQmdLfA4tKlfCFMLblLQGBBwGRs7rmgH-PvcT_sB98gwLRwvtY9sMkVM8FDX2tryX2xAbCbHpAYg_BQfPpNZxnajmSo4U6Eaocg4eoohp50p7P-9vP1_0Wf6gjOmcINcJjfpM54bHPRf4yt-uC8_otrxBDxXgU3Ucud6I87ylS1YYZACqkc2lwX" alt="User 2" />
              <img className="w-8 h-8 rounded-full border-2 border-surface object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIEr3pQYOeiJ_pVvJ0l2Pyeqy7OSRntiI1gly7gEb39wRaK4Zjuj9BD5jd-C_0GHRN0HcRbOhtQYxt_BVBbUUwjRnpBBeF_R3OXY1P-Lk8HOTjD7snC6CByi9fRYAcpBnE9X_mORCw0SmCKDuLv0y22dfUCZU6EgkQizojpz_R2hZF0OCqesoY19rmesL-RgQZIcj5JSQHp1hgKEmjV5nrSTbjnSXDp8Ogc6E-fc0op6mcQsPLVNCj" alt="User 3" />
            </div>
            <span>Dipercaya oleh 500+ sekolah se-Indonesia</span>
          </div> */}
        </div>

        {/* Hero Visual */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed/30 to-secondary-fixed/20 rounded-2xl filter blur-3xl transform -rotate-6"></div>
          <div 
            className="relative bg-surface rounded-xl shadow-xl overflow-hidden aspect-[4/3] bg-cover bg-center" 
            style={{ backgroundImage: `url(${mockup})` }}
          >
            {/* <div className="absolute bottom-6 left-6 right-6 bg-surface/80 backdrop-blur-md rounded-lg p-4 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <p className="font-semibold text-[14px]">Sinkronisasi Data Berhasil</p>
                <p className="text-label-sm text-on-surface-variant">Semua laporan harian telah diperbarui (2 menit lalu)</p>
              </div>
            </div> */}
          </div>
        </div>

      </div>
    </section>
  );
}
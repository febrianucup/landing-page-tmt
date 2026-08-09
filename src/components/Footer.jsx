import React from 'react';

const footerLinks = [
  {
    title: 'Produk',
    links: ['Fitur', 'Contact'],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface">TMT Administration</span>
          </div>
          <p className="text-body-md text-on-surface-variant max-w-sm">
            Menyederhanakan administrasi sekolah untuk Guru, Tata Usaha, dan Kepala Sekolah dalam satu platform terintegrasi.
          </p>
        </div>

        {footerLinks.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h4 className="font-semibold text-on-surface text-body-md">{col.title}</h4>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-on-surface-variant text-body-md hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-label-sm text-on-surface-variant">
          <span>&copy; 2026 TMT Administration. Dedicated to educational excellence.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Syarat Layanan</a>
            <a href="#" className="hover:text-primary transition-colors">Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

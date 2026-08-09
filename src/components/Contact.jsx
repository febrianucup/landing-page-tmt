import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Hubungi kami via email",
    value: "tmtpengajar@gmail.com",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=muhammaddwifebrian@gmail.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Berbicara langsung dengan tim kami",
    value: "+62 813-4767-575",
    link: "https://wa.me/6283134767575",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Kantor kita",
    value: "Situbondo, Jawa Timur, Indonesia",
    link: "https://maps.app.goo.gl/74Qq7L9Qd9qkUwyA6",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  }

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail=(e)=>{
    e.preventDefault()
    setLoading(true)
    setStatusMessage('')
    
    emailjs.sendForm(
      'service_pd25j0q',
      'template_qc3gy1a',
      formRef.current,
      'WanS8Y3cM6lqvDKb8'
    )

    .then((result) => {
      console.log('Success...', result.text);
      setLoading(false);
      setStatusMessage('Pesan terkirim! Tim kami akan segera menghubungi Anda.');
      formRef.current.reset();
    }, (error)=>{
      console.log('Failed...', error.text)
      setLoading(false);
      setStatusMessage('Gagal mengirim pesan. Silakan coba lagi.');
    })

  }

  return (
    <section id="kontak" className="w-full bg-surface py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[32px] lg:text-[36px] font-bold mb-4 text-on-surface">Hubungi Tim Kami</h2>
          <p className="text-body-lg text-on-surface-variant">
            Punya pertanyaan atau ingin demo langsung? Tim kami siap membantu proses implementasi di sekolah Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="block p-5 bg-[#2db34e5a] backdrop-blur-md rounded-2xl border border-black/[0.1] hover:bg-primary transition-all group flex items-start gap-4 bg-surface-container-lowest rounded-xl"
                >
                  <div className="flex items-center gap-4 justify-end w-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} border border-black/10 flex items-center justify-center shrink-0`}>
                      <item.icon className="w-6 h-6 text-black group-hover:text-white" />  
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-700 mb-0.5 group-hover:text-white">{item.title}</h4>
                      <p className="text-black/60 text-xs mb-1 truncate group-hover:text-white">{item.description}</p>
                      <p className="text-black text-sm font-medium truncate group-hover:text-white">{item.value}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-black/30 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-auto" />
                  </div>
                </a>
            ))}
          </div>

          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 flex flex-col gap-5 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-label-sm font-semibold text-on-surface">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    name="from_name"
                    type="text"
                    required
                    placeholder="Nama Anda"
                    className="px-4 py-3 rounded-lg border border-surface-container bg-surface text-on-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-label-sm font-semibold text-on-surface">
                    Email
                  </label>
                  <input
                    id="email"
                    name="from_email"
                    type="email"
                    required
                    placeholder="nama@sekolah.id"
                    className="px-4 py-3 rounded-lg border border-surface-container bg-surface text-on-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="school" className="text-label-sm font-semibold text-on-surface">
                  Nama Sekolah
                </label>
                <input
                  id="school"
                  name="school_name"
                  type="text"
                  placeholder="SMA/SMK/SMP ..."
                  className="px-4 py-3 rounded-lg border border-surface-container bg-surface text-on-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-label-sm font-semibold text-on-surface">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Ceritakan kebutuhan sekolah Anda..."
                  className="px-4 py-3 rounded-lg border border-surface-container bg-surface text-on-surface text-body-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Mengirim...' : (
                  <>
                    Kirim Pesan 
                    <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>

              {statusMessage && (
                <p className={`text-center text-sm font-medium ${statusMessage.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

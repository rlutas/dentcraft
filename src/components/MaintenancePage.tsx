import { Phone, Mail, Clock, MapPin } from 'lucide-react'

/**
 * Under construction / maintenance page
 * Shown when NEXT_PUBLIC_MAINTENANCE_MODE=true
 *
 * To disable: remove or set NEXT_PUBLIC_MAINTENANCE_MODE=false in Vercel env vars
 */
export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#faf6f1] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-[#d4c4b0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4c4b0]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
      />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Logo / Brand */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2a2118] tracking-tight">
            Dent<span className="text-[#8b7355]">Craft</span>
          </h1>
          <p className="text-sm text-[#8b7355] font-medium tracking-widest uppercase mt-1">
            Stomatologie Satu Mare
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.08)] border border-[#e8e0d5] p-8 md:p-10 mb-8">
          {/* Construction icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#faf6f1] border border-[#e8e0d5] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#8b7355]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#2a2118] mb-3">
            Site in constructie
          </h2>
          <p className="text-[#6b6b6b] leading-relaxed mb-2">
            Lucram la noul nostru website pentru a va oferi cea mai buna experienta.
          </p>
          <p className="text-[#6b6b6b] leading-relaxed">
            Intre timp, ne puteti contacta direct pentru programari sau informatii.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <a
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-[#e8e0d5] hover:border-[#d4c4b0] hover:shadow-[0_4px_16px_rgba(139,115,85,0.1)] transition-all duration-300 group"
            href="tel:+40741199977"
          >
            <div className="w-10 h-10 rounded-lg bg-[#faf6f1] flex items-center justify-center group-hover:bg-[#f0ebe3] transition-colors">
              <Phone className="w-4.5 h-4.5 text-[#8b7355]" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-xs text-[#8b7355] font-medium">Telefon</p>
              <p className="text-sm font-semibold text-[#2a2118]">0741 199 977</p>
            </div>
          </a>

          <a
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-[#e8e0d5] hover:border-[#d4c4b0] hover:shadow-[0_4px_16px_rgba(139,115,85,0.1)] transition-all duration-300 group"
            href="https://wa.me/40741199977"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="w-10 h-10 rounded-lg bg-[#faf6f1] flex items-center justify-center group-hover:bg-[#f0ebe3] transition-colors">
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-[#8b7355] font-medium">WhatsApp</p>
              <p className="text-sm font-semibold text-[#2a2118]">Scrie-ne mesaj</p>
            </div>
          </a>

          <a
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-[#e8e0d5] hover:border-[#d4c4b0] hover:shadow-[0_4px_16px_rgba(139,115,85,0.1)] transition-all duration-300 group"
            href="mailto:dentcraftsm@gmail.com"
          >
            <div className="w-10 h-10 rounded-lg bg-[#faf6f1] flex items-center justify-center group-hover:bg-[#f0ebe3] transition-colors">
              <Mail className="w-4.5 h-4.5 text-[#8b7355]" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-xs text-[#8b7355] font-medium">Email</p>
              <p className="text-sm font-semibold text-[#2a2118]">dentcraftsm@gmail.com</p>
            </div>
          </a>

          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-[#e8e0d5]">
            <div className="w-10 h-10 rounded-lg bg-[#faf6f1] flex items-center justify-center">
              <MapPin className="w-4.5 h-4.5 text-[#8b7355]" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-xs text-[#8b7355] font-medium">Locatie</p>
              <p className="text-sm font-semibold text-[#2a2118]">Satu Mare, Romania</p>
            </div>
          </div>
        </div>

        {/* Schedule info */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#8b7355]">
          <Clock className="w-4 h-4" strokeWidth={1.5} />
          <span>Luni - Vineri: 09:00 - 19:00</span>
        </div>
      </div>
    </div>
  )
}

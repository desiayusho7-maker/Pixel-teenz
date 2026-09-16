import { MessageCircle } from 'lucide-react';
import { waLink } from '../lib/site';

export default function WhatsAppFloat() {
  return (
    <a href={waLink('Hi Pixel Teenz! I have a question about your services.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 group">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      <span className="relative h-14 w-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_35px_-8px_rgba(37,211,102,0.7)] group-hover:scale-110 transition-transform">
        <MessageCircle size={26} style={{ color: '#04050c' }} />
      </span>
    </a>
  );
}

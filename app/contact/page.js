import { site } from '@/lib/site';

export const metadata = {
  title: 'தொடர்புக்கு',
  description: 'கோவில் சேவைகள், முகவரி, தொலைபேசி எண் மற்றும் இருப்பிடம் - ஸ்ரீ பெரியகாண்டியம்மன் கோவில்.',
};

const services = [
  '✅ பூஜைக்கு முன்பதிவு',
  '✅ அபிஷேகம்',
  '✅ ஜாதகம் பதிவிடுதல்',
  '✅ ரதம் ஓட்டம் முன்பதிவு',
  '✅ காது குத்துதல்',
  '✅ முதல் முடி எடுத்தல் (மொட்டை)',
  '✅ அன்னதானம் & திருவிழா உபயம்',
];

export default function ContactPage() {
  return (
    <div className="container">
      <div className="service-section">
        <div className="page-title">
          <h2>🛕 கோவில் சேவைகள்</h2>
        </div>

        <div className="service-card">
          <div className="service-grid">
            {services.map((item) => (
              <div className="service-item" key={item}>
                {item}
              </div>
            ))}
          </div>

          <div className="service-note">
            📞 <strong>மேற்கண்ட அனைத்து சேவைகளுக்கும் முன்பதிவு மற்றும் கூடுதல் விவரங்களுக்கு கோவில் அலுவலகத்தை தொடர்பு கொள்ளவும்.</strong>
          </div>
        </div>
      </div>

      <div className="page-title">
        <h2>தொடர்புக்கு அழையுங்கள்</h2>
      </div>

      <div className="grid-2">
        <div className="card text-center">
          <h3 className="card-title">📍 முகவரி</h3>
          <p>
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.line3}
          </p>
        </div>

        <div className="card text-center">
          <h3 className="card-title">📞 தொலைபேசி</h3>
          <p className="contact-number">{site.phone}</p>
          <p className="contact-note">{site.phoneHours}</p>
        </div>
      </div>

      <div className="map-section">
        <h3 className="map-heading">🗺️ கோவில் இருப்பிடம் (Google Map)</h3>
        <div className="map-container">
          <iframe
            src={site.mapEmbedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ஸ்ரீ பெரியகாண்டியம்மன் கோவில் இருப்பிடம்"
          />
        </div>
        <div className="map-link-wrap">
          <a href={site.mapLinkUrl} target="_blank" rel="noopener" className="map-link-btn">
            📍 Google Maps-ல் திறக்க இங்கே கிளிக் செய்யவும்
          </a>
        </div>
      </div>
    </div>
  );
}

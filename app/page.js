import Link from 'next/link';

export const metadata = {
  title: 'முகப்பு',
  description:
    'அருள்மிகு ஸ்ரீ பெரியகாண்டியம்மன் அண்ணமார் சாமி திருத்தலம், அவல்பூந்துறை, ஈரோடு. கோயில் நடை திறந்திருக்கும் நேரம் மற்றும் தினசரி பூஜை நேரங்கள்.',
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p>
          கொங்கு குலாலர், ஈரோடு பட்டம், வியாசரிஷி கோத்திரம், பூந்துறைநாடு, செட்டியண்ணன் கும்மியைச் சார்ந்த 14 (என்கின்ற) 37
          பூசாரிகளை சார்ந்த அண்ணன்மார்களின் குலதெய்வமான
        </p>
        <h2>
          அருள்மிகு ஸ்ரீ பெரியகாண்டியம்மன் <br />
          அண்ணமார் சாமி திருத்தலம்
        </h2>
        <Link href="/contact" className="btn-primary">
          தொடர்புக்கு
        </Link>
      </section>

      <section className="container">
        <div className="opening-hours-card">
          <h2>🛕 கோயில் நடை திறந்திருக்கும் நேரம்</h2>

          <div className="opening-time-grid">
            <div className="opening-box">
              <h3>🌅 காலை தரிசனம்</h3>
              <p>
                அதிகாலை <strong>6.00 மணி</strong>
                <br />
                முதல்
                <br />
                மதியம் <strong>2.00 மணி</strong> வரை
              </p>
            </div>

            <div className="opening-box">
              <h3>🌇 மாலை தரிசனம்</h3>
              <p>
                மாலை <strong>4.00 மணி</strong>
                <br />
                முதல்
                <br />
                இரவு <strong>8.00 மணி</strong> வரை
              </p>
            </div>
          </div>

          <div className="page-title">
            <h2>தினமும் பூஜை நடைபெறும் நேரங்கள்</h2>
          </div>

          <div className="grid-3-row">
            <div className="timing-card">
              <h3>காலை பூஜை</h3>
              <div className="time">07:00 AM</div>
            </div>
            <div className="timing-card">
              <h3>மதியம் பூஜை</h3>
              <div className="time">01:00 PM</div>
            </div>
            <div className="timing-card">
              <h3>இரவு பூஜை</h3>
              <div className="time">07:00 PM</div>
            </div>
          </div>

          <div className="opening-note">
            🙏 பக்தர்கள் மேற்கண்ட நேரங்களில் கோயிலுக்கு வருகை தந்து அம்மனை தரிசித்து அருளைப் பெறுமாறு அன்புடன்
            கேட்டுக்கொள்ளப்படுகிறார்கள்.
          </div>
        </div>
      </section>
    </>
  );
}

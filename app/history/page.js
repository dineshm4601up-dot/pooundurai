import { historyIntro, historyTimeline } from '@/lib/history-timeline';

export const metadata = {
  title: 'வரலாறு',
  description: 'பெரியகாண்டியம்மன் தல வரலாறு மற்றும் முக்கிய நிகழ்வுகள் & வரலாற்று மைல்கற்கள்.',
};

export default function HistoryPage() {
  return (
    <div className="container">
      <div className="page-title">
        <h2>பெரியகாண்டியம்மன் தல வரலாறு</h2>
      </div>
      <div className="intro-card">
        {historyIntro.split('\n\n').map((para, i) => (
          <p key={i} style={{ marginBottom: '1rem' }}>
            {para}
          </p>
        ))}
      </div>

      <div className="page-title">
        <h2>முக்கிய நிகழ்வுகள் & வரலாற்று மைல்கற்கள்</h2>
      </div>

      <div className="timeline">
        {historyTimeline.map((item) => (
          <div className="timeline-item" key={item.year}>
            <div className="timeline-badge">{item.icon}</div>
            <div className="timeline-card">
              <span className="year-tag">{item.year}</span>
              <h3 className="event-title">{item.title}</h3>
              <ul className="event-details">
                {item.details.map((d, i) => (
                  <li key={i}>
                    {d.label && <span className="date-highlight">{d.label} </span>}
                    {d.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

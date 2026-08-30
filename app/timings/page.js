import PoojaTabs from '@/components/PoojaTabs';
import { amavasaiDays, pournamiDays, festivalDays } from '@/lib/events';

export const metadata = {
  title: 'பூஜை & விசேஷ நாட்கள்',
  description:
    'சிறப்பு பூஜைகள், விழாக்கள் மற்றும் அமாவாசை, பௌர்ணமி, திருவிழா நாட்களின் விவரங்கள் - ஸ்ரீ பெரியகாண்டியம்மன் கோவில்.',
};

export default function TimingsPage() {
  return (
    <div className="container">
      <div className="page-title">
        <h2>சிறப்பு பூஜைகள் மற்றும் விழாக்கள்</h2>
      </div>

      <PoojaTabs />

      <div className="page-title">
        <h2>
          அமாவாசை மற்றும் பௌர்ணமி தினங்கள் அன்று <br />
          இரவு 7.00 மணிக்கு ரத உற்சவம் நடைபெறும்.
        </h2>
      </div>

      <div className="table-container">
        <div className="table-heading">
          <span>🌑</span> அமாவாசை நாட்கள்
        </div>
        <div className="table-responsive">
          <table id="amavasai-table">
            <thead>
              <tr>
                <th>தேதி</th>
                <th>தமிழ் தேதி</th>
                <th>கிழமை</th>
                <th>கோவில் வீடு</th>
              </tr>
            </thead>
            <tbody>
              {amavasaiDays.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.tamilDate}</td>
                  <td>{row.weekday}</td>
                  <td>{row.house}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="table-container">
        <div className="table-heading">
          <span>🌕</span> பௌர்ணமி நாட்கள்
        </div>
        <div className="table-responsive">
          <table id="pournami-table">
            <thead>
              <tr>
                <th>தேதி</th>
                <th>தமிழ் தேதி</th>
                <th>கிழமை</th>
              </tr>
            </thead>
            <tbody>
              {pournamiDays.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.tamilDate}</td>
                  <td>{row.weekday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="table-container">
        <div className="table-heading">
          <span>🎉</span> திருவிழா / சிறப்பு நாட்கள்
        </div>
        <div className="table-responsive">
          <table id="festival-table">
            <thead>
              <tr>
                <th>தேதி</th>
                <th>நிகழ்வு</th>
                <th>தமிழ் தேதி</th>
                <th>கிழமை</th>
              </tr>
            </thead>
            <tbody>
              {festivalDays.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.eventName}</td>
                  <td>{row.tamilDate}</td>
                  <td>{row.weekday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

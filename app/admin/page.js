import AdminOrgChart from '@/components/AdminOrgChart';

export const metadata = {
  title: 'நிர்வாகம்',
  description: 'திருக்கோவில் நிர்வாக சபை - தலைவர், செயலாளர், பொருளாளர் மற்றும் நிர்வாகிகள் விவரங்கள்.',
};

export default function AdminPage() {
  return (
    <div className="container">
      <div className="page-title">
        <h2>திருக்கோவில் நிர்வாகம்</h2>
        <p>14 (எ) 37 கோயில் வீட்டின் அண்ணன்மார்கள் சார்பாக நிர்வாக சபை தேர்தெடுத்து திருக்கோவிலில் நடைபெறும்.</p>
        <p>
          அண்ணன்மார்களின் ஒத்துழைப்பு மற்றும் நன்கொடை மூலம் பெற்று பூஜைகளும், விழாக்களும், கோவில் பராமரிப்புகளும், ஆண்டு
          விழாக்கள் நடத்துவதற்காக நிர்வாக சபை அமைக்கப்பட்டது
        </p>
      </div>

      <AdminOrgChart />
    </div>
  );
}

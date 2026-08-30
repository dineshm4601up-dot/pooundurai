// Single source of truth for Amavasai / Pournami / Festival dates.
// Used by both the /timings tables and the header marquee — see
// upcomingEvents() below and components/Marquee.js.

export const amavasaiDays = [
  { date: '17.04.2026', tamilDate: 'சித்திரை - 04', weekday: 'வெள்ளி', house: 'சூரமங்கலம்' },
  { date: '16.05.2026', tamilDate: 'வைகாசி - 02', weekday: 'சனி', house: 'வெள்ளமுத்துக்கவுண்டன் வலசு' },
  { date: '14.06.2026', tamilDate: 'வைகாசி - 31', weekday: 'ஞாயிறு', house: 'P.K. வேலம்பாளையம் மேற்கு' },
  { date: '14.07.2026', tamilDate: 'ஆனி - 30', weekday: 'செவ்வாய்', house: 'கனகபுரம்' },
  { date: '12.08.2026', tamilDate: 'ஆடி - 27', weekday: 'புதன்', house: 'கோபி, ஏழூர்' },
  { date: '10.09.2026', tamilDate: 'ஆவணி - 24', weekday: 'வியாழன்', house: 'கொடமாண்டப்பட்டி' },
  { date: '10.10.2026', tamilDate: 'புரட்டாசி - 23', weekday: 'சனி', house: 'பவானி' },
  { date: '08.11.2026', tamilDate: 'ஐப்பசி - 22', weekday: 'ஞாயிறு', house: 'தாதம்பட்டி' },
  { date: '08.12.2026', tamilDate: 'கார்த்திகை - 22', weekday: 'செவ்வாய்', house: 'லக்காபுரம் புதூர்' },
  { date: '07.01.2027', tamilDate: 'மார்கழி - 23', weekday: 'வியாழன்', house: 'நாமக்கல் ஏழூர்' },
  { date: '06.02.2027', tamilDate: 'தை - 23', weekday: 'சனி', house: 'கூட்டாத்துப்பட்டி' },
  { date: '08.03.2027', tamilDate: 'மாசி - 24', weekday: 'திங்கள்', house: 'சென்னிமலை' },
  { date: '06.04.2027', tamilDate: 'பங்குனி - 23', weekday: 'செவ்வாய்', house: 'பெரியூர் மேற்கு' },
];

export const pournamiDays = [
  { date: '01.05.2026', tamilDate: 'சித்திரை - 18', weekday: 'வெள்ளி' },
  { date: '30.05.2026', tamilDate: 'வைகாசி - 16', weekday: 'சனி' },
  { date: '29.06.2026', tamilDate: 'ஆனி - 15', weekday: 'திங்கள்' },
  { date: '29.07.2026', tamilDate: 'ஆடி - 13', weekday: 'புதன்' },
  { date: '27.08.2026', tamilDate: 'ஆவணி - 10', weekday: 'வியாழன்' },
  { date: '26.09.2026', tamilDate: 'புரட்டாசி - 09', weekday: 'சனி' },
  { date: '25.10.2026', tamilDate: 'ஐப்பசி - 08', weekday: 'ஞாயிறு' },
  { date: '24.11.2026', tamilDate: 'கார்த்திகை - 08', weekday: 'செவ்வாய்' },
  { date: '23.12.2026', tamilDate: 'மார்கழி - 08', weekday: 'புதன்' },
  { date: '22.01.2027', tamilDate: 'தை - 08', weekday: 'வெள்ளி' },
  { date: '20.02.2027', tamilDate: 'மாசி - 08', weekday: 'சனி' },
  { date: '21.03.2027', tamilDate: 'பங்குனி - 07', weekday: 'ஞாயிறு' },
];

export const festivalDays = [
  { date: '01.02.2026', eventName: 'கும்பாபிஷேக ஆண்டு விழா', tamilDate: 'தை- 18', weekday: 'ஞாயிறு' },
];

function parseEventDate(dateStr) {
  const [day, month, year] = dateStr.trim().split('.').map((n) => parseInt(n, 10));
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

// Builds a flat, sorted list of every event with a parsed `date`, so
// the marquee and any "upcoming" widgets can share one computation.
export function allEvents() {
  const amavasai = amavasaiDays.map((d) => ({ type: 'amavasai', ...d, date: parseEventDate(d.date), dateStr: d.date }));
  const pournami = pournamiDays.map((d) => ({ type: 'pournami', ...d, date: parseEventDate(d.date), dateStr: d.date }));
  const festival = festivalDays.map((d) => ({ type: 'festival', ...d, date: parseEventDate(d.date), dateStr: d.date }));
  return [...amavasai, ...pournami, ...festival].filter((e) => e.date);
}

export function upcomingEvents(count = 2, from = new Date()) {
  const todayStart = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return allEvents()
    .filter((event) => event.date.getTime() >= todayStart.getTime())
    .sort((a, b) => a.date - b.date)
    .slice(0, count);
}

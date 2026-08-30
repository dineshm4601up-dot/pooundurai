import { templeHouses } from '@/lib/temple-houses';

export const metadata = {
  title: 'கோவில் வீடு',
  description: '37 பூசாரியார்கள் மற்றும் கோவில் வீடு விவரங்கள் - ஸ்ரீ பெரியகாண்டியம்மன் கோவில்.',
};

export default function CountriesPage() {
  return (
    <div className="container">
      <div className="section-block">
        <h3 className="section-heading">🛕 37 பூசாரியார்கள் மற்றும் கோவில் வீடு</h3>

        <div className="table-container">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th className="table-col-10">எண்</th>
                  <th>கோவில் வீடு</th>
                  <th>பூசாரியார்</th>
                </tr>
              </thead>
              <tbody>
                {templeHouses.map((row) => (
                  <tr key={row.no}>
                    <td>{row.no}</td>
                    <td>{row.house}</td>
                    <td>{row.pujari}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

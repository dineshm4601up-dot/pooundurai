import Image from 'next/image';
import { topLevel, viceChairmen, jointSecretaries, auditors, accountant } from '@/lib/admin-members';

function MemberPhoto({ photo, name, sizes }) {
  return (
    <div className="member-photo">
      <Image src={photo} alt={name} fill sizes={sizes} style={{ objectFit: 'cover' }} />
    </div>
  );
}

export default function AdminOrgChart() {
  return (
    <section className="org-chart">
      <div className="org-row top-level">
        {topLevel.map((member) => (
          <div className={`org-member ${member.cardClass}`} key={member.key}>
            <MemberPhoto photo={member.photo} name={member.name} sizes="110px" />
            <span className={`role-badge ${member.badgeClass}`}>{member.badge}</span>
            <h3>{member.name}</h3>
            <p>{member.place}</p>
          </div>
        ))}
      </div>

      <div className="org-row second-level">
        <div className="sub-group">
          <div className="sub-title">துணைத் தலைவர்கள்</div>
          <div className="sub-members">
            {viceChairmen.map((member) => (
              <div className="org-member small-card" key={member.key}>
                <MemberPhoto photo={member.photo} name={member.name} sizes="82px" />
                <h3>{member.name}</h3>
                <p>{member.place}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sub-group">
          <div className="sub-title">துணைச் செயலாளர்கள்</div>
          <div className="sub-members">
            {jointSecretaries.map((member) => (
              <div className="org-member small-card" key={member.key}>
                <MemberPhoto photo={member.photo} name={member.name} sizes="82px" />
                <h3>{member.name}</h3>
                <p>{member.place}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-title">
        <h2>தனிக்கையாளர்கள்</h2>
      </div>

      <div className="org-row auditors-row">
        {auditors.map((member) => (
          <div className="org-member" key={member.key}>
            <MemberPhoto photo={member.photo} name={member.name} sizes="72px" />
            <span className="role-badge auditor-badge">தனிக்கையாளர்</span>
            <h3>{member.name}</h3>
            <p>{member.place}</p>
          </div>
        ))}
      </div>

      <div className="section-title_a">
        <h2>14-பொது கணக்குப்பிள்ளை</h2>
      </div>

      <div className="org-row accountant-row">
        <div className="org-member accountant-card">
          <MemberPhoto photo={accountant.photo} name={accountant.name} sizes="82px" />
          <h3>{accountant.name}</h3>
          <p>{accountant.place}</p>
        </div>
      </div>
    </section>
  );
}

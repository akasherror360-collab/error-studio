import { Icon } from '@iconify/react';

const teamData = [
  { memberName: 'Ayanash',       memberDesignation: 'Founder | Photographer & Editor', icon: 'ph:crown-light' },
  { memberName: 'Jayakumaran',   memberDesignation: 'Creative Director', icon: 'ph:monitor-play-light' },
  { memberName: 'Premkumar',     memberDesignation: 'Senior Photographer', icon: 'ph:camera-light' },
  { memberName: 'Sagaya Prajin', memberDesignation: 'Videographer', icon: 'ph:video-camera-light' },
  { memberName: 'Gowtham',       memberDesignation: 'Videographer & Photographer', icon: 'ph:camera-plus-light' },
  { memberName: 'Dhas',          memberDesignation: 'Photographer & Editor', icon: 'ph:aperture-light' },
  { memberName: 'Akashraj',      memberDesignation: 'Photographer & Editor', icon: 'ph:image-square-light' },
  { memberName: 'Videography Associate', memberDesignation: 'Cinematic videography and event film coverage.', icon: 'ph:film-slate-light' },
  { memberName: 'Editing & Design Team', memberDesignation: 'Photo editing, album designing, video editing, reels, and branding creatives.', icon: 'ph:paint-brush-broad-light' },
];

export default function TeamSlider() {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
        className="cs-team-list-grid"
      >
        {teamData.map((item, index) => (
          <div
            key={index}
            style={{ textDecoration: 'none', display: 'flex' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '18px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                borderRight: (index % 3 !== 2) ? '1px solid rgba(255,255,255,0.08)' : 'none',
                transition: 'background 0.2s ease',
                width: '100%',
                height: '100%',
              }}
              className="cs-team-list-item"
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Icon */}
              <div
                style={{
                  flexShrink: 0,
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '28px',
                }}
              >
                <Icon icon={item.icon} />
              </div>
              {/* Text */}
              <div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: '25px',
                    fontWeight: '600',
                    lineHeight: '1.2',
                    marginBottom: '8px',
                  }}
                >
                  {item.memberName}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '1.3',
                  }}
                >
                  {item.memberDesignation}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 991px) {
          .cs-team-list-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 575px) {
          .cs-team-list-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

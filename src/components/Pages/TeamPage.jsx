import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import PageHeading from '../PageHeading';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import Team from '../Team';
import teamHeroBg from '../../assets/images/team_hero_bg.jpeg';
import member1 from '../../assets/images/member_1.jpeg';
import member2 from '../../assets/images/member_2.jpeg';
import member3 from '../../assets/images/member_3.jpeg';
import member4 from '../../assets/images/member_4.jpeg';
import ctaBg from '../../assets/images/cta_bg.jpeg';

const teamData = [
  {
    memberImage: member1,
    memberName: 'Ayanash',
    memberDesignation: 'Founder | Photographer & Editor',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member2,
    memberName: 'Jayakumaran',
    memberDesignation: 'Creative Director',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member3,
    memberName: 'Premkumar',
    memberDesignation: 'Senior Photographer',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member4,
    memberName: 'Sagaya Prajin',
    memberDesignation: 'Videographer',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member3,
    memberName: 'Gowtham',
    memberDesignation: 'Videographer & Photographer',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member4,
    memberName: 'Dhas',
    memberDesignation: 'Photographer & Editor',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member1,
    memberName: 'Akashraj',
    memberDesignation: 'Photographer & Editor',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
];

export default function TeamPage() {
  pageTitle('Team');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Our Team"
        bgSrc={teamHeroBg}
        pageLinkText="Team"
      />
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Meet our awesome <br/>team members"
          subtitle="Our Team"
          variant="cs-style1 text-center"
        />
        <Spacing lg="90" md="45" />
        <Div className="row">
          {teamData.map((item, index) => (
            <Div key={index} className="col-lg-3 col-sm-6">
              <Team
                memberImage={item.memberImage}
                memberName={item.memberName}
                memberDesignation={item.memberDesignation}
                memberSocial={item.memberSocial}
              />
              <Spacing lg="80" md="30" />
            </Div>
          ))}
        </Div>
        <Spacing lg="70" md="50" />
        <Div className="container">
          <Cta
            title="Let’s disscuse make <br />something <i>cool</i> together"
            btnText="Apply For Meeting"
            btnLink="/contact"
            bgSrc={ctaBg}
          />
        </Div>
      </Div>
    </>
  );
}

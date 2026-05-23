import { Route, Routes } from 'react-router-dom';
import AboutPage from './components/Pages/AboutPage';
import BlogPage from './components/Pages/BlogPage';
import BlogDetails1 from './components/Pages/BlogDetails1';
import BlogDetails2 from './components/Pages/BlogDetails2';
import BlogDetails3 from './components/Pages/BlogDetails3';
import ContactPage from './components/Pages/ContactPage';
import ErrorPage from './components/Pages/ErrorPage';
import Home from './components/Pages/Home';
import PortfolioDetailsPage from './components/Pages/PortfolioDetailsPage';
import WeddingPhotography from './components/Pages/WeddingPhotography';
import Videography from './components/Pages/Videography';
import VideoEditing from './components/Pages/VideoEditing';
import BrandCommercial from './components/Pages/BrandCommercial';
import ServicesPage from './components/Pages/ServicesPage';
import TeamPage from './components/Pages/TeamPage';
import PortfolioPage from './components/Pages/PortfolioPage';
import TeamDetails from './components/Pages/TeamDetails';
import PhotographyAgencyHome from './components/Pages/PhotographyAgencyHome';
import CreativePortfolioHome from './components/Pages/CreativePortfolioHome';
import DigitalAgencyHome from './components/Pages/DigitalAgencyHome';
import MarketingAgencyHome from './components/Pages/MarketingAgencyHome';
import ShowcasePortfolioHome from './components/Pages/ShowcasePortfolioHome';
import CaseStudyShowcaseHome from './components/Pages/CaseStudyShowcaseHome';
import Layout from './components/Layout';
import CaseStudyDetailsPage from './components/Pages/CaseStudyDetailsPage';
import FaqPage from './components/Pages/FaqPage';
import FreelancerAgencyHome from './components/Pages/FreelancerAgencyHome';
import ArchitectureAgencyHome from './components/Pages/ArchitectureAgencyHome';
import CreativeSolutionHome from './components/Pages/CreativeSolutionHome';
import PersonalPortfolioHome from './components/Pages/PersonalPortfolioHome';
import VideoShowcaseHome from './components/Pages/VideoShowcaseHome';
import FloatingButtons from './components/FloatingButtons';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="photography-agency"
            element={<PhotographyAgencyHome />}
          />
          <Route path="digital-agency" element={<DigitalAgencyHome />} />
          <Route path="marketing-agency" element={<MarketingAgencyHome />} />
          <Route path="freelancer-agency" element={<FreelancerAgencyHome />} />
          <Route
            path="architecture-agency"
            element={<ArchitectureAgencyHome />}
          />
          <Route path="creative-solution" element={<CreativeSolutionHome />} />
          <Route
            path="personal-portfolio"
            element={<PersonalPortfolioHome />}
          />
          <Route path="about" element={<AboutPage />} />
          <Route path="service" element={<ServicesPage />} />
          <Route path="service/wedding-photography" element={<WeddingPhotography />} />
          <Route path="service/videography" element={<Videography />} />
          <Route path="service/video-editing" element={<VideoEditing />} />
          <Route path="service/commercial" element={<BrandCommercial />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route
            path="portfolio/:portfolioDetailsId"
            element={<PortfolioDetailsPage />}
          />
          <Route path="blog" element={<BlogPage />} />
          <Route
            path="blog/how-to-keep-fear-from-ruining-your-art-business-with-confident"
            element={<BlogDetails1 />}
          />
          <Route
            path="blog/artistic-mind-will-be-great-for-creation-anything"
            element={<BlogDetails2 />}
          />
          <Route
            path="blog/ai-will-take-over-all-job-for-human-within-next-year"
            element={<BlogDetails3 />}
          />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="team/:teamDetails" element={<TeamDetails />} />
          <Route
            path="/case-study/:caseStudyDetailsId"
            element={<CaseStudyDetailsPage />}
          />
          <Route path="faq" element={<FaqPage />} />
        </Route>
        <Route
          path="/"
          element={<Layout headerVariant="cs-site_header_full_width" />}
        >
          <Route
            path="creative-portfolio"
            element={<CreativePortfolioHome />}
          />
          <Route
            path="showcase-portfolio"
            element={<ShowcasePortfolioHome />}
          />
          <Route
            path="case-study-showcase"
            element={<CaseStudyShowcaseHome />}
          />
          <Route path="video-showcase" element={<VideoShowcaseHome />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <FloatingButtons />
    </>
  );
}

export default App;

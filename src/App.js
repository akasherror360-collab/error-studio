import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './components/Pages/AboutPage';
import BlogPage from './components/Pages/BlogPage';
import BlogDetails1 from './components/Pages/BlogDetails1';
import BlogDetails2 from './components/Pages/BlogDetails2';
import ContactPage from './components/Pages/ContactPage';
import ErrorPage from './components/Pages/ErrorPage';
import Home from './components/Pages/Home';
import PortfolioDetailsPage from './components/Pages/PortfolioDetailsPage';
import WeddingPhotography from './components/Pages/WeddingPhotography';
import Videography from './components/Pages/Videography';
import VideoEditing from './components/Pages/VideoEditing';
import BrandCommercial from './components/Pages/BrandCommercial';
import ServicesPage from './components/Pages/ServicesPage';
import PortfolioPage from './components/Pages/PortfolioPage';
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
import AdminPanel from './admin/AdminPanel';
import PublishedContent from './content/PublishedContent';
import EventGallery from './events/EventGallery';
import EventPoster from './events/EventPoster';

function App() {
  return (
    <>
      <PublishedContent />
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/events/:slug" element={<EventGallery />} />
        <Route path="/events/:slug/qr" element={<EventPoster />} />
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
            path="blog/wedding-venues-in-and-around-cuddalore"
            element={<BlogDetails1 />}
          />
          <Route
            path="blog/how-to-prepare-for-your-wedding-shoot"
            element={<BlogDetails2 />}
          />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<Navigate to="/about" replace />} />
          <Route path="team/*" element={<Navigate to="/about" replace />} />
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

import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './components/Pages/AboutPage';
import BlogPage from './components/Pages/BlogPage';
import BlogDetails1 from './components/Pages/BlogDetails1';
import BlogDetails2 from './components/Pages/BlogDetails2';
import ContactPage from './components/Pages/ContactPage';
import ErrorPage from './components/Pages/ErrorPage';
import Home from './components/Pages/Home';
import WeddingPhotography from './components/Pages/WeddingPhotography';
import Videography from './components/Pages/Videography';
import VideoEditing from './components/Pages/VideoEditing';
import BrandCommercial from './components/Pages/BrandCommercial';
import AlbumDesign from './components/Pages/AlbumDesign';
import EventCoverage from './components/Pages/EventCoverage';
import CinematicTeasers from './components/Pages/CinematicTeasers';
import ServicesPage from './components/Pages/ServicesPage';
import PortfolioPage from './components/Pages/PortfolioPage';
import Layout from './components/Layout';
import FaqPage from './components/Pages/FaqPage';
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
          <Route path="about" element={<AboutPage />} />
          <Route path="service" element={<ServicesPage />} />
          <Route path="service/wedding-photography" element={<WeddingPhotography />} />
          <Route path="service/videography" element={<Videography />} />
          <Route path="service/video-editing" element={<VideoEditing />} />
          <Route path="service/commercial" element={<BrandCommercial />} />
          <Route path="service/album-design" element={<AlbumDesign />} />
          <Route path="service/event-coverage" element={<EventCoverage />} />
          <Route path="service/cinematic-teasers" element={<CinematicTeasers />} />
          <Route path="portfolio" element={<PortfolioPage />} />
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
          <Route path="faq" element={<FaqPage />} />
          {/* Retired template demo and filler pages redirect to real sections */}
          <Route path="team" element={<Navigate to="/about" replace />} />
          <Route path="team/*" element={<Navigate to="/about" replace />} />
          <Route path="portfolio/:portfolioDetailsId" element={<Navigate to="/portfolio" replace />} />
          <Route path="case-study/:caseStudyDetailsId" element={<Navigate to="/portfolio" replace />} />
          <Route path="photography-agency" element={<Navigate to="/" replace />} />
          <Route path="digital-agency" element={<Navigate to="/" replace />} />
          <Route path="marketing-agency" element={<Navigate to="/" replace />} />
          <Route path="freelancer-agency" element={<Navigate to="/" replace />} />
          <Route path="architecture-agency" element={<Navigate to="/" replace />} />
          <Route path="creative-solution" element={<Navigate to="/" replace />} />
          <Route path="personal-portfolio" element={<Navigate to="/" replace />} />
          <Route path="creative-portfolio" element={<Navigate to="/" replace />} />
          <Route path="showcase-portfolio" element={<Navigate to="/" replace />} />
          <Route path="case-study-showcase" element={<Navigate to="/" replace />} />
          <Route path="video-showcase" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <FloatingButtons />
    </>
  );
}

export default App;

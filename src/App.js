import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './components/Pages/AboutPage';
import BlogPage from './components/Pages/BlogPage';
import BlogDetails1 from './components/Pages/BlogDetails1';
import BlogDetails3 from "./components/Pages/BlogDetails3";
import BlogDetails4 from "./components/Pages/BlogDetails4";
import BlogDetails2 from './components/Pages/BlogDetails2';
import BlogDetails5 from './components/Pages/BlogDetails5';
import BlogDetails6 from './components/Pages/BlogDetails6';
import BlogDetails7 from './components/Pages/BlogDetails7';
import BlogDetails8 from './components/Pages/BlogDetails8';
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
import PreWeddingPhotography from './components/Pages/PreWeddingPhotography';
import PortraitPhotography from './components/Pages/PortraitPhotography';
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
          <Route path="service/pre-wedding-photography" element={<PreWeddingPhotography />} />
          <Route path="service/portrait-photography" element={<PortraitPhotography />} />
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
          <Route
            path="blog/pre-wedding-shoot-locations-cuddalore"
            element={<BlogDetails3 />}
          />
          <Route
            path="blog/candid-vs-traditional-wedding-photography"
            element={<BlogDetails4 />}
          />
          <Route
            path="blog/wedding-day-photography-timeline"
            element={<BlogDetails5 />}
          />
          <Route
            path="blog/wedding-album-design-process"
            element={<BlogDetails6 />}
          />
          <Route
            path="blog/engagement-reception-coverage-tips"
            element={<BlogDetails7 />}
          />
          <Route
            path="blog/villupuram-pondicherry-shoot-locations"
            element={<BlogDetails8 />}
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

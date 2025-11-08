import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider as MUIThemeProvider } from "@emotion/react";
import { CssBaseline, Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { useCustomTheme } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Eager loaded components (needed immediately)
import Navbar from "./components/layout/Navbar";
import Footer from "./components/Shared/Footer";
import HomePage from "./components/pages/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Lazy loaded components (loaded on demand)
const ExpertRegister = lazy(() => import("./components/Auth/ExpertRegister"));
const ExpertProfile = lazy(() => import("./components/Profile/ExpertProfile"));
const UserProfile = lazy(() => import("./components/Profile/UserProfile"));
const SepaPayment = lazy(() => import("./components/Payment/SepaPayment"));
const SetupSepaPayment = lazy(() => import("./components/Payment/SetupSepaPayment"));
const PaymentConfirmation = lazy(() => import("./components/Shared/PaymentConfirmation"));
const Chat = lazy(() => import("./components/Chat/Chat"));
const ChatRoom = lazy(() => import("./components/Chat/ChatRoom"));
const CreateAd = lazy(() => import("./components/Ads/CreateAd"));
const MyAds = lazy(() => import("./components/Ads/MyAds"));
const AdList = lazy(() => import("./components/Ads/AdList"));
const AdDetail = lazy(() => import("./components/Ads/AdDetail"));
const RequestList = lazy(() => import("./components/pages/RequestList"));
const CategoryDetail = lazy(() => import("./components/pages/CategoryDetail"));
const ServiceDetail = lazy(() => import("./components/pages/ServiceDetail"));
const ExpertPage = lazy(() => import("./components/pages/ExpertPage"));

// Company Pages
const AboutUs = lazy(() => import("./components/pages/company/AboutUs"));
const Careers = lazy(() => import("./components/pages/company/Careers"));
const ContactUs = lazy(() => import("./components/pages/company/ContactUs"));

// Services Pages
const HomeRenovation = lazy(() => import("./components/pages/services/HomeRenovation"));
const GardenDesign = lazy(() => import("./components/pages/services/GardenDesign"));
const SpecialProjects = lazy(() => import("./components/pages/services/SpecialProjects"));
const ServicesPage = lazy(() => import("./components/pages/services/Services"));

// Support Pages
const HelpCenter = lazy(() => import("./components/pages/support/HelpCenter"));
const PrivacyPolicy = lazy(() => import("./components/pages/support/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/pages/support/TermsOfService"));
const Unauthorized = lazy(() => import("./components/pages/Unauthorized"));

// Admin Components
const AdminLayout = lazy(() => import("./components/admin/layout/AdminLayout"));
const Dashboard = lazy(() => import("./components/admin/dashboard/Dashboard"));
const UserList = lazy(() => import("./components/admin/users/UserList"));
const AdminAdList = lazy(() => import("./components/admin/ads/AdList"));
const StorageManagement = lazy(() => import("./components/admin/storage/StorageManagement"));
const Settings = lazy(() => import("./components/admin/settings/Settings"));
const Messages = lazy(() => import("./components/admin/messages/Messages"));
const Payments = lazy(() => import("./components/admin/payments/Payments"));
const Analytics = lazy(() => import("./components/admin/analytics/Analytics"));
const Categories = lazy(() => import("./components/admin/categories/Categories"));
const Services = lazy(() => import("./components/admin/categories/Services"));
const AdminGuard = lazy(() => import("./guards/AdminGuard"));

function App() {
  const { theme: customTheme } = useCustomTheme();

  return (
    <LanguageProvider>
      <MUIThemeProvider theme={customTheme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner message="Loading..." />}>
              <Routes>
                {/* Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <Suspense fallback={<LoadingSpinner message="Loading admin panel..." />}>
                      <AdminGuard>
                        <AdminLayout>
                          <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="users" element={<UserList />} />
                            <Route path="ads" element={<AdminAdList />} />
                            <Route path="storage" element={<StorageManagement />} />
                            <Route path="messages" element={<Messages />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="payments" element={<Payments />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="services" element={<Services />} />
                          </Routes>
                        </AdminLayout>
                      </AdminGuard>
                    </Suspense>
                  }
                />

                {/* Main App Routes */}
                <Route
                  path="*"
                  element={
                    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                      <Navbar />
                      <Box component="main" sx={{ flexGrow: 1 }}>
                        <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                          <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/expert-register" element={<ExpertRegister />} />

                            {/* Category and Service Detail Pages */}
                            <Route path="/kategori/:id" element={<CategoryDetail />} />
                            <Route path="/servis/:id" element={<ServiceDetail />} />

                            {/* Profile Routes */}
                            <Route path="/expert-profile" element={<ExpertProfile />} />
                            <Route path="/user-profile" element={<UserProfile />} />

                            {/* Payment Routes */}
                            <Route path="/sepa-payment" element={<SepaPayment />} />
                            <Route path="/setup-sepa-payment" element={<SetupSepaPayment />} />
                            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />

                            {/* Ad Routes */}
                            <Route path="/ads" element={<AdList />} />
                            <Route path="/ads/:id" element={<AdDetail />} />
                            <Route path="/create-ad" element={<CreateAd />} />
                            <Route path="/my-ads" element={<MyAds />} />

                            {/* Request Routes */}
                            <Route path="/requests" element={<RequestList />} />

                            {/* Chat Routes */}
                            <Route path="/chat/:chatRoomId" element={<Chat />} />
                            <Route path="/chat-rooms" element={<ChatRoom />} />

                            {/* Company Pages */}
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/contact" element={<ContactUs />} />

                            {/* Services Pages */}
                            <Route path="/services/home-renovation" element={<HomeRenovation />} />
                            <Route path="/services/garden-design" element={<GardenDesign />} />
                            <Route path="/services/special-projects" element={<SpecialProjects />} />
                            <Route path="/services" element={<ServicesPage />} />

                            {/* Experts List Page */}
                            <Route path="/experts" element={<ExpertPage />} />

                            {/* Support Pages */}
                            <Route path="/help" element={<HelpCenter />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="/unauthorized" element={<Unauthorized />} />
                          </Routes>
                        </Suspense>
                      </Box>
                      <Footer />
                    </Box>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </MUIThemeProvider>
    </LanguageProvider>
  );
}

export default App;

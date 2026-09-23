import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import PaperSubmissionPage from "./pages/PaperSubmissionPage";
import RegistrationPage from "./pages/RegistrationPage";
import ArchivesPage from "./pages/ArchivesPage";
import CurrentEditionPage from "./pages/CurrentEditionPage";
import EditorialBoardPage from "./pages/EditorialBoardPage";
import AuthorSectionPage from "./pages/AuthorSectionPage";
import IndexingPage from "./pages/IndexingPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/LoginPage";

import DashboardHomePage from "./pages/admin/DashboardHomePage";
import SubmissionsPage from "./pages/admin/SubmissionsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import BoardManagementPage from "./pages/admin/BoardManagementPage";

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/paper-submission" element={<PaperSubmissionPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/current-edition" element={<CurrentEditionPage />} />
        <Route path="/editorial-board" element={<EditorialBoardPage />} />
        <Route path="/author-section" element={<AuthorSectionPage />} />
        <Route path="/indexing" element={<IndexingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Dashboard */}
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<DashboardHomePage />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="board" element={<BoardManagementPage />} />
      </Route>
    </Routes>
  );
}

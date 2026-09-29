import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import AnalyticsProvider from './context/AnalyticsProvider'
import ContentProvider from './context/ContentProvider'
import ToastProvider from './ui/ToastProvider'
import LandingLayout from './layouts/LandingLayout'
import DashboardLayout from './layouts/DashboardLayout'
import RequireAuth from './routes/RequireAuth'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Overview from './pages/dashboard/Overview'
import HeroEditor from './pages/dashboard/HeroEditor'
import StatsEditor from './pages/dashboard/StatsEditor'
import ProblemsEditor from './pages/dashboard/ProblemsEditor'
import RolesEditor from './pages/dashboard/RolesEditor'
import CtaEditor from './pages/dashboard/CtaEditor'
import ContactEditor from './pages/dashboard/ContactEditor'
import NavigationEditor from './pages/dashboard/NavigationEditor'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'
import SubmissionsInbox from './pages/dashboard/SubmissionsInbox'
import SettingsPage from './pages/dashboard/SettingsPage'

function App() {
  return (
    <AuthProvider>
      <AnalyticsProvider>
        <ContentProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingLayout />}>
                  <Route index element={<Landing />} />
                </Route>

                <Route path="/login" element={<Login />} />

                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <DashboardLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<Overview />} />
                  <Route path="hero" element={<HeroEditor />} />
                  <Route path="stats" element={<StatsEditor />} />
                  <Route path="problems" element={<ProblemsEditor />} />
                  <Route path="roles" element={<RolesEditor />} />
                  <Route path="cta" element={<CtaEditor />} />
                  <Route path="contact" element={<ContactEditor />} />
                  <Route path="navigation" element={<NavigationEditor />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="submissions" element={<SubmissionsInbox />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </ContentProvider>
      </AnalyticsProvider>
    </AuthProvider>
  )
}

export default App

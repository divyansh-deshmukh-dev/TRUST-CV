import React from 'react';
import { useApp } from './state/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { FooterDisclaimer } from './components/layout/FooterDisclaimer';
import { LandingPage } from './pages/LandingPage';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { DataIntegrityPage } from './pages/DataIntegrityPage';
import { ModelIntegrityPage } from './pages/ModelIntegrityPage';
import { InferenceProvenancePage } from './pages/InferenceProvenancePage';
import { DistributionShiftPage } from './pages/DistributionShiftPage';
import { ContributorTrustPage } from './pages/ContributorTrustPage';
import { AttackSimulationLab } from './pages/AttackSimulationLab';
import { AuditVaultPage } from './pages/AuditVaultPage';
import { AssuranceReportPage } from './pages/AssuranceReportPage';

export const AppContent: React.FC = () => {
  const { activePage } = useApp();

  // If on landing page, display the dedicated full-width introduction experience
  if (activePage === 'landing') {
    return <LandingPage />;
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'overview':
        return <OverviewDashboard />;
      case 'data':
        return <DataIntegrityPage />;
      case 'model':
        return <ModelIntegrityPage />;
      case 'inference':
        return <InferenceProvenancePage />;
      case 'distribution':
        return <DistributionShiftPage />;
      case 'contributors':
        return <ContributorTrustPage />;
      case 'attack-lab':
        return <AttackSimulationLab />;
      case 'audit':
        return <AuditVaultPage />;
      case 'report':
        return <AssuranceReportPage />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#070A10] text-slate-100 overflow-hidden font-sans select-none">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Dynamic Page Workspace with Military Grid Backdrop */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 military-grid relative min-w-0">
          <div className="max-w-7xl mx-auto pb-8">
            {renderActivePage()}
          </div>
        </main>

        {/* Mandatory Footer Disclaimer */}
        <FooterDisclaimer />
      </div>
    </div>
  );
};

export default AppContent;

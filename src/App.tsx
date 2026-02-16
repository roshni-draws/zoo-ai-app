import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useApp } from './context'
import { Layout } from './components'
import { Splash, Carousel, ZooSelector, AccountCreation, ProfileSetup } from './onboarding'
import { Home } from './home'
import { MapTab } from './map'
import { ScanTab } from './scan'
import { PlanTab, PlanBuilder, ItineraryResult, CuratedPlanDetail } from './plan'
import { ProfileTab, Wallet, PastVisits, FamilyScreen, SavedAnimals, Passport, AIInterests, Adoptions, Settings } from './profile'
import { BookingSummary, PaymentScreen, Confirmation } from './payment'

export default function App() {
  const { onboarded } = useApp()

  if (!onboarded) {
    return (
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/zoo-select" element={<ZooSelector />} />
          <Route path="/account" element={<AccountCreation />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    )
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<MapTab />} />
          <Route path="/scan" element={<ScanTab />} />
          <Route path="/plan" element={<PlanTab />} />
          <Route path="/plan/builder" element={<PlanBuilder />} />
          <Route path="/plan/itinerary" element={<ItineraryResult />} />
          <Route path="/plan/curated/:id" element={<CuratedPlanDetail />} />
          <Route path="/profile" element={<ProfileTab />} />
          <Route path="/profile/wallet" element={<Wallet />} />
          <Route path="/profile/visits" element={<PastVisits />} />
          <Route path="/profile/family" element={<FamilyScreen />} />
          <Route path="/profile/animals" element={<SavedAnimals />} />
          <Route path="/profile/passport" element={<Passport />} />
          <Route path="/profile/ai" element={<AIInterests />} />
          <Route path="/profile/adoptions" element={<Adoptions />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/payment" element={<BookingSummary />} />
          <Route path="/payment/pay" element={<PaymentScreen />} />
          <Route path="/payment/confirm" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useApp } from './context'
import { Layout } from './components'
import { Splash, Carousel, ZooSelector, AccountCreation, ProfileSetup } from './onboarding'
import { Home } from './home'
import { MapTab } from './map'
import { ScanTab } from './scan'
import { PlanTab, PlanBuilder, ItineraryResult, CuratedPlanDetail } from './plan'
import { ProfileTab, Wallet, PastVisits, FamilyScreen, SavedAnimals, Passport, AIInterests, Adoptions, Settings, VisitRecap, ShareableCard } from './profile'
import { BookingSummary, PaymentScreen, Confirmation } from './payment'

// Discover feature (lazy loaded)
const DiscoverHome = lazy(() => import('./features/discover/DiscoverHome'))
const ZoneDetail = lazy(() => import('./features/discover/ZoneDetail'))
const SpeciesBrowser = lazy(() => import('./features/discover/SpeciesBrowser'))
const AnimalDetail = lazy(() => import('./features/discover/AnimalDetail'))

// Animal Guide feature (lazy loaded)
const AnimalGuideHome = lazy(() => import('./features/animal-guide/AnimalGuideHome'))
const CategoryListing = lazy(() => import('./features/animal-guide/CategoryListing'))
const AnimalBanner = lazy(() => import('./features/animal-guide/AnimalBanner'))

// Tickets feature (lazy loaded)
const TicketTypes = lazy(() => import('./features/tickets/TicketTypes'))
const PremierAccess = lazy(() => import('./features/tickets/PremierAccess'))
const TicketSelection = lazy(() => import('./features/tickets/TicketSelection'))
const TicketReview = lazy(() => import('./features/tickets/TicketReview'))
const TicketPayment = lazy(() => import('./features/tickets/TicketPayment'))
const AddCard = lazy(() => import('./features/tickets/AddCard'))
const BankSelection = lazy(() => import('./features/tickets/BankSelection'))
const TicketConfirmation = lazy(() => import('./features/tickets/TicketConfirmation'))

// Shops feature (lazy loaded)
const ShopListing = lazy(() => import('./features/shops/ShopListing'))
const ShopDetail = lazy(() => import('./features/shops/ShopDetail'))

// Events feature (lazy loaded)
const EventsListing = lazy(() => import('./features/events/EventsListing'))
const EventFilter = lazy(() => import('./features/events/EventFilter'))
const EventDetail = lazy(() => import('./features/events/EventDetail'))
const EventSearch = lazy(() => import('./features/events/EventSearch'))
const MyEvents = lazy(() => import('./features/events/MyEvents'))
const EventCalendar = lazy(() => import('./features/events/EventCalendar'))

// Dining feature (lazy loaded)
const DiningHome = lazy(() => import('./features/dining/DiningHome'))
const CuisineListing = lazy(() => import('./features/dining/CuisineListing'))
const RestaurantDetail = lazy(() => import('./features/dining/RestaurantDetail'))
const ReservationFlow = lazy(() => import('./features/dining/ReservationFlow'))

// Transport feature (lazy loaded)
const TransportHome = lazy(() => import('./features/transport/TransportHome'))

// Itinerary feature (lazy loaded)
const PreferenceWizard = lazy(() => import('./features/itinerary/PreferenceWizard'))
const ItineraryTimeline = lazy(() => import('./features/itinerary/ItineraryTimeline'))
const LiveTourGuide = lazy(() => import('./features/itinerary/LiveTourGuide'))
const TourComplete = lazy(() => import('./features/itinerary/TourComplete'))

// Learning feature (lazy loaded)
const LearningHub = lazy(() => import('./features/learning/LearningHub'))
const VolunteerApplication = lazy(() => import('./features/learning/VolunteerApplication'))
const EducationalTalks = lazy(() => import('./features/learning/EducationalTalks'))

// Kids feature (lazy loaded)
const KidsLanding = lazy(() => import('./features/kids/KidsLanding'))
const KidsPurchase = lazy(() => import('./features/kids/KidsPurchase'))
const KidsWorksheets = lazy(() => import('./features/kids/KidsWorksheets'))
const KidsGames = lazy(() => import('./features/kids/KidsGames'))
const KidsStoryTime = lazy(() => import('./features/kids/KidsStoryTime'))
const KidsBadges = lazy(() => import('./features/kids/KidsBadges'))
const KidsActivity = lazy(() => import('./features/kids/KidsActivity'))

// Notifications feature (lazy loaded)
const NotificationDemo = lazy(() => import('./features/notifications/NotificationDemo'))

// Services feature (lazy loaded)
const ServicesHub = lazy(() => import('./features/services/ServicesHub'))

function LazyFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--green-rich)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )
}

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
          <Route path="/profile/visits/:id" element={<VisitRecap />} />
          <Route path="/profile/visits/:id/share" element={<ShareableCard />} />
          <Route path="/profile/family" element={<FamilyScreen />} />
          <Route path="/profile/animals" element={<SavedAnimals />} />
          <Route path="/profile/passport" element={<Passport />} />
          <Route path="/profile/ai" element={<AIInterests />} />
          <Route path="/profile/adoptions" element={<Adoptions />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/payment" element={<BookingSummary />} />
          <Route path="/payment/pay" element={<PaymentScreen />} />
          <Route path="/payment/confirm" element={<Confirmation />} />
          {/* Discover */}
          <Route path="/discover" element={<Suspense fallback={<LazyFallback />}><DiscoverHome /></Suspense>} />
          <Route path="/discover/zone/:id" element={<Suspense fallback={<LazyFallback />}><ZoneDetail /></Suspense>} />
          <Route path="/discover/species" element={<Suspense fallback={<LazyFallback />}><SpeciesBrowser /></Suspense>} />
          <Route path="/discover/animal/:id" element={<Suspense fallback={<LazyFallback />}><AnimalDetail /></Suspense>} />
          {/* Animal Guide */}
          <Route path="/animals" element={<Suspense fallback={<LazyFallback />}><AnimalGuideHome /></Suspense>} />
          <Route path="/animals/category/:category" element={<Suspense fallback={<LazyFallback />}><CategoryListing /></Suspense>} />
          <Route path="/animals/banner" element={<Suspense fallback={<LazyFallback />}><AnimalBanner /></Suspense>} />
          {/* Tickets */}
          <Route path="/tickets" element={<Suspense fallback={<LazyFallback />}><TicketTypes /></Suspense>} />
          <Route path="/tickets/premier" element={<Suspense fallback={<LazyFallback />}><PremierAccess /></Suspense>} />
          <Route path="/tickets/select" element={<Suspense fallback={<LazyFallback />}><TicketSelection /></Suspense>} />
          <Route path="/tickets/review" element={<Suspense fallback={<LazyFallback />}><TicketReview /></Suspense>} />
          <Route path="/tickets/payment" element={<Suspense fallback={<LazyFallback />}><TicketPayment /></Suspense>} />
          <Route path="/tickets/add-card" element={<Suspense fallback={<LazyFallback />}><AddCard /></Suspense>} />
          <Route path="/tickets/bank-select" element={<Suspense fallback={<LazyFallback />}><BankSelection /></Suspense>} />
          <Route path="/tickets/confirmation" element={<Suspense fallback={<LazyFallback />}><TicketConfirmation /></Suspense>} />
          {/* Shops */}
          <Route path="/shops" element={<Suspense fallback={<LazyFallback />}><ShopListing /></Suspense>} />
          <Route path="/shops/:id" element={<Suspense fallback={<LazyFallback />}><ShopDetail /></Suspense>} />
          {/* Events */}
          <Route path="/events" element={<Suspense fallback={<LazyFallback />}><EventsListing /></Suspense>} />
          <Route path="/events/filter" element={<Suspense fallback={<LazyFallback />}><EventFilter /></Suspense>} />
          <Route path="/events/search" element={<Suspense fallback={<LazyFallback />}><EventSearch /></Suspense>} />
          <Route path="/events/my-events" element={<Suspense fallback={<LazyFallback />}><MyEvents /></Suspense>} />
          <Route path="/events/calendar" element={<Suspense fallback={<LazyFallback />}><EventCalendar /></Suspense>} />
          <Route path="/events/:id" element={<Suspense fallback={<LazyFallback />}><EventDetail /></Suspense>} />
          {/* Dining */}
          <Route path="/dining" element={<Suspense fallback={<LazyFallback />}><DiningHome /></Suspense>} />
          <Route path="/dining/cuisine/:type" element={<Suspense fallback={<LazyFallback />}><CuisineListing /></Suspense>} />
          <Route path="/dining/restaurant/:id" element={<Suspense fallback={<LazyFallback />}><RestaurantDetail /></Suspense>} />
          <Route path="/dining/reserve/:id" element={<Suspense fallback={<LazyFallback />}><ReservationFlow /></Suspense>} />
          {/* Itinerary */}
          <Route path="/itinerary/preferences" element={<Suspense fallback={<LazyFallback />}><PreferenceWizard /></Suspense>} />
          <Route path="/itinerary/timeline" element={<Suspense fallback={<LazyFallback />}><ItineraryTimeline /></Suspense>} />
          <Route path="/itinerary/live-tour" element={<Suspense fallback={<LazyFallback />}><LiveTourGuide /></Suspense>} />
          <Route path="/itinerary/tour-complete" element={<Suspense fallback={<LazyFallback />}><TourComplete /></Suspense>} />
          {/* Transport */}
          <Route path="/transport" element={<Suspense fallback={<LazyFallback />}><TransportHome /></Suspense>} />
          {/* Learning */}
          <Route path="/learning" element={<Suspense fallback={<LazyFallback />}><LearningHub /></Suspense>} />
          <Route path="/learning/volunteer" element={<Suspense fallback={<LazyFallback />}><VolunteerApplication /></Suspense>} />
          <Route path="/learning/talks" element={<Suspense fallback={<LazyFallback />}><EducationalTalks /></Suspense>} />
          {/* Kids */}
          <Route path="/kids" element={<Suspense fallback={<LazyFallback />}><KidsLanding /></Suspense>} />
          <Route path="/kids/purchase" element={<Suspense fallback={<LazyFallback />}><KidsPurchase /></Suspense>} />
          <Route path="/kids/worksheets" element={<Suspense fallback={<LazyFallback />}><KidsWorksheets /></Suspense>} />
          <Route path="/kids/games" element={<Suspense fallback={<LazyFallback />}><KidsGames /></Suspense>} />
          <Route path="/kids/stories" element={<Suspense fallback={<LazyFallback />}><KidsStoryTime /></Suspense>} />
          <Route path="/kids/badges" element={<Suspense fallback={<LazyFallback />}><KidsBadges /></Suspense>} />
          <Route path="/kids/activity" element={<Suspense fallback={<LazyFallback />}><KidsActivity /></Suspense>} />
          {/* Notifications */}
          <Route path="/notifications" element={<Suspense fallback={<LazyFallback />}><NotificationDemo /></Suspense>} />
          {/* Services */}
          <Route path="/services" element={<Suspense fallback={<LazyFallback />}><ServicesHub /></Suspense>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

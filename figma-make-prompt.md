# Figma Make Prompt — Zoo AI App (Full Screen Set)

## App Overview

Design a complete mobile app called **"Zoo AI"** — an AI-powered zoo experience platform for San Diego Zoo. The app guides visitors through discovery, planning, in-park navigation, and post-visit memories. Design for iPhone 15 Pro (430 x 932px).

## Design System: "Wilderness Luxe"

### Typography
- **Display font**: Fraunces (serif) — headings, hero text, stats
- **Body font**: DM Sans (sans-serif) — all body text, buttons, labels

### Type Scale
- Display XL: 32px / 700 / -0.02em tracking
- Display LG: 26px / 700 / -0.01em
- Display MD: 22px / 600
- Display SM: 18px / 600
- Heading: 17px / 600 (DM Sans)
- Body: 15px / regular / 1.5 line-height
- Body SM: 13px / regular / 1.45
- Caption: 12px / regular / 0.01em
- Label: 11px / 600 / uppercase / 0.08em tracking

### Color Palette

**Backgrounds**: Cream #F5F5F0 (primary), White #FFFFFF (cards), #0D1A0D (dark), #EEEFE9 (secondary), #e8e2da (placeholder/skeleton)

**Text**: #1A1A1A (primary), #5A6B5A (secondary), #8A9B8A (tertiary), #F5F5F0 (inverse on dark)

**Emerald Green** (primary brand):
- Deep #1A3D1F (buttons, dark UI)
- Rich #2E6B34 (primary actions)
- Mid #4CAF50
- Sage #7BC67F
- Light #C5E8C8
- Pale #E8F5E9
- Active #22C55E (success states)

**Gold** (accent): #C5D63A (primary), #EAF0B0 (light), #F5F8E0 (pale), #a67c00 (dark)

**Coral** (accent): #E868A0 (primary), #F0C0D8 (light), #FBE4EF (pale)

**Amber** (accent): #E88030 (primary), #F0C8B0 (light), #FDF0E6 (pale)

**Sky** (secondary): #4A90D9 (primary), #A3C8F0 (light), #E8F1FB (pale)

### Spacing
4px / 8px / 12px / 16px / 24px / 32px / 48px

### Border Radius
8px (sm) / 12px (md) / 16px (lg) / 24px (xl) / 9999px (pill)

### Shadows
- SM: 0 1px 3px rgba(13,26,13,0.06)
- MD: 0 4px 16px rgba(13,26,13,0.10)
- LG: 0 8px 32px rgba(13,26,13,0.14)

### Borders
- Medium: #D8E0D8
- Light: #E8F0E8

---

## Shared Components (use consistently across all screens)

### Bottom Navigation Bar
5 tabs: Home (house icon), Map (map icon), Scan (QR icon, raised/elevated center button with green gradient), Plan (calendar icon), Profile (user icon). Active state: green-rich with label. Inactive: text-tertiary. Height: 72px with safe area padding. White background, top border.

### Floating AI Assistant
Circular button (52px) in bottom-right corner above nav bar. Green gradient background with sparkle icon. When open: expandable chat panel with message bubbles, suggestion chips that change based on current screen context. Subtle glow animation.

### Audio Mini Player
Floating bar above bottom nav when audio is playing. Shows: play/pause button, track title, waveform visualization, expand arrow. Green accent bar on left. Tapping expands to full-screen audio player.

### Back Header
Left-aligned back chevron + centered title text. 56px height. Used on all sub-screens.

### Cards
- Standard: White, 16px radius, 24px padding, light border, small shadow
- Elevated: No border, medium shadow
- Dark: Dark green background, cream text
- Gradient: Linear gradient from green-deep through green-rich to green-mid, white text
- Gold: Gold gradient, white text

### Buttons
- Primary: Green-deep background, white text, pill shape
- Secondary: White background, dark text, border
- Gold: Gold gradient, white text
- Coral: Coral background, white text
- Ghost: Transparent, green-rich text
- All buttons: 600 weight, centered, flex with icon support

### Chips/Tags
Pill-shaped, 8px 16px padding. Default: white bg with border. Active: green-deep bg, white text. Gold: gold-pale bg.

### Badges
Small pill labels. Variants: Live (coral), Active (green-light bg), Warning (amber-light), Quiet (sky-pale), Gold (gold-pale).

### Status Dots
Small colored circles: Active (green), Feeding (amber), Sleeping (sky), Quiet (text-tertiary).

---

## SCREENS TO DESIGN

---

### 1. ONBOARDING FLOW (5 screens)

**1.1 Splash Screen**
Full-screen green gradient (deep → rich). Large centered zoo logo/icon. App name "Zoo AI" in Fraunces display XL. Tagline "Your AI-powered zoo companion" in DM Sans. Subtle breathing animation on logo.

**1.2 Onboarding Carousel**
3-4 swipeable cards. Each card: large illustration area (top 60%), title in Fraunces display LG, description in body text, dot indicators at bottom. Cards cover: AI Guide, Smart Planning, Interactive Map, Memories. "Get Started" button on last card. "Skip" text button top-right.

**1.3 Zoo Selector**
Search bar at top. List of zoo cards with thumbnail image, zoo name, city, distance. "San Diego Zoo" pre-selected with green checkmark. Continue button at bottom.

**1.4 Account Creation**
Clean form: Name field, Email field, Password field with show/hide toggle. Social login buttons (Apple, Google). Terms checkbox. "Create Account" primary button. "Already have an account?" link.

**1.5 Profile Setup**
Avatar emoji selector (grid of animal emojis). Name field. Interest tags (multi-select chips): Big Cats, Elephants, Marine Life, Birds, Reptiles, Conservation, Photography. Accessibility options checkboxes. "Start Exploring" gold button.

---

### 2. HOME TAB (4 states)

**2.1 Home — Discovery State**
- Header: "San Diego Zoo" with location pin, notification bell
- Hero card: Gradient card with "Plan your perfect visit" + sparkle icon + CTA button
- Section: "Popular Animals" — horizontal scroll of animal cards (emoji, name, status dot)
- Section: "Upcoming Events" — event cards with date badge, title, location
- Section: "Explore Zones" — 2-column grid of zone cards with emoji + name
- Section: "Zoo News" — news article cards with thumbnail

**2.2 Home — Pre-Visit State**
- Countdown badge: "5 days until your visit!"
- Trip summary card: Date, group size, ticket info
- Pre-visit checklist: Checkboxes for sunscreen, water bottle, comfortable shoes, camera
- Anticipation Engine: Horizontal scroll of 3 cards:
  - Day 5: "Animal Preview" with featured animal
  - Day 4: "Scavenger Challenge" with activity teaser
  - Day 3: "Kid Fun Fact" with fun fact
- Comfort Assurance block: 5 rows with icons — Entry (QR ready), Parking (reserved), Weather (sunny), Equipment (stroller), Crowds (moderate). Each row: icon + label + status + chevron
- Arrival plan card: Map preview, suggested arrival time

**2.3 Home — In-Park State**
- Live itinerary mini card: Current stop highlighted, next stop preview
- Family tracker bar: Avatar bubbles for family members with location labels
- "Happening Now" section: Live event/feeding cards with countdown timers
- AI Insight card: Contextual tip (e.g., "Baby elephant playing in water!")
- Energy Check-In: "How's everyone doing?" with 3 response buttons (Great/Tired/Need a Break). Each response shows different follow-up:
  - Great: "Keep exploring!" encouragement
  - Tired: Adjusted plan card (dropped stops, added rest, moved lunch earlier)
  - Break: Nearest quiet spot finder with distance and navigate button
- Progress section: Stops completed/remaining progress bar, distance walked, time remaining
- Next Move suggestion: Card with "Elephant Odyssey" + AI reasoning + "Head There" button
- Exit Timing card: Stats dashboard — Stops left, Time remaining, Completion percentage

**2.4 Home — Post-Visit State**
- Visit recap hero: Date, animals seen, distance, stamps collected
- "Your Star Connection" card: Featured animal with AI-generated story
- Adoption updates: Cards for adopted animals with news
- "What You Missed" section: Animals/exhibits not visited with "Plan for next time" button
- Return hook: "Your next adventure" card with discount offer
- Latest zoo news section

---

### 3. MAP TAB (multiple layers/modes)

**3.1 Map — Default View**
- Full-screen illustrated map (stylized, not Google Maps — hand-drawn feel with green terrain, paths, water features)
- Animal pins: Circular white pins with animal emoji, drop shadow. Scattered across map zones.
- Visited pins: Green ring around visited exhibits
- Zone labels: Uppercase, small, rotated slightly, 40% opacity (Africa Rocks, Lost Forest, Elephant Odyssey, etc.)
- User location: Blue pulsing dot with ring
- Top: Search bar (white pill, search icon, "Search animals, places...")
- Right controls: Vertical stack of circle buttons — Crowd Forecast, Layers, My Location
- Bottom: Draggable sheet with animal list (emoji, name, zone, distance, status dot)

**3.2 Map — Right Now Layer**
Active pins pulse/glow. Feeding time pins show amber badge. Active animals are larger (52px vs 44px). Status info overlaid.

**3.3 Map — My Plan Layer**
Only planned stops shown (others dimmed to 25% opacity). Numbered sequence badges on each pin (1, 2, 3...). Route line connecting stops.

**3.4 Map — Comfort Layer**
Facility pins instead of animals: Restroom 🚻, Food Court 🍔, ATM 💳, Shop 🛍️, First Aid ⛑️, Water Fountain 💧, Shade Area 🌳, Charging ⚡. Larger square pins with rounded corners.

**3.5 Map — Family Layer**
Family member avatars on map with name labels below. "You + Kids" at your location, "Jordan" at partner's location.

**3.6 Map — Wander Mode**
Single glowing pin with golden pulse animation. Dashed path from user to target. Discovery card at bottom: animal emoji, name, AI fun fact, "I'm Here!" button, skip button. Celebration overlay when exhibit visited (confetti, stamp earned).

**3.7 Map — Crowd Forecast Sheet**
Bottom sheet with: Hourly bar chart (color-coded green/amber/red for crowd levels), zone-by-zone breakdown with crowd dots, AI suggestion text ("Best time to visit Penguin Beach: 2-3 PM").

**3.8 Map — Exhibit Detail Sheet**
Bottom sheet: Hero image area, animal name + individual name, status chips (Active, Feeding Soon), memory pin data if visited (time spent, visited at), AI insight quote, 4 action buttons in row (Audio Guide, Navigate, Add to Plan, Save/Bookmark), conservation status info.

**3.9 Map — Sensory Mode Overlay**
When sensory sensitivity is on: Noise indicator badges on each pin (🤫 quiet in green, moderate in amber, 🔊 loud in red). Quiet Route Alert banner at bottom: Green gradient banner with 🤫 emoji, "Quiet Route Available" title, suggestion text.

**3.10 Map — Search Overlay**
Full-screen overlay: Search input focused, recent searches, suggested queries ("Nearest restroom", "Feeding times", "Quiet areas"), category quick filters.

---

### 4. SCAN TAB (3 modes + results)

**4.1 Scan — QR Code Mode**
Camera viewfinder with dark overlay. Central scan frame with animated corner brackets (green). Scan line animation sweeping down. Mode switcher at top: QR Code | AI Identify | Smart Photo (pill tabs). Flash toggle and gallery button. Helper text: "Point at any zoo QR code".

**4.2 Scan — AI Identify Mode**
Camera viewfinder. Rotating dashed circle frame in center. Magnifying glass icon. Pulsing green glow. Text: "Point camera at any animal". Confidence indicator when detecting.

**4.3 Scan — Smart Photo Mode**
Camera viewfinder with rule-of-thirds grid lines. Photo capture button (large circle). "AI will enhance your photo" text. Gallery preview in corner.

**4.4 Scan — Animal QR Result**
- Green check-in banner at top: "✓ Checked in at [Animal Name]!" with stamp earned toast
- Large animal photo/illustration area
- Animal name (Fraunces display) + individual name + species
- AI Insight card: Personalized fact in green-pale background
- 4 action buttons in row: 🎧 Audio Guide, 📸 Smart Photo, ❤️ Save, 📤 Share
- "Explore Next" card: AI-suggested next stop with distance + walk time
- Feedback link: "Was this helpful?"

**4.5 Scan — Location Check-In Result**
- Animated stamp earned celebration (stamp icon scales in with rotation)
- Zone name + zone emoji header
- Stamp progress bar: "3 of 6 stamps in Africa Rocks"
- Zone highlights card: 3-4 nearby attractions with status
- Crowd level alert: Current crowd status for this zone
- Action buttons: "View on Map" + "My Stamps"
- Feedback section

**4.6 Scan — Experience QR Result**
- Experience type badge at top (Show/Feeding/Educational/Playground/Gift Shop) with unique color per type
- Experience name in display font
- AI Tip card: Contextual suggestion (e.g., "Arrive 10 min early for front seats")
- Time/status info: Start time, duration, capacity
- Action buttons: Add to Plan, Set Reminder, Share
- Feedback section

**4.7 Scan — AI Identify Result**
Slide-up card over camera: Match confidence percentage, animal emoji + name + individual name, quick fact, "🎧 Listen to Audio Guide" button, "Learn More" link.

---

### 5. PLAN TAB

**5.1 Plan Landing**
- Hero card: Green gradient, "Create Your Perfect Day" title, sparkle icon, "AI builds a custom itinerary in seconds", "Start Planning" button
- Wander Mode section: "Prefer to explore freely?" with two style buttons: "Relaxed" (leaf icon) and "Adventurous" (compass icon)
- Section: "Popular Plans" — horizontal scroll of curated plan cards (icon, title, duration, rating stars)
- Section: "Your Past Plans" — cards with date, stops count, "Rebook" and "View Recap" buttons
- Section: "Active Challenges" — challenge cards with progress bars (scan/photo/quiz types)

**5.2 Plan Builder — Step 1: When**
- Step indicator: "Step 1 of 5" with progress bar
- "When are you visiting?" heading (Fraunces)
- Quick-select date buttons: Today, Tomorrow, This Weekend, Next Week (chip style)
- Calendar date picker below
- AI tip card: "Tuesdays are typically less crowded"
- Next button

**5.3 Plan Builder — Step 2: Who**
- "Who's coming?" heading
- Group type selector: 4 large cards — Solo (1 person icon), Couple (2 people), Family (family icon), Group (group icon). Selected state: green border + green-pale bg + checkmark
- Family size controls: Adult/Child/Infant counters with +/- buttons
- Next/Back buttons

**5.4 Plan Builder — Step 3: Equipment**
- "Need any equipment?" heading
- Equipment cards: Stroller 🧸 ($12), Wheelchair ♿ ($8), Wagon 🛒 ($15), Cooler 🧊 ($5), Umbrella ☂️ ($3). Each with emoji, name, price, quantity +/- selector
- "Skip" option
- Next/Back buttons

**5.5 Plan Builder — Step 4: Preferences**
- "Your preferences" heading
- Duration section: 3 chips — "Half Day (3-4h)", "Full Day (6-8h)", "Quick Visit (2-3h)"
- Pace section: 3 chips — "Relaxed" (leaf), "Balanced" (scale), "Packed" (zap)
- Next/Back buttons

**5.6 Plan Builder — Step 5: Must-See**
- "Must-see exhibits" heading
- 3x3 grid of animal cards: Each card shows emoji (large), name below. Selected: green border, green-pale bg, green checkmark circle in top-right
- "Generate My Plan" gold button with sparkle icon

**5.7 Plan Builder — Generating Screen**
Full-screen green gradient. Centered: rotating map icon, "Crafting your perfect day..." text that cycles through messages ("Analyzing crowd patterns...", "Optimizing your route...", "Adding AI insights..."). Loading dots animation.

**5.8 Plan — Itinerary Result**
- Header: Date, group type, stops count, duration, distance
- Mini map: Small illustrated map with emoji pins and route line
- Timeline: Vertical line with numbered stops. Each stop: time, emoji circle, name, duration badge, AI insight text. Connector lines between stops.
- Add-Ons section: Cards for Preferred Parking ($15), Guided Tour ($25), Family Meal Deal ($68, "Save 20%" badge), Photo Pass ($30). Each with emoji, name, description, price, checkbox
- Promo code input field
- Booking Summary: Line items, subtotal, tax, total
- "Purchase & Confirm Plan" primary button + "Share Plan" and "Save for Later" ghost buttons

**5.9 Plan — Curated Plan Detail**
- Hero: Full-width gradient header with plan icon (large emoji)
- Title (Fraunces display), star rating, visitor count
- Description paragraph
- Stats row: 3 cards — Exhibits count, Duration, Distance
- Tags: Chip row (Family Friendly, Popular, Includes Shows)
- "Use This Plan" primary button + "Customize First" secondary button

---

### 6. PROFILE TAB

**6.1 Profile Main**
- Avatar section: Large emoji avatar (e.g., 🦁) in circle with green gradient border. Name below. "San Diego Zoo · Member since Jan 2025"
- Quick stats: 3 cards in row — "3 Visits", "47 Animals", "14.2 mi"
- Menu list (icon + label + badge + chevron per row):
  - 💳 Wallet — "2 Active Tickets"
  - 🕐 Past Visits — "3 visits"
  - 👥 My Family — "3 members"
  - ❤️ Saved Animals — "2 saved"
  - 🏅 Stamps & Badges — dynamic count
  - 🧠 AI Interests
  - 🎁 My Adoptions
- Settings section (smaller rows):
  - ⚙️ Settings
  - 🔔 Notifications
  - 🌐 Language
  - ♿ Accessibility
  - ❓ Help & Support
- "Log Out" button at bottom
- "Reset Demo" ghost button

**6.2 Profile — Wallet**
- Active tickets section: Ticket cards with QR code preview, event name, date, "View QR" button
- Payment methods: Card list with card type icon, last 4 digits, expiry
- "Add Payment Method" button

**6.3 Profile — Past Visits**
- Visit cards: Each shows date, animal count, distance, stamp count
- Gradient background per card
- "View Recap" and "Plan Similar" buttons per card
- Tappable to open full visit recap

**6.4 Profile — My Family**
- Family member cards: Name, age, relationship badge
- Each member: Avatar emoji, name (Fraunces), age, relationship chip
- "Add Family Member" button
- "Edit" option per member

**6.5 Profile — Saved Animals**
- Grid of saved animal cards: Large emoji, name, species, zone
- Heart icon (filled) for unsaving
- "View Details" on each card
- Empty state if no saves: Illustration + "Start exploring to save your favorites"

**6.6 Profile — Stamps & Badges (Passport)**
- Hero: Green gradient card with stamp icon, "X / 42 stamps collected" (Fraunces display), progress bar with gold fill
- Zone Progress: Cards per zone showing zone name + earned/total + segmented progress bar (green filled segments)
- Badges Earned: Cards with badge emoji, name, description, earned date. Unearned badges shown grayed out with lock icon.

**6.7 Profile — AI Interests**
- Interest tags grid: All available interests as chips. Selected ones have green-deep bg. Tap to toggle.
- "Your AI learns from these preferences to give better recommendations"
- Recommendation preview: Sample AI suggestions based on current interests

**6.8 Profile — My Adoptions**
- Adoption cards: Animal photo/emoji, name, adoption tier, date adopted
- Status updates per animal
- "Adopt Another Animal" CTA card

**6.9 Profile — Settings**
- Toggle rows:
  - Sensory Sensitivity Mode (with description: "Shows noise levels on map, suggests quiet routes, reduces animations")
  - Simplified Interface Mode (with description: "Larger text and touch targets for easier navigation")
  - Audio Auto-Play toggle
  - Dark Mode toggle (disabled/coming soon)
- Audio Depth selector: Quick / Standard / Deep (3 chips)
- Active Modes summary card when accessibility modes are on
- Account section: Edit Profile, Change Password, Delete Account

**6.10 Profile — Visit Recap**
- Hero stats: Green gradient header with date, 4 stat cards (Animals, Distance, Time, Stamps)
- AI Summary card: "Your visit story" — AI-generated narrative paragraph in green-pale card
- Journey Timeline: Vertical timeline with 11 stops. Each stop: time, colored dot (type-coded: exhibit green, food amber, show coral, rest sky, shop gold), name, duration. Connected by vertical line.
- Animals Encountered: 3x2 grid of animal cards with emoji + name
- Photo Memories: Horizontal scroll of photo cards with captions
- Stamps Earned: Row of stamp icons with spring animation feel (gold-pale bg, gold border)
- Action buttons: "Share Visit" and "Plan Similar Trip"

**6.11 Profile — Shareable Visit Card**
- Card preview area (centered): 3 style options:
  - Classic: Green gradient background, white text, stats overlay
  - Minimal: White background, clean typography, subtle border
  - Photo: Gold gradient, bold stats, decorative elements
- Style selector: 3 chip buttons below preview
- "Share Card" primary button + "Download" secondary button
- Social platform chips: Instagram, Twitter, Facebook, WhatsApp

---

### 7. DISCOVER FEATURE (4 screens)

**7.1 Discover Home**
- Search bar at top
- Featured zone: Large card with zone image, name, animal count
- "Browse by Zone" section: Horizontal scroll of zone cards (colored gradient, emoji, name)
- "Species Browser" CTA card with animal emojis
- "Trending Now" section: Popular animal cards

**7.2 Zone Detail**
- Hero: Zone gradient header with zone name, description, animal count
- Activities grid: 3-column grid of activity cards (icon + label)
- "Animals in this Zone": Scrollable animal cards with emoji, name, status
- Map preview: Small map showing zone highlighted
- "Plan a Visit to This Zone" button

**7.3 Species Browser**
- Filter bar: Category chips (Mammals, Birds, Reptiles, Marine, Insects)
- Search input
- Animal grid: Cards with emoji, common name, scientific name, conservation status badge
- Sort options: A-Z, Most Popular, Endangered First

**7.4 Animal Detail**
- Hero: Large animal illustration/photo area
- Name (Fraunces display) + individual name + species
- Status row: Status dot + status text + location
- Quick stats: 3 cards (Weight, Lifespan, Conservation Status)
- "About" section: Description paragraph
- Fun facts: Numbered list with icons
- "Audio Guide" button + "Add to Plan" button
- Conservation info card: Status, threats, zoo conservation efforts
- "Related Animals" horizontal scroll

---

### 8. ANIMAL GUIDE (3 screens)

**8.1 Animal Guide Home**
- Header: "Animal Guide" with search icon
- Category grid: Large cards with category emoji, name, animal count. Categories: Big Cats, Primates, Birds, Marine Life, Reptiles, Insects, Elephants, Bears

**8.2 Category Listing**
- Back header with category name
- Filter chips: All, Active Now, Endangered, Family Favorites
- Animal list: Cards with emoji, name, brief description, status dot, zone badge

**8.3 Animal Banner**
- Full-width featured animal hero: Large emoji/illustration
- "Animal of the Day" badge
- Name, fun fact, audio guide CTA
- "Did you know?" expandable section

---

### 9. TICKETS & PAYMENT (8 screens)

**9.1 Ticket Types**
- Header: "Tickets & Passes"
- Ticket type cards: Standard, Family Pack, Annual Pass, Premier Access. Each card: Icon, title, price range, key benefits list, "Select" button. Premier has gold accent.

**9.2 Premier Access**
- Gold gradient hero: Crown icon, "Premier Access" title
- Benefits list with checkmark icons
- Comparison table: Standard vs Premier
- Pricing card
- "Upgrade to Premier" gold button

**9.3 Ticket Selection**
- Selected ticket type badge
- Date picker
- Visitor count: Adults, Children (3-11), Infants (0-2) with +/- controls
- Add-on options: Parking, Meal Deal, Photo Pass (checkboxes with prices)
- Price summary updating live
- "Continue to Review" button

**9.4 Ticket Review**
- Order summary card: Ticket type, date, visitors, add-ons
- Line items with prices
- Subtotal, tax, total
- Promo code input
- "Proceed to Payment" button

**9.5 Payment Method**
- Saved cards section (if any)
- Payment options: Credit/Debit Card, Apple Pay, Google Pay, Bank Transfer
- Each option: Icon + label + chevron
- "Add New Card" option

**9.6 Add Card**
- Card number input with card type detection icon
- Expiry date input (MM/YY)
- CVV input
- Cardholder name input
- "Save card for future purchases" checkbox
- "Add Card" button
- Security assurance text with lock icon

**9.7 Bank Selection**
- Bank/gateway list: Major banks with logos
- Search bar to filter
- "Other Bank" option
- "Continue" button

**9.8 Ticket Confirmation**
- Success animation: Large green checkmark with confetti
- "Booking Confirmed!" (Fraunces display)
- Booking reference number
- QR code preview (for entry)
- Summary: Date, visitors, ticket type
- "Add to Calendar" button + "Share Booking" button
- "Return to Home" button

---

### 10. SHOPS (2 screens)

**10.1 Shop Listing**
- Header: "Zoo Shop"
- Category chips: All, Apparel, Toys, Souvenirs, Books, Conservation
- Shop cards: Grid layout. Each: shop image placeholder, name, category badge, location
- Featured items section

**10.2 Shop Detail**
- Shop name header + location
- Product grid: Cards with product image placeholder, name, price, "Add to Cart" button
- Shop info: Hours, location on map
- "Visit Shop" navigation button

---

### 11. EVENTS (6 screens)

**11.1 Events Listing**
- "Events & Shows" header
- Featured event: Large hero card with gradient, event name, date, time
- "Today's Events" section: Timeline-style cards with time, event name, location, category badge
- "Upcoming" section: Event cards with date badge

**11.2 Event Filter**
- Filter categories: Date range picker, Event Type (Shows, Feeding, Educational, Special), Time of Day (Morning, Afternoon, Evening), Location/Zone
- "Apply Filters" button + "Clear All" link
- Results count preview

**11.3 Event Search**
- Search input (auto-focused)
- Recent searches
- Search results: Event cards with relevance highlighting
- "No results" empty state

**11.4 My Events**
- Tabs: Upcoming | Past
- Registered event cards with countdown timer, event details, "Cancel Registration" option
- Bookmarked events section
- Empty state: "Browse events to build your schedule"

**11.5 Event Calendar**
- Month calendar view: Days with colored dots indicating events (green for shows, amber for feeding, coral for special)
- Selected day: Expanded list of events below calendar
- Month navigation arrows

**11.6 Event Detail**
- Hero: Event image/gradient with event type badge
- Title (Fraunces display), date, time, duration
- Location with "View on Map" link
- Description paragraph
- "What to Expect" section
- Capacity indicator: "12 spots remaining"
- "Register" primary button + "Add to Calendar" + "Share"
- Related events section

---

### 12. DINING (4 screens)

**12.1 Dining Home**
- "Eat & Drink" header
- Featured restaurant: Large card with cuisine type, name, rating, price range
- "Browse by Cuisine": Horizontal scroll — American, Asian, Mexican, Desserts, Healthy, Kids Menu
- "Near You" section: Restaurant cards with distance, wait time, rating
- "Open Now" filter toggle

**12.2 Cuisine Listing**
- Cuisine name header with emoji
- Restaurant cards: Name, cuisine tags, price range ($ to $$$), rating stars, distance, wait time estimate
- Sort: Nearest, Rating, Price
- Filter: Open Now, No Wait, Kid-Friendly

**12.3 Restaurant Detail**
- Hero area with restaurant image placeholder
- Name, cuisine tags, rating, price range, hours
- "Menu Highlights" section: Menu item cards with name, description, price, dietary icons (🌱 vegan, 🔥 spicy, etc.)
- Reviews section: Star breakdown, sample reviews
- Location: Mini map
- "Make a Reservation" button + "Order Ahead" button

**12.4 Reservation Flow**
- Restaurant name header
- Date picker
- Time slot grid: Available times in chip buttons
- Party size selector: +/- control
- Special requests text area
- "Confirm Reservation" button
- Confirmation state: Green checkmark, reservation details, "Add to Calendar"

---

### 13. TRANSPORT (12 screens)

**13.1 Transport Home**
- "Getting Around" header
- 3 transport option cards:
  - 🚐 Buggy Service: "On-demand rides", price, "Book Now"
  - 🚌 Shuttle: "Scheduled routes", "Free with ticket", "View Routes"
  - 🦁 Safari Tours: "Guided experiences", price range, "Browse Tours"
- "Your Active Bookings" section if any

**13.2-13.8 Buggy Flow** (7 screens)
- **Landing**: Buggy illustration, features list, pricing, "Book a Buggy" button
- **Booking**: Map with pickup pin, pickup location selector, destination selector, date/time, estimated price
- **Payment**: Payment method selection, price confirmation
- **Confirmation**: Booking confirmed, reference number, estimated pickup time
- **Driver Assigned**: Driver photo placeholder, name, rating, vehicle info, "Call Driver" + "Message" buttons, ETA
- **Tracking**: Map with driver location pin + route line, real-time ETA countdown, driver info bar
- **Complete**: Trip summary, distance, duration, fare, rating prompt (5 stars), tip options, "Done" button

**13.9-13.14 Shuttle Flow** (6 screens)
- **Landing**: Route map overview, shuttle schedule highlights
- **Listing**: Available routes with departure times, frequency, stops
- **Date Picker**: Calendar + time slot selection
- **Service Info**: Route details, all stops listed, amenities icons, accessibility info
- **Tracking**: Live shuttle position on route map, next stop, passenger count, ETA
- **Booked**: Confirmation with route, departure time, boarding pass QR

**13.15-13.18 Safari Flow** (4 screens)
- **Listing**: Safari tier cards (Standard, Premium, VIP) with prices, durations, inclusions
- **Detail**: Selected safari: hero, description, what's included list, animal sightings preview, reviews
- **Date Picker**: Calendar with availability (green = available, amber = limited, gray = sold out), time slots
- **Personal Info**: Passenger name/age form, emergency contact, medical conditions, waiver checkbox, "Complete Booking" button

---

### 14. ITINERARY (4 screens)

**14.1 Preference Wizard**
- Step-by-step preference collection for AI itinerary
- Interest selection, pace preference, must-see animals, dietary needs
- Progress bar at top

**14.2 Itinerary Timeline**
- AI-generated day plan: Vertical timeline with stops
- Each stop: Time, location name, duration, AI tip, type icon
- "Modify" button per stop
- Total stats at top: Duration, stops, distance

**14.3 Live Tour Guide**
- In-park guided experience view
- Current stop highlighted with progress
- Illustrated mini map with route
- Audio narration controls
- Fun facts and trivia cards
- "Next Stop" button
- Step counter and distance tracker

**14.4 Tour Complete**
- Celebration screen: Confetti, "Tour Complete!" heading
- Stats summary: Stops visited, distance, time, animals seen
- Star rating prompt
- "Share Your Experience" button
- Memory highlights: Photo grid from tour
- "Plan Another Tour" CTA

---

### 15. LEARNING (3 screens)

**15.1 Learning Hub**
- "Learn & Contribute" header
- Volunteer opportunities: Cards with role, time commitment, impact description
- Educational talks section: Upcoming keeper talks with schedule
- Conservation updates: News-style cards
- "Become a Volunteer" CTA card

**15.2 Volunteer Application**
- Multi-step form: Personal info, availability (day checkboxes), interests (checkbox list), experience textarea, motivation textarea
- Progress indicator
- "Submit Application" button
- Confirmation state with expected response time

**15.3 Educational Talks**
- "Keeper Talks & Workshops" header
- Schedule list: Cards with time, speaker name, topic, location, duration
- Filter: Today, This Week, By Topic
- "Set Reminder" button per talk
- Past talks with recording links

---

### 16. KIDS (7 screens)

**16.1 Kids Landing**
- Playful header: "Kids Zone" with fun emoji decorations
- Feature cards (large, colorful):
  - 🎨 Activities & Scavenger Hunts
  - 🎮 Animal Games
  - 📖 Story Time
  - 📋 Worksheets
  - 🏅 My Badges
- "Kids Package" purchase CTA card with family illustration

**16.2 Kids Purchase**
- Package options: Day Pass, Season Pass, Family Bundle
- Each with: Fun illustration, feature list, price
- "Add to Cart" buttons
- Bundle discount highlight

**16.3 Kids Worksheets**
- Downloadable activity sheets: Grid of preview thumbnails
- Categories: Coloring, Word Search, Maze, Matching, Quiz
- Age range filters: 3-5, 6-8, 9-12
- Download/print buttons

**16.4 Kids Games**
- Game cards: Animal trivia, memory match, spot-the-difference, animal sounds quiz
- Each with: Fun illustration, play button, difficulty stars
- High scores section
- "Play" button launches mini-game view

**16.5 Kids Story Time**
- Story list: Cards with animal character, story title, duration, age range
- Audio play button with progress bar
- Illustration area
- "Read Along" text version toggle

**16.6 Kids Badges**
- Badge collection: Grid of circular badges
- Earned: Full color with confetti border
- Locked: Grayscale with lock icon
- Categories: Explorer, Photographer, Quiz Master, Helper, Conservationist
- Progress to next badge

**16.7 Kids Activity**
- Current scavenger hunt: Checklist with animal/item targets
- Photo proof upload per item
- Timer/progress
- Hints section
- Zone-based activities list
- Completed activities with "Claim Badge" button

---

### 17. NOTIFICATIONS (2 screens)

**17.1 Notification Demo**
- Tab switcher: Pre-Visit | In-Park | Post-Visit
- Info card explaining notification categories
- Notification list: Cards with category accent bar (left edge color), category badge, icon, title, description, time
- Categories with unique colors:
  - Info (sky blue)
  - Alert (amber)
  - Event (coral)
  - Social (green)
  - Location (purple — use green-deep)
  - Energy (gold)
- Tapping a notification shows a live toast preview at top of screen

**17.2 Notification Toast (component)**
- Slide-down toast at top: Icon, category label, title, description, accent bar
- Auto-dismiss after 4 seconds
- Swipe up to dismiss

---

### 18. SERVICES (1 screen)

**18.1 Services Hub**
- "Guest Services" header
- Service cards: Icon + title + description + "Get Help" button
- Services: Lost & Found, First Aid, Accessibility Services, Information Desk, Lockers, Stroller/Wheelchair Rental, Pet Kennel, Guest Relations
- Emergency contact card at top (if applicable)

---

### 19. EXPANDED AUDIO PLAYER (1 screen)

**19.1 Full-Screen Audio Player**
- Dark green gradient background
- Large album art area (animal emoji or illustration in circle)
- Track title (Fraunces display) + narrator name
- Waveform/progress bar with time elapsed / total time
- Playback controls: Previous, Rewind 15s, Play/Pause (large), Forward 15s, Next
- Audio depth selector: Quick (2 min) / Standard (5 min) / Deep (12 min) chips
- Transcript toggle: Expandable text area with auto-scroll
- Queue section: Up next list
- Settings: Playback speed, auto-play toggle
- Minimize button (chevron down) to return to mini player

---

### 20. ACCESSIBILITY MODES (2 overlay states)

**20.1 Simplified Interface Mode**
Show a comparison: Normal vs Simplified. In simplified mode: All text 4-6px larger, buttons have 44-52px minimum height, chips and badges are larger, more whitespace, fewer decorative elements.

**20.2 Sensory Sensitivity Mode**
Show a comparison: Normal vs Sensory. In sensory mode: Noise level indicators on map pins (green quiet / amber moderate / red loud), quiet route suggestions, reduced/no animations, calmer color usage.

---

## Design Notes

- Every screen should feel premium and nature-inspired — not generic tech-app
- Use organic shapes, subtle gradients, and the green/gold/cream palette consistently
- Emoji are used heavily as icons throughout the app (animal pins, category icons, status indicators)
- Animations: Subtle spring physics, fade-up on page load, scale-on-tap for interactive elements
- Bottom nav is always present on main tab screens, hidden on sub-screens (replaced by back header)
- The floating AI assistant button is visible on all screens within the main layout
- Audio mini player floats above bottom nav when audio is active
- Mobile-first: 430px width, safe area insets respected
- Cards have generous padding (24px) and clear visual hierarchy
- Green gradient (deep → rich → mid) is the signature style for hero/CTA cards

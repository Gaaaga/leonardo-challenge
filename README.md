# Leonardo Frontend Challenge

A frontend technical challenge built with **Next.js App Router + Chakra UI + Apollo Client**, focused on delivering a clean user experience, mobile responsiveness, and scalable architecture.

## 🚀 Features

- 🔐 User information input and storage with modal gating
- 🧑‍💼 Global context management for user state
- 🪐 Paginated character viewer from Rick and Morty GraphQL API
- 📱 Fully responsive layout with Chakra UI
- 🧭 Route guard for protected pages (`withUserGuard`)
- 🧼 Optimized loading and error states (with retry + graceful fallback)
- 💡 Strong emphasis on UX (button accessibility, typography, spacing)

## 🛠️ Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Chakra UI**
- **Apollo Client + GraphQL**
- **React Context + Hooks**

## 🗂️ Project Structure
```
src/
├── app/                      
│   ├── layout.tsx            # Root layout, wraps all pages with Providers
│   ├── page.tsx              # Homepage (user info + buttons)
│   ├── providers.tsx         # Global providers: Chakra, Apollo, UserInfo, Modal
│   ├── GlobalModals.tsx      # Always-mounted modals (like BlockingModal)
│   ├── icon.svg              # Favicon (auto-detected by Next.js)
│   └── information/
│       └── [page]/page.tsx   # Characters page with pagination
│
├── components/               # Reusable UI components
│   ├── BlockingModal.tsx     # User info input modal
│   ├── CharacterCard.tsx     # Each character's card
│   └── CharacterModal.tsx    # Popup for character details
│
├── context/                  # Global React Context state
│   ├── UserInfoContext.tsx   # Handles username & job state
│   └── UserModalContext.tsx  # Controls modal open/close state
│
├── graphql/                  # Apollo query definitions
│   └── queries.ts            # Rick & Morty GraphQL queries
│
├── lib/                      # Core logic / infrastructure
│   ├── apollo-client.ts      # Apollo Client setup
│   ├── fetch-characters.ts   # API call + error-type abstraction
│   ├── logger.ts             # Dev logging (can extend to analytics)
│   ├── retry.ts              # Retry utility for async logic
│   └── withUserGuard.tsx     # Route HOC that blocks unauthenticated access
│
├── types/                    # Shared TypeScript types
│   └── character.ts          # Character data types
```

## ⚙️ Getting Started
To run this project locally:

```bash
# Install dependencies
npm install
# Start development server
npm run dev
# Build for production
npm run build && npm run start
```

## 🧩 Core Design Principles

- **User-first flow**: Every page is gated by user info (username + job title), enforced by modal and `withUserGuard`.
- **Separation of concerns**: API logic lives outside UI components (via `lib/fetch-characters.ts`).
- **Retry-friendly requests**: GraphQL queries wrapped with `retry()` logic for better resilience.
- **Responsive by default**: Chakra UI’s responsive props ensure a good mobile experience.
- **Centralized context**: Providers handle state like user info and modal visibility globally.
- **Fail-safe routing**: Invalid page numbers result in error fallback + a redirect option.


## 💡 Engineering Highlights

| Area | Technique |
|------|-----------|
| 🔐 Auth-like flow | `withUserGuard` HOC + BlockingModal gating |
| 🧠 State management | React Context for user + modal logic |
| 🔁 Fetch resilience | Retry wrapper with error typing |
| ⚛️ Typed GraphQL | Apollo + auto-typed query results |
| 📱 Mobile UX | Button size, spacing, and direction tuned with Chakra |
| 🧼 Layout discipline | Page logic isolated from Providers and shared layout |
| 🧩 HOC pattern | Reusable route guard logic via `withUserGuard` |


## 🛠 If I Had More Time...

Here are a few additional things I would love to improve or implement if time allowed:

- 🧪 Add unit and integration tests using Jest + Testing Library
- 🧭 Extract a shared `Layout` component with persistent `Navbar`
- 💬 Show toast notifications for actions like info save or logout
- ⚙️ Add loading spinners to page transitions
- 🌐 Handle real authentication with token-based login
- 🌈 Use Chakra’s custom theme to standardize design tokens
- 💾 Persist pagination state in URL and/or localStorage
- 🔍 Add real-time filtering or search to the character list
- 🌙 Implement light/dark mode toggle

This list reflects how I approach frontend challenges — not just to make it work, but to make it polished, extensible, and user-friendly.


## 🙋‍♀️ A Note to the Reviewers

Thank you for taking the time to review this project.

This challenge was built with the same care and standards I bring to real production work. I approached it not just as a technical task, but as a product experience — thinking through the user journey, data boundaries, error handling, and mobile responsiveness.

There’s always room to improve — I’d love to discuss how I might extend this further, whether through testing, animations, shared layout, or better UX flows.

If there’s anything specific you’d like to dive deeper into, I’m happy to walk through the decisions I made. Looking forward to connecting!


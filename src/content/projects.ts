// // export const projects = [
// //   {
// //     id: "string",               // Unique ID for the URL (e.g., "my-cool-project"). No spaces!
// //     title: "string",            // The display name of the project.
// //     description: "string",      // A short 1-2 sentence summary shown on the project card.
// //     category: "capstone" | "mini", // MUST be either "capstone" or "mini". Determines which section it appears in.
// //     tags: ["string", "string"], // Array of technologies used (e.g., ["React", "Node.js", "AWS"]).
// //     thumbnail: "string",        // URL to the image shown on the project card (can be an external link or local path).
// //     githubUrl: "string",        // (Optional) Link to your GitHub repository.
// //     liveUrl: "string",          // (Optional) Link to the live deployed website.
// //     hasLive: boolean,           // Set to `true` if you provided a liveUrl, `false` if not.
// //     featured: boolean,          // Set to `true` if you want to highlight this project (can be used for future filtering).
// //     status: "live" | "in-progress" | "archived", // The current state of the project.
// //     priority: number,           // Determines display order (1 appears first, 2 appears second, etc.).

// //     // --- The fields below are shown when you click into the Project Detail page ---
// //     problemStatement: "string", // A detailed paragraph explaining the problem you solved.
// //     architectureImages: ["string","string"],// (Optional) URL to an architecture diagram image.
// //     keyDecisions: [             // Array of bullet points explaining your architectural choices.
// //       "Decision 1...",
// //       "Decision 2..."
// //     ],
// //     challenges: [               // Array of bullet points explaining hurdles you faced.
// //       "Challenge 1...",
// //       "Challenge 2..."
// //     ],
// //     learnings: [                // Array of bullet points explaining what you learned.
// //       "Learning 1...",
// //       "Learning 2..."
// //     ]
// //   }
// // ];

export const projects = [
  {
    id: "distributed-reservation-infrastructure",
    title: "Distributed Reservation Infrastructure",
    description:
      "Built a fault-tolerant, distributed booking system that guarantees reliable reservations under high concurrency without double-booking.",
    category: "capstone",
    tags: [
      "Microservices",
      "Ts",
      "Go",
      "Express.js",
      "Redis",
      "PostgreSQL",
      "prisma",
      "JWT",
      "Docker",
    ],
    thumbnail: "/images/thumb1.png?q=80&w=2034&auto=format&fit=crop",

    githubUrl:
      "https://github.com/niteshsengar03/DistributedReservationInfrastructure",
    // liveUrl: "/images/thumb1.png?q=80&w=2034&auto=format&fit=crop",
    hasLive: false,
    featured: true,
    status: "completed",
    priority: 1,
    problemStatement:
      "Prevent double-booking and ensure reliable reservations under high concurrency and failure conditions in a distributed hotel booking system =>Scalable hotel booking platform with a Go-powered authentication gateway, Express/TypeScript backend services, and Redis-based locking for safe, idempotent reservations. Async Redis queues handle notifications and , while automated DB migrations and cron-driven inventory updates ensure data integrity.",
    architectureImages: [
      "/images/thumb1.png?q=80&w=2034&auto=format&fit=crop",
      "/images/img-1.png?q=80&w=2070&auto=format&fit=crop",
      "/images/basicAir.png?q=80&w=2070&auto=format&fit=crop",
      "/images/not.png?q=80&w=2034&auto=format&fit=crop",
    ],
    keyDecisions: [
      "Used a Go-based API Gateway to centralize JWT authentication and request routing. This provides a single security layer (JWT validation and reverse-proxy) before reaching the Node.js services, trading off added complexity in the gateway for stronger security and performance.",
      "Implemented Redis Redlock for distributed locking on reservations. By storing an **idempotency key** per booking, we ensure exactly-once processing.  The trade-off is dependence on Redis availability, so health checks and fallback logic are required.",
      "Chose Node.js/Express with TypeScript for the booking and review services, enabling rapid development and strong typing.  While this adds some overhead under high load, it leverages a mature ecosystem and simplifies integration with async patterns.",
      "Decoupled workflows via Redis-backed queues (e.g. Redis Streams). Notifications and review updates are processed asynchronously to avoid blocking user requests.  This improves responsiveness at the cost of eventual consistency and the need for queue management (retries, DLQs).",
      "Adopted automated database migrations (version-controlled schema) for all services. This ensures safe, repeatable deployments.  Initial setup overhead is offset by preventing schema drift in production.",
      "Scheduled a cron-driven inventory generator (e.g. nightly job). Pre-populating future availability avoids runtime delays.  The trade-off is that inventory may become stale if demand changes rapidly, so frequency must be balanced with performance.",
    ],
    challenges: [
      "Preventing race conditions during concurrent bookings: We observed that near-simultaneous requests could bypass locks if timing is off. Fixing this involved tuning lock timeouts and thoroughly testing idempotency behavior under load.",
      "Handling Redis or service outages: Because bookings rely on Redis locks and queues, any Redis downtime can disrupt the system. Mitigation required implementing fallback logic (e.g. short circuit to errors) and ensuring robust retry/backoff for Redis calls.",
      "Ensuring reliability of async processing: Debugging the notification/review queue was tricky, especially when consumers failed. We added dead-letter queues and monitoring to catch failed tasks instead of silently dropping events.",
      "Observability gaps: Initially, lack of centralized logging/tracing made it hard to trace requests across services. We learned to integrate structured logs and metrics early to diagnose issues in a distributed environment.",
    ],
    learnings: [
      "Deepened understanding of distributed locks and idempotency: We learned that Redlock’s guarantees are subtle; implementing explicit idempotency keys was crucial to avoid duplicates under failure conditions.",
      "Importance of failure-first design: Starting with “how can this fail?” led us to build retries, DLQs, and graceful degradation from the outset. Realizing that things break (Redis, DB, network) changed how we wrote services.",
      "Modularity vs consistency trade-off: Splitting functionality into microservices improved maintainability, but we learned the hard way that distributed transactions are complex. In the future, we would use saga patterns or ensure simpler data ownership to avoid inconsistencies.",
    ],
  },

  {
    id: "instagram-unfollow-analyzer",
    title: "Instagram Unfollow Analyzer",
    description:
      "Built a privacy-first tool that analyzes Instagram data exports to reveal who doesn’t follow back and identify inactive accounts—without requiring login credentials or server-side processing.",
    category: "mini",
    tags: ["React", "JSON Parsing", "File Handling", "vibeCoding"],
    thumbnail: "/images/insta.png",

    githubUrl: "https://github.com/niteshsengar03/instaFollow", // update if needed
    liveUrl: "https://unfollow-krliya-kro.vercel.app/",
    hasLive: true,
    featured: true,
    status: "live",
    priority: 2,

    problemStatement:
      "Most Instagram analytics tools require login credentials, creating privacy risks. The challenge was to extract meaningful insights (non-followers, inactive accounts) directly from user-provided data exports without compromising security.",
    architectureImages: ["/images/setpsInsta.png"],
    keyDecisions: [
      "Chose a fully client-side architecture to ensure user data never leaves the browser, eliminating privacy concerns.",
      "Used Instagram’s official data export (ZIP with JSON) instead of scraping or API-based approaches to avoid authentication risks.",
      "Processed and parsed JSON files directly in the browser using JavaScript for instant results without backend dependency.",
    ],

    challenges: ["Draw each steps by hand"],

    learnings: [
      "Learned how to work with file inputs, ZIP parsing, and client-side data processing in JavaScript.",
      "Understood the importance of privacy-first design in user-facing tools.",
      "Improved ability to design lightweight applications by vibe coding",
    ],
  },
  {
    id: "chai-ui-engine",
    title: "Chai UI – Runtime CSS Engine",
    description:
      "A Tailwind-like utility CSS engine built using JavaScript that parses class names and applies styles dynamically at runtime.",
    category: "mini",
    tags: ["JavaScript", "DOM", "CSS", "Frontend"],
    thumbnail:
      "https://res.cloudinary.com/dbesyt2ph/image/upload/v1774746268/Screenshot_from_2026-03-29_06-34-13_dkgwtv.png",
    githubUrl:
      "https://github.com/niteshsengar03/chaiCodeAssignment/tree/main/tailwindDOM",
    hasLive: true,
    liveUrl: "https://cool-speculoos-c5457c.netlify.app/",
    featured: true,
    status: "live",
    priority: 1,

    problemStatement:
      "Understanding how utility-first CSS frameworks like Tailwind work internally by building a system that converts class names into actual styles at runtime.",

    architectureImages: [
      "https://res.cloudinary.com/dbesyt2ph/image/upload/v1774746268/Screenshot_from_2026-03-29_06-34-13_dkgwtv.png",
    ],

    keyDecisions: [
      "Used a structured class format (chai-{utility}-{value}) for predictable parsing.",
      "Adopted a map-based architecture instead of if-else chains for scalability.",
      "Separated utility types (spacing, color, keyword) to handle value transformations cleanly.",
      "Chose runtime DOM parsing with inline styles to align with project constraints.",
    ],

    challenges: [
      "Designing a flexible parsing system that supports multiple utility types.",
      "Handling invalid class formats and ensuring safe fallbacks.",
      "Creating a color system that supports palette, hex values, and raw CSS colors.",
      "Balancing simplicity (MVP) with extensibility.",
    ],

    learnings: [
      "Deep understanding of DOM traversal (NodeList vs DOMTokenList).",
      "Dynamic property access in JavaScript (element.style[property]).",
      "Designing scalable systems using map-based architecture.",
      "Trade-offs between runtime styling and build-time CSS frameworks.",
      "How utility-first CSS frameworks like Tailwind work under the hood.",
    ],
  },
  // {
  //   id: "url-shortener",
  //   title: "Scalable URL Shortener",
  //   description: "A highly available URL shortening service with analytics.",
  //   category: "mini",
  //   tags: ["Go", "PostgreSQL", "Redis"],
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  //   githubUrl: "https://github.com",
  //   liveUrl: "https://example.com",
  //   hasLive: true,
  //   featured: false,
  //   status: "archived",
  //   // status: "live",
  //   priority: 2,
  //   problemStatement:
  //     "Designing a system that can generate unique short URLs and handle high read throughput for redirects.",
  //   architectureImages: [
  //     "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  //   ],
  //   keyDecisions: [
  //     "Used Base62 encoding for generating short, URL-safe hashes.",
  //     "Implemented a caching layer with Redis to serve redirects with minimal latency.",
  //     "Used PostgreSQL for persistent storage of URL mappings and click analytics.",
  //   ],
  //   challenges: [
  //     "Handling hash collisions efficiently.",
  //     "Scaling the database to handle high write loads during peak traffic.",
  //   ],
  //   learnings: [
  //     "Database indexing strategies for fast lookups.",
  //     "Cache invalidation techniques.",
  //   ],
  // },
];

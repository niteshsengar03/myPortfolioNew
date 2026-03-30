// export const projects = [
//   {
//     id: "string",               // Unique ID for the URL (e.g., "my-cool-project"). No spaces!
//     title: "string",            // The display name of the project.
//     description: "string",      // A short 1-2 sentence summary shown on the project card.
//     category: "capstone" | "mini", // MUST be either "capstone" or "mini". Determines which section it appears in.
//     tags: ["string", "string"], // Array of technologies used (e.g., ["React", "Node.js", "AWS"]).
//     thumbnail: "string",        // URL to the image shown on the project card (can be an external link or local path).
//     githubUrl: "string",        // (Optional) Link to your GitHub repository.
//     liveUrl: "string",          // (Optional) Link to the live deployed website.
//     hasLive: boolean,           // Set to `true` if you provided a liveUrl, `false` if not.
//     featured: boolean,          // Set to `true` if you want to highlight this project (can be used for future filtering).
//     status: "live" | "in-progress" | "archived", // The current state of the project.
//     priority: number,           // Determines display order (1 appears first, 2 appears second, etc.).
    
//     // --- The fields below are shown when you click into the Project Detail page ---
//     problemStatement: "string", // A detailed paragraph explaining the problem you solved.
//     architectureImage: "string",// (Optional) URL to an architecture diagram image.
//     keyDecisions: [             // Array of bullet points explaining your architectural choices.
//       "Decision 1...", 
//       "Decision 2..."
//     ],
//     challenges: [               // Array of bullet points explaining hurdles you faced.
//       "Challenge 1...",
//       "Challenge 2..."
//     ],
//     learnings: [                // Array of bullet points explaining what you learned.
//       "Learning 1...",
//       "Learning 2..."
//     ]
//   }
// ];




export const projects = [
  {
    id: "distributed-task-queue",
    title: "Distributed Task Queue",
    description: "A high-throughput, fault-tolerant distributed task queue built with Go and Redis.",
    category: "capstone",
    tags: ["Go", "Redis", "gRPC", "Docker"],
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hasLive: true,
    featured: true,
    status: "live",
    priority: 1,
    problemStatement: "Processing millions of background jobs reliably across multiple worker nodes without losing tasks during node failures.",
    architectureImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    keyDecisions: [
      "Used Redis Streams for reliable message queuing and consumer groups.",
      "Implemented gRPC for fast, typed communication between producers and the queue manager.",
      "Designed a dead-letter queue (DLQ) for failed tasks with exponential backoff retries."
    ],
    challenges: [
      "Handling network partitions between worker nodes and Redis.",
      "Ensuring exactly-once processing semantics in a distributed environment."
    ],
    learnings: [
      "Deep understanding of Redis Streams and consumer group mechanics.",
      "The importance of idempotency in distributed systems.",
      "Designing for failure from the ground up."
    ]
  },
  {
    id: "realtime-analytics-pipeline",
    title: "Real-time Analytics Pipeline",
    description: "Ingesting and processing 10k+ events/sec using Kafka and ClickHouse.",
    category: "capstone",
    tags: ["Kafka", "ClickHouse", "Python", "Kubernetes"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    githubUrl: "https://github.com",
    hasLive: false,
    featured: true,
    status: "in-progress",
    priority: 2,
    problemStatement: "Building a scalable pipeline to ingest, process, and query high-volume clickstream data with sub-second latency.",
    architectureImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    keyDecisions: [
      "Chose Kafka as the central nervous system for decoupling ingestion from processing.",
      "Selected ClickHouse for its blazing fast OLAP capabilities and native Kafka integration.",
      "Deployed on Kubernetes using Helm charts for easy scaling."
    ],
    challenges: [
      "Tuning Kafka producer/consumer configurations for optimal throughput vs latency.",
      "Designing efficient ClickHouse table schemas (MergeTree) for time-series data."
    ],
    learnings: [
      "Mastered Kafka partition strategies and consumer rebalancing.",
      "Learned advanced ClickHouse materialized views for pre-aggregating data."
    ]
  },
{
  id: "chai-ui-engine",
  title: "Chai UI – Runtime CSS Engine",
  description: "A Tailwind-like utility CSS engine built using JavaScript that parses class names and applies styles dynamically at runtime.",
  category: "mini",
  tags: ["JavaScript", "DOM", "CSS", "Frontend"],
  thumbnail: "https://res.cloudinary.com/dbesyt2ph/image/upload/v1774746268/Screenshot_from_2026-03-29_06-34-13_dkgwtv.png",
  githubUrl: "https://github.com/niteshsengar03/chaiCodeAssignment/tree/main/tailwindDOM",
  hasLive: true,
  liveUrl: "https://cool-speculoos-c5457c.netlify.app/",
  featured: true,
  status: "live",
  priority: 1,

  problemStatement: "Understanding how utility-first CSS frameworks like Tailwind work internally by building a system that converts class names into actual styles at runtime.",

  architectureImage: "https://res.cloudinary.com/dbesyt2ph/image/upload/v1774746268/Screenshot_from_2026-03-29_06-34-13_dkgwtv.png",


  keyDecisions: [
    "Used a structured class format (chai-{utility}-{value}) for predictable parsing.",
    "Adopted a map-based architecture instead of if-else chains for scalability.",
    "Separated utility types (spacing, color, keyword) to handle value transformations cleanly.",
    "Chose runtime DOM parsing with inline styles to align with project constraints."
  ],

  challenges: [
    "Designing a flexible parsing system that supports multiple utility types.",
    "Handling invalid class formats and ensuring safe fallbacks.",
    "Creating a color system that supports palette, hex values, and raw CSS colors.",
    "Balancing simplicity (MVP) with extensibility."
  ],

  learnings: [
    "Deep understanding of DOM traversal (NodeList vs DOMTokenList).",
    "Dynamic property access in JavaScript (element.style[property]).",
    "Designing scalable systems using map-based architecture.",
    "Trade-offs between runtime styling and build-time CSS frameworks.",
    "How utility-first CSS frameworks like Tailwind work under the hood."
  ]
}
  ,
  {
    id: "url-shortener",
    title: "Scalable URL Shortener",
    description: "A highly available URL shortening service with analytics.",
    category: "mini",
    tags: ["Go", "PostgreSQL", "Redis"],
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    hasLive: true,
    featured: false,
    status: "archived",
    // status: "live",
    priority: 2,
    problemStatement: "Designing a system that can generate unique short URLs and handle high read throughput for redirects.",
    architectureImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    keyDecisions: [
      "Used Base62 encoding for generating short, URL-safe hashes.",
      "Implemented a caching layer with Redis to serve redirects with minimal latency.",
      "Used PostgreSQL for persistent storage of URL mappings and click analytics."
    ],
    challenges: [
      "Handling hash collisions efficiently.",
      "Scaling the database to handle high write loads during peak traffic."
    ],
    learnings: [
      "Database indexing strategies for fast lookups.",
      "Cache invalidation techniques."
    ]
  }
];

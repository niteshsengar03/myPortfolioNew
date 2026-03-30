// export const writings = [
//   {
//     id: "string",          // Unique ID for the writing piece.
//     title: "string",       // The headline of your article.
//     description: "string", // A short summary of what the article is about.
//     type: "blog" | "learning", // Categorizes the post. Used by the filter buttons on the Writing page.
//     tags: ["string"],      // Array of topics covered (e.g., ["System Design", "Rust"]).
//     date: "YYYY-MM-DD",    // The publication date. The code uses this to sort newest to oldest automatically!
//     readTime: "string",    // (Optional) Estimated reading time (e.g., "6 min read").
//     link: "string"         // The external URL where the article is actually hosted (e.g., Medium, Hashnode, Dev.to).
//   }
// ];


export const writings = [
  {
    id: "designing-idempotent-apis",
    title: "Designing Idempotent APIs in Distributed Systems",
    description: "Why idempotency matters and how to implement it using idempotency keys and database constraints.",
    type: "blog",
    tags: ["System Design", "API", "Backend"],
    date: "2023-10-15",
    readTime: "6 min read",
    link: "https://hashnode.com"
  },
  {
    id: "kafka-vs-rabbitmq",
    title: "Kafka vs RabbitMQ: Choosing the Right Message Broker",
    description: "A deep dive into the architectural differences between Kafka and RabbitMQ and when to use which.",
    type: "blog",
    tags: ["Kafka", "RabbitMQ", "Architecture"],
    date: "2023-09-02",
    readTime: "8 min read",
    link: "https://hashnode.com"
  },
  {
    id: "learning-rust-ownership",
    title: "Understanding Rust's Ownership Model",
    description: "My notes and mental models for grasping ownership, borrowing, and lifetimes in Rust.",
    type: "learning",
    tags: ["Rust", "Systems Programming"],
    date: "2023-11-20",
    link: "https://hashnode.com"
  },
  {
    id: "database-indexing-internals",
    title: "How B-Tree Indexes Work Under the Hood",
    description: "Exploring the data structures that power fast database lookups.",
    type: "learning",
    tags: ["Databases", "PostgreSQL", "Data Structures"],
    date: "2023-08-10",
    link: "https://hashnode.com"
  },
  {
    id: "scaling-websockets",
    title: "Scaling WebSockets to 1M Concurrent Connections",
    description: "Techniques for tuning Linux kernel parameters and optimizing Node.js for massive WebSocket concurrency.",
    type: "blog",
    tags: ["WebSockets", "Node.js", "Scaling"],
    date: "2024-01-05",
    readTime: "10 min read",
    link: "https://hashnode.com"
  }
];

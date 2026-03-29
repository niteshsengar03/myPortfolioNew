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
    id: "rate-limiter-service",
    title: "Distributed Rate Limiter",
    description: "A sliding window rate limiter service using Redis and Lua scripts.",
    category: "mini",
    tags: ["Node.js", "Redis", "Lua"],
    thumbnail: "https://images.unsplash.com/photo-1614064641936-38998978c9cb?q=80&w=2070&auto=format&fit=crop",
    githubUrl: "https://github.com",
    hasLive: false,
    featured: true,
    status: "live",
    priority: 3,
    problemStatement: "Protecting APIs from abuse by limiting the number of requests a user can make within a specific time window.",
    architectureImage: "https://images.unsplash.com/photo-1614064641936-38998978c9cb?q=80&w=2070&auto=format&fit=crop",
    keyDecisions: [
      "Implemented the sliding window log algorithm for precise rate limiting.",
      "Used Redis Lua scripts to ensure atomicity of check-and-set operations."
    ],
    challenges: [
      "Minimizing Redis memory usage while maintaining accurate sliding windows."
    ],
    learnings: [
      "Writing and debugging Lua scripts in Redis.",
      "Trade-offs between different rate limiting algorithms (Token Bucket vs Sliding Window)."
    ]
  },
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
    priority: 4,
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

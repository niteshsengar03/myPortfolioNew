import { useState, useEffect } from "react";

export interface HashnodePost {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  date: string;
  readTime: string;
  link: string;
  isFeatured: boolean;
  isPortfolioPost: boolean;
  originalDate: Date;
}

export function useHashnodePosts(host: string) {
  const [posts, setPosts] = useState<HashnodePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          query Publication {
            publication(host: "${host}") {
              posts(first: 20) {
                edges {
                  node {
                    id
                    title
                    brief
                    url
                    publishedAt
                    readTimeInMinutes
                    tags {
                      slug
                      name
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const fetchedPosts = result.data.publication?.posts?.edges?.map((edge: any) => {
          const node = edge.node;
          
          // Determine type and featured status from tags
          const tagSlugs = node.tags.map((t: any) => t.slug.toLowerCase());
          const tagNames = node.tags.map((t: any) => t.name.toLowerCase());
          
          const isFeatured = tagSlugs.some((t: string) => t.includes("portfolio-featured")) || tagNames.some((t: string) => t.includes("portfolio-featured"));
          const isLearning = tagSlugs.some((t: string) => t.includes("portfolio-learning")) || tagNames.some((t: string) => t.includes("portfolio-learning"));
          const isBlog = tagSlugs.some((t: string) => t.includes("portfolio-blog")) || tagNames.some((t: string) => t.includes("portfolio-blog"));
          
          const isPortfolioPost = isFeatured || isLearning || isBlog;
          
          let type = "blog";
          if (isLearning) {
            type = "learning";
          } else if (isBlog) {
            type = "blog";
          }
          
          // Filter out the portfolio-* tags from the display tags
          const displayTags = node.tags
            .filter((t: any) => !t.slug.toLowerCase().includes("portfolio-") && !t.name.toLowerCase().includes("portfolio-"))
            .map((t: any) => t.name);

          // Format date
          const dateObj = new Date(node.publishedAt);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          });

          return {
            id: node.id,
            title: node.title,
            description: node.brief,
            type,
            tags: displayTags,
            date: formattedDate,
            readTime: `${node.readTimeInMinutes} min read`,
            link: node.url,
            isFeatured,
            isPortfolioPost,
            originalDate: dateObj
          };
        }).filter((post: any) => post.isPortfolioPost) || [];

        setPosts(fetchedPosts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch posts"));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [host]);

  return { posts, loading, error };
}

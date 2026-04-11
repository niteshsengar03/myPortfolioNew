import { useState, useEffect } from "react";

export interface HashnodePostFull {
  id: string;
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: { name: string; slug: string }[];
  content: {
    html: string;
  };
  author: {
    name: string;
  };
  coverImage?: {
    url: string;
  };
}

export function useHashnodePost(postId: string) {
  const [post, setPost] = useState<HashnodePostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = `
          query Post($id: ID!) {
            post(id: $id) {
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
              author {
                name
              }
              coverImage {
                url
              }
              content {
                html
              }
            }
          }
        `;

        const response = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables: { id: postId } }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        if (!result.data?.post) {
          throw new Error("Post not found");
        }

        setPost(result.data.post);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch post")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
}

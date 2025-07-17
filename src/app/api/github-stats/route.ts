import { NextRequest } from "next/server";

interface GitHubRepo {
  stargazers_count: number;
  name: string;
  full_name: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  created_at: string;
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          colors: string[];
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              color: string;
              contributionCount: number;
              date: string;
              weekday: number;
            }>;
            firstDay: string;
          }>;
        };
      };
    };
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return Response.json(
      {
        error: "Username is required",
      },
      { status: 400 }
    );
  }

  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return Response.json(
        {
          error: "GitHub token not configured",
        },
        { status: 500 }
      );
    }

    const contributionQuery = {
      query: `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const [graphqlResponse, userResponse, reposResponse] = await Promise.all([
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contributionQuery),
      }),
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        }
      ),
    ]);

    if (!graphqlResponse.ok) {
      if (graphqlResponse.status === 403 || graphqlResponse.status === 429) {
        return Response.json(
          {
            error: "Rate limited",
          },
          { status: 429 }
        );
      }
      throw new Error(`GraphQL API error: ${graphqlResponse.status}`);
    }

    if (!userResponse.ok) {
      if (userResponse.status === 403 || userResponse.status === 429) {
        return Response.json(
          {
            error: "Rate limited",
          },
          { status: 429 }
        );
      }
      throw new Error(`User API error: ${userResponse.status}`);
    }

    if (!reposResponse.ok) {
      if (reposResponse.status === 403 || reposResponse.status === 429) {
        return Response.json(
          {
            error: "Rate limited",
          },
          { status: 429 }
        );
      }
      throw new Error(`Repos API error: ${reposResponse.status}`);
    }

    const [graphqlData, userData, reposData] = await Promise.all([
      graphqlResponse.json() as Promise<GitHubGraphQLResponse>,
      userResponse.json() as Promise<GitHubUser>,
      reposResponse.json() as Promise<GitHubRepo[]>,
    ]);

    const totalStars = reposData.reduce(
      (sum: number, repo: GitHubRepo) => sum + repo.stargazers_count,
      0
    );
    const contributionData =
      graphqlData.data?.user?.contributionsCollection?.contributionCalendar;

    return Response.json({
      totalStars,
      totalRepos: userData.public_repos,
      contributionCalendar: contributionData,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return Response.json(
      {
        error: "Service temporarily unavailable",
      },
      { status: 500 }
    );
  }
}

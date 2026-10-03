import { NextResponse } from 'next/server';
import { fetchGitHubUser, fetchGitHubRepos, computeLanguageStats } from '@/lib/github';

export async function GET() {
  try {
    const [user, repos] = await Promise.all([
      fetchGitHubUser(),
      fetchGitHubRepos()
    ]);

    const languageStats = computeLanguageStats(repos);

    return NextResponse.json({
      user,
      repos,
      languageStats,
      cachedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('GitHub API route error:', error);
    return NextResponse.json(
      { error: 'GitHub data temporarily unavailable' },
      { status: 503 }
    );
  }
}

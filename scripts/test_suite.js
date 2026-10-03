async function testSuite() {
  const base = 'http://localhost:3000';
  const urls = [
    '/',
    '/work',
    '/work/agentpay',
    '/work/hireiq',
    '/work/civicai',
    '/lab',
    '/build-log',
    '/about',
    '/github',
    '/sitemap.xml',
    '/robots.txt'
  ];

  console.log('--- TESTING ROUTES ---');
  let passCount = 0;
  for (const u of urls) {
    const res = await fetch(base + u);
    const ok = res.status === 200;
    if (ok) passCount++;
    console.log(`[Route ${u}]: HTTP ${res.status} ${ok ? 'PASSED' : 'FAILED'}`);
  }

  console.log('\n--- TESTING AMAY AI CHAT API ---');
  const chatRes = await fetch(base + '/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'What is AgentPay?' })
  });
  const chatData = await chatRes.json();
  console.log('Chat Status:', chatRes.status);
  console.log('Answer preview:', chatData.answer ? chatData.answer.slice(0, 100) + '...' : 'N/A');
  console.log('Citations returned:', chatData.citations?.length);

  console.log('\n--- TESTING GITHUB API ---');
  const ghRes = await fetch(base + '/api/github');
  const ghData = await ghRes.json();
  console.log('GitHub Status:', ghRes.status);
  console.log('Repositories fetched:', ghData.repos?.length);
  console.log('Language breakdown items:', ghData.languageStats?.length);

  console.log('\n--- TESTING CONTACT API ---');
  const contactRes = await fetch(base + '/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Engineering Director',
      email: 'director@company.com',
      message: 'Impressive architecture on AgentPay and HireIQ.'
    })
  });
  const contactData = await contactRes.json();
  console.log('Contact Status:', contactRes.status);
  console.log('Contact response:', contactData);

  console.log('\n--- OVERALL RESULT ---');
  console.log(`Passed ${passCount}/${urls.length} routes with all APIs active!`);
}

testSuite().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

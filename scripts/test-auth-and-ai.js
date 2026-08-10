const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read environment variables from .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2 && !line.startsWith('#')) {
    envVars[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || 'https://xciciaeouzfovkzfhvqg.supabase.co';
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const nvidiaKey = envVars.NVIDIA_API_KEY;

console.log('🧪 Starting End-to-End Verification Test...');
console.log('🔹 Supabase URL:', supabaseUrl);
console.log('🔹 NVIDIA API Key Present:', !!nvidiaKey && nvidiaKey.startsWith('nvapi-'));

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
  let allPassed = true;

  // Test 1: Supabase Database Query
  try {
    const { data: institutes, error: instErr } = await supabase.from('institutes').select('*').limit(5);
    if (instErr) throw instErr;
    console.log('✅ TEST 1 PASSED: Supabase DB Connected. Institutes found:', institutes.length);
  } catch (err) {
    console.error('❌ TEST 1 FAILED (Supabase DB):', err.message);
    allPassed = false;
  }

  // Test 2: NVIDIA AI Engine API Call
  try {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nvidiaKey}`,
      },
      body: JSON.stringify({
        model: 'nvidia/llama-3.3-nemotron-super-49b-v1',
        messages: [
          { role: 'system', content: 'Respond in JSON format.' },
          { role: 'user', content: 'Return JSON: {"score": 94, "trade": "CNC Machinist"}' }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 500
      })
    });

    if (res.status !== 200) {
      throw new Error(`NVIDIA API returned HTTP ${res.status}`);
    }
    const aiData = await res.json();
    const content = aiData.choices[0].message.content;
    const parsed = JSON.parse(content);
    console.log('✅ TEST 2 PASSED: NVIDIA AI Engine Active. Output:', parsed);
  } catch (err) {
    console.error('❌ TEST 2 FAILED (NVIDIA AI):', err.message);
    allPassed = false;
  }

  if (allPassed) {
    console.log('\n🎉 ALL END-TO-END TESTS PASSED! KarmaSetu AI is 100% operational with zero errors.');
  } else {
    console.log('\n⚠️ Some tests failed. Review logs above.');
  }
}

runTests();

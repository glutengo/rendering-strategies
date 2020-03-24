const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const table = require('markdown-table');

const RUNS = 11;
const CACHE = true;
const METRICS = ['time-to-first-byte', 'first-contentful-paint', 'first-meaningful-paint', 'interactive', 'max-potential-fid'];
const APPS = [
  'Angular CSR',
  'Angular SSR',
  'React CSR',
  'React SSR',
  'Next',
  'Vue CSR',
  'Vue SSR'
];

const METRICS_TRANSLATIONS = ['TTFB', 'FCP', 'FMP', 'TTI', 'MP FID'];

const THROTTLING_CONFIGS = {
  none: {
    throttlingMethod: 'devtools',
    throttling: {
      requestLatencyMs: 0,
      downloadThroughputKbps: 50000,
      uploadThroughputKbps: 50000,
      cpuSlowdownMultiplier: 4,
    }
  },
  fast3G: {
    throttlingMethod: 'devtools',
    throttling: {
      requestLatencyMs: 128,
      downloadThroughputKbps: 4096,
      uploadThroughputKbps: 1024,
      cpuSlowdownMultiplier: 4,
    }
  },
  slow3G: {
    throttlingMethod: 'devtools',
    throttling: {
      requestLatencyMs: 384,
      downloadThroughputKbps: 768,
      uploadThroughputKbps: 64,
      cpuSlowdownMultiplier: 4,
    }
  }
};

function getSiteUrl(targetSite) {
  return process.env[targetSite.toUpperCase().replace(' ', '_')];
}

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const workingDir = path.join(process.cwd(), 'audits', new Date().toISOString());
fs.mkdirSync(workingDir);

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch(opts).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, {...opts, ...config})
      .then(results => {
        return chrome.kill().then(() => results);
      });
  });
}

async function runTests(app, runs, throttlingConfigKey, dir) {

  console.log(`running ${runs} tests for ${app} with throttling set to ${throttlingConfigKey}`);

  const opts = {
    chromeFlags: ['--show-paint-rects', '--headless']
  };

  const config = {
    onlyCategories: ['performance'],
    ...THROTTLING_CONFIGS[throttlingConfigKey]
  };

  const siteUrl = `${getSiteUrl(app)}/posts/metrics`;

  const measurements = [];
  for (let i = 0; i < runs; i++) {
    const results = await launchChromeAndRunLighthouse(siteUrl, opts, config);
    measurements.push(results.lhr.audits);
    const outputPath = path.join(dir, `${app}-${throttlingConfigKey}-${i}.json`);
    fs.writeFileSync(outputPath, results.report)
  }
  return measurements;
}

async function runTestSuite() {
  const suiteResults = [];
  for (let throttling in THROTTLING_CONFIGS) {
    for (let app of APPS) {
      const results = await runTests(app, RUNS, throttling, workingDir);
      suiteResults.push({app, throttling, results});
    }
  }
  return suiteResults;
}

async function run(cache) {
  dotenv.config({path: path.resolve(process.cwd(), cache ? '.env' : '.env.lb')});
  return runTestSuite();
}

function storeResults(results) {

  const summary = results.map(test => {
    const medianTestResult = test.results.sort(compareTests)[Math.floor(RUNS / 2)];
    return {
      ...test,
      results: METRICS.reduce((acc, metric) => ({...acc, [metric]: medianTestResult[metric].numericValue}), {})
    };
  });

  const summaryOutputPath = path.join(workingDir, 'summary.json');
  fs.writeFileSync(summaryOutputPath, JSON.stringify(summary));

  const summaryMdOutputPath = path.join(workingDir, 'summary.md');
  fs.writeFileSync(summaryMdOutputPath, Object.keys(THROTTLING_CONFIGS).map(throttling => `## Throttling: ${throttling}\n` + table([
    ['Implementation', ...METRICS_TRANSLATIONS, 'CIR', 'ISP'],
    ...summary.filter(s => s.throttling === throttling)
      .map(s => [s.app.replace('_', ' '), ...METRICS.map(metric => Math.round(s.results[metric]) + 'ms')])
  ])).join('\n\n'));
}

function compareTests(a, b) {
  return a['first-meaningful-paint'].numericValue - b['first-meaningful-paint'].numericValue;
}

run(CACHE).then(results => storeResults(results));




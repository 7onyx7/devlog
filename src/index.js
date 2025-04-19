require('dotenv').config();
const { getGitDiff } = require('./gitReader');
const { summarizeDiff } = require('./aiClient');
const { appendLog } = require('./logger');

// Parse optional --range flag
const argIndex = process.argv.indexOf('--range');
const range = argIndex > -1 && process.argv[argIndex + 1] ? process.argv[argIndex + 1] : 'HEAD~1 HEAD';

(async () => {
  const diffText = await getGitDiff(range);
  const summary = await summarizeDiff(diffText);
  console.log(summary);
  appendLog(summary);
})();
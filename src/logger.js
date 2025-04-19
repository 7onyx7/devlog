const fs = require('fs');
const path = require('path');

const logDir = path.join(process.cwd(), 'devlog');

function ensureLogDir() {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

/**
 * Append a timestamped summary to the daily log file.
 * @param {string} summary
 */
function appendLog(summary) {
  ensureLogDir();
  const date = new Date().toISOString().slice(0, 10);
  const filePath = path.join(logDir, `${date}.md`);
  const timeStamp = new Date().toISOString();
  const entry = `## ${timeStamp}\n\n${summary}\n\n`;
  fs.appendFileSync(filePath, entry, 'utf8');
  console.log(`Appended summary to ${filePath}`);
}

/**
 * Find all existing log files
 * @returns {Array<string>} Array of log file paths
 */
function findLogFiles() {
  ensureLogDir();
  const files = fs.readdirSync(logDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(logDir, file));
  return files;
}

/**
 * Updates content in an existing log file
 * @param {string} filePath - Path to the log file
 * @param {function} transformFn - Function that takes content and returns transformed content
 * @returns {boolean} True if file was updated
 */
function updateLogFile(filePath, transformFn) {
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = transformFn(content);
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    return true;
  }
  return false;
}

module.exports = { appendLog, findLogFiles, updateLogFile };
const { findLogFiles, updateLogFile } = require('./logger');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Process logs with a specific transform operation
 */
async function processLogs() {
  // Find all available log files
  const logFiles = findLogFiles();
  
  if (logFiles.length === 0) {
    console.log('No log files found.');
    rl.close();
    return;
  }

  // Display available log files
  console.log('\nAvailable log files:');
  logFiles.forEach((file, i) => {
    console.log(`[${i + 1}] ${file.split(/[\\/]/).pop()}`);
  });
  
  // Ask user which file to process
  const answer = await askQuestion('\nWhich log file would you like to process? (number or "all", or "q" to quit): ');
  
  if (answer.toLowerCase() === 'q') {
    rl.close();
    return;
  }
  
  // Determine which files to process
  let filesToProcess = [];
  if (answer.toLowerCase() === 'all') {
    filesToProcess = logFiles;
  } else {
    const index = parseInt(answer) - 1;
    if (isNaN(index) || index < 0 || index >= logFiles.length) {
      console.log('Invalid file number. Exiting.');
      rl.close();
      return;
    }
    filesToProcess = [logFiles[index]];
  }

  // Ask what transformation to perform
  console.log('\nTransformation options:');
  console.log('[1] Replace "OpenAI" with "Gemini"');
  console.log('[2] Custom search and replace');
  console.log('[3] Preview file');
  
  const transformOption = await askQuestion('\nSelect transformation (1-3, or "q" to quit): ');
  
  if (transformOption.toLowerCase() === 'q') {
    rl.close();
    return;
  }

  let transformFn;
  let searchTerm = '';
  let replacement = '';

  switch (transformOption) {
    case '1':
      transformFn = content => content.replace(/OpenAI/g, 'Gemini');
      break;
    case '2':
      searchTerm = await askQuestion('Enter search term: ');
      replacement = await askQuestion('Enter replacement: ');
      const regex = new RegExp(searchTerm, 'g');
      transformFn = content => content.replace(regex, replacement);
      break;
    case '3':
      // Preview files
      for (const file of filesToProcess) {
        console.log(`\n--- Content of ${file.split(/[\\/]/).pop()} ---\n`);
        console.log(fs.readFileSync(file, 'utf8'));
      }
      rl.close();
      return;
    default:
      console.log('Invalid option. Exiting.');
      rl.close();
      return;
  }

  // Process each selected file
  for (const file of filesToProcess) {
    const fileName = file.split(/[\\/]/).pop();
    
    if (transformOption !== '3') {
      // For transformation options, ask for confirmation
      const confirm = await askQuestion(`Process ${fileName}? (y/n): `);
      if (confirm.toLowerCase() !== 'y') {
        continue;
      }

      const updated = updateLogFile(file, transformFn);
      console.log(`${fileName}: ${updated ? 'Updated' : 'No changes needed'}`);
    }
  }

  console.log('\nProcessing complete.');
  rl.close();
}

/**
 * Helper function to ask a question and get a response
 */
function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

// Run the process
processLogs();
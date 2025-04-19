require ('dotenv').config();
const { getGitDiff } = require('./gitReader');

(async () => {
  const diffText = await getGitDiff();
  console.log("Here's your latest diff:\n", diffText);
  
})();
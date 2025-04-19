const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

async function getGitDiff() {
    try {
        const { stdout, stderr } = await execAsync('git diff HEAD~1 HEAD');

        if (stderr) {
            console.error('Git diff error:', stderr);
            return '';
        }

        return stdout;

    } catch (err) {
        console.error('Failed to run git diff:', err);
        return '';
    }

}

module.exports = { getGitDiff };
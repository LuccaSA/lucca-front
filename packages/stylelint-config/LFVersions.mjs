const githubMilestones = await fetch('https://api.github.com/repos/LuccaSA/lucca-front/milestones?state=all&sort=due_on&direction=desc');

const LFVersions = {};

if (githubMilestones.ok) {
	const milestones = await githubMilestones.json();

	for (const milestone of milestones) {
		let version = milestone.title;

		if (version) {
			const date = new Date(milestone.due_on);
			// If version doesn't have patch version, add it as .0
			if (version.split('.').length === 2) {
				version += '.0';
			}
			LFVersions[version] = date.toLocaleDateString();
		}
	}
}

export default LFVersions;

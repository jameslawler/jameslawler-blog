module.exports = {
	tags: ["articles"],
	layout: "layouts/post.njk",
	permalink:
		"articles/{{ page.date.getFullYear() }}/{{ (page.date.getMonth() + 1).toString().padStart(2, '0') }}/{{ page.fileSlug }}/",
};

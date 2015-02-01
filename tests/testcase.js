
// runs test case by opening browser adding new cycle, running workout
// then checking the value that is contained in the database when finished
// it deltes the workout and restores the app back to its previous state
module.exports = { 'testcase': function(browser) { 
	browser.url("http://localhost:3000")
	//.useCss()
	.click("#new-cycle")
	.setValue("#bodyWeight", "175")
	.click("#next")
	.click("#next")
	.setValue("#hangTimeOne", "20")
	.setValue("#hangTimeTwo", "20")
	.setValue("#hangTimeThree", "20")
	.click("#submit")
	.click("#start-set")
	.click("#max-effort")
	.click("#start-set")
	.click("#max-effort")
	.click("div.outer")
	.click("#start-set")
	.click("#max-effort")
	.assert.containsText("#repMax1", "267.13")
	.click("button.delete")
	.pause(300)
	.click("button.btn.btn-primary")
	.end();
}}
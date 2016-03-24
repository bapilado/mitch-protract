// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  // forcing long timeouts.  just for testing stability
  // page may not load and render fast enough.
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  
  specs: ['genius.js'],
  
  multiCapabilities: [ {
  /* disabling firefox as it appears to be inconsistent running tests.
	 this appears to be a timing issue where the test is trying to continue, but the 
	 page has not fully loaded or the element is not yet visible.
	 It may be just my version of Firefox where pages load longer than expected.
	*/
  // browserName: 'firefox' }, {
	browserName: 'chrome'
  }]
}
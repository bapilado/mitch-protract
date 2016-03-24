describe('Protractor Test', function() {
	// represent the Login Page with the PageObject design
	var loginPage = require('./genius.page.login.js');
	
	// site to test
	var siteToValidate = 'http://genius.com'; 
	
	// declare components used in the tests
	var inputSearch = element(by.name('q'));
	var buttonSubmit = element(by.className('eq'));
	var labelPageTitle = element(by.xpath("//div[@class='md-page-h1-wrapper']/h1"));
	var menuMenuBar = element(by.xpath("//ul[@class='header-global-nav-buttons']"));
	var resultsItem01 = element(by.xpath("//ul[@class='search_results song_list primary_list'][1]/li[1]"));
	var resultsItem01SongTitle = element(by.xpath("//ul[@class='search_results song_list primary_list'][1]/li[1]//span[@class='song_title']"));
	var resultsItem01Artist    = element(by.xpath("//ul[@class='search_results song_list primary_list'][1]/li[1]//span[@class='primary_artist_name']"));
	var labelSearchResultsTitle = element(by.className('results_header songs')); 
	var linkSignIn = element(by.className('header-user_info header-user_info--sign_in facebox'));
	
	/*
		Helper function to wait for element to display before continuing.
		Page may not load(render) quick so we have to force a wait.
	*/
	function waitForElement(ele, time) {
		return browser.wait(function() {
				return ele.isPresent();
				}, time);
	}

	/*  
		Wrapper to click on element. waits for button to display before clicking
		Simple handling of issues due to page not loading quick.
	*/
	function clickOnElement(ele) {
		if (waitForElement(ele, 5000)) {
			ele.click();
		}
	}
	
	/*  
		Modularize the search process; Uses <ENTER> key instead of button 
		1) Enter searchString into inputElement
		2) Press <ENTER>
	*/	
	function enterText(ele, data) {
		waitForElement(ele, 10000);
		ele.sendKeys(data);
		ele.sendKeys(protractor.Key.ENTER);
	}
	
	/*
		Modularize the search process. 
		1) Enter searchString into inputElement
		2) Click seachButton
	*/
	function performSearch(inputElement, searchButton, searchString) {
		waitForElement(inputElement, 10000);
		inputElement.sendKeys(searchString);
		clickOnElement(searchButton);
	}
	
	/*
		Modularize the entering of the account login process.
		1) Enter accountName into inputName
		2) Enter accountPass into inputPassword
		3) Click on submit (login)
	*/
	function performLogin(accountName, accountPass) {	
		loginPage.setInputLoginName(accountName);
		loginPage.setInputLoginPass(accountPass);
		loginPage.clickLoginButton();		
	}

	/*
		Modularize the login process with validating the expected error message.
		1) Perform account login
		2) Validate error element is presented
		3) Validate expected error message
	*/
	function performLoginValidationErroHandlingCases(inputdata) {
		performLogin(inputdata[0], inputdata[1]);
		expect(loginPage.isErrorDisplayed()).toBe(true);
		expect(loginPage.getErrorMessage()).toContain(inputdata[2]);
	}
	
	// Standard function to restart the browser maximized
	beforeEach(function() {
		browser.driver.manage().window().maximize();
		browser.get(siteToValidate);
	});
	
	/*
	 Testcase 01: User enters a song title into the search function and expects to the have the first 
		result in list to be the intended song.  What is not known is the sorting and how the first result
		in list is ranked.  For this case, we will treat it as the first result as the most popular result.
		This holds true for multiple results of the same title, but have different artists.
	*/
	it ('testcase 01: basic search, song title',function() {
		var songTitle = "Hotline Bling";
		
		enterText(inputSearch,songTitle);
		expect(resultsItem01SongTitle.getText()).toContain(songTitle);
		
	 }, 60000);
	
	/*
	 Testcase 02: User enters an artist into the search function and expects to the have the first 
		result in list to be the intended artist.  What is not known is the sorting and how the first result 
		in list is ranked.  For this case, we will treat it as the first result as the most popular song title
		produced by the artist.
	*/
	it ('testcase 02: basic search, artist',function() {
		var artist = "Justin Bieber";
		
		enterText(inputSearch,artist);
		expect(resultsItem01Artist.getText()).toContain(artist);
		
	 }, 60000);
	
	/*
	 Testcase 03: User enters lyrics from a specific song and expects to the have the first 
		result in list to be the intended song title which the lyrics exist.  
	*/
	it ('testcase 03: basic search, lyric',function() {
		var lyric = "ON A DARK DESERT HIGHWAY, COOL WIND IN MY HAIR WARM SMELL OF COLITAS, RISING UP THROUGH THE AIR";
		var expectedArtistName = "The Eagles";
		var expectedSongTitle = "Hotel California";
	
		
		enterText(inputSearch,lyric);
		waitForElement(resultsItem01, 10000);
		expect(resultsItem01Artist.getText()).toContain(expectedArtistName);
		expect(resultsItem01SongTitle.getText()).toContain(expectedSongTitle);
		
	 }, 60000);
	
	// perform error handling of login form
	it ('testcase 04: basic error handling, login form',function() {
		// input cases and the expected error message
		var loginCase01 = ["","","You did not provide any details for authentication."];
		var loginCase02 = ["test","","Password cannot be blank"];
		var loginCase03 = ["","test@gmail.com","Login cannot be blank"];
		var loginCase04 = ["!@#$","!@#$@","Login is not valid"];
		var loginCase05 = ["test","!@#$@gmail.com","Password is not valid"];
		var loginCase06 = ["test adf","test@gmail.com","Login is not valid"];
		var loginCase07 = ["test@gmail.com","test1234","Password is not valid"];
		
		clickOnElement(linkSignIn);
		
		// perform login based on cases
		performLoginValidationErroHandlingCases(loginCase01);
		performLoginValidationErroHandlingCases(loginCase02);
		performLoginValidationErroHandlingCases(loginCase03);
		performLoginValidationErroHandlingCases(loginCase04);
		performLoginValidationErroHandlingCases(loginCase05);
		performLoginValidationErroHandlingCases(loginCase06);
		performLoginValidationErroHandlingCases(loginCase07);
	
		
	 }, 60000);
	  
	  
});
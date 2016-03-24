DESCRIPTION

	For the Protractor test, I have uploaded three files. 
	
	genius.conf.js  
		standard configuration file based off of the tutorial.  
		I added two options which would hopefully remedy timeout related errors. 
		I experienced lots of these errors during my initial developement using sites like weather.com.
		However, I realized that would focus on using Chrome instead of Firefox as my version appears
		to load pages slower.
		
	genius.js
		The site I used is genius.com.  
		I created 4 simple test cases that focused on the a typical user scenario of how a user would interact
		with the site. 
		1) Searching by Artist name
		2) Searching by Song Title
		3) Searching by lyrics
		4) Attempting login.
		
		The Attempting login case was more a showcase of testing the login form's error handling.

		I commented the functions accordingly if more information is needed.
			
	genius.page.login.js
		This is the 'bonus' Page Object design. 
		I represented the Login Page for this test.
	
	

HOW TO RUN
On commandline run the following command:

	$ protractor  genius.conf.js



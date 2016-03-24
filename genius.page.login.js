 'use strict';

	var loginPage = function (){

	this.getInputLoginName = function(){
        return element(by.xpath("//input[@id='user_session_login']"));
    };

	this.setInputLoginName = function(name){
		this.getInputLoginName().clear();
		this.getInputLoginName().sendKeys(name);
	};

	this.getInputLoginPass = function(){
		return element(by.xpath("//input[@id='user_session_password']"));
	};

	this.setInputLoginPass = function(pass){
		this.getInputLoginPass().sendKeys(pass);
	};
			
	this.getInputLoginButton = function(){
		return element(by.xpath("//input[@id='user_session_submit']"));
	};
			
	this.clickLoginButton = function(){
		this.getInputLoginButton().click();
	};
			
	this.getTextareaErrorReason = function(){
		return element(by.id('errorExplanation'));
	};
			
	this.getErrorMessage = function(){
		return element(by.xpath("//div[@id='errorExplanation']/ul/li")).getText();
	};
			
	this.isErrorDisplayed = function(){
		return this.getTextareaErrorReason().isPresent() ;
	};
};

module.exports = new loginPage();

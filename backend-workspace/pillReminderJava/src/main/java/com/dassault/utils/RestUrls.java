package com.dassault.utils;

public class RestUrls {
	//rest urls for UserController class
	public static String registerUser = "/registerUser";
	public static String login = "/login";
	public static String resetPassword = "/setPassword";
	
	//rest urls for DependentController class
	public static String addDependent = "/user/addDependent";
	
	//rest urls for MedicalHistoryController class
	public static String addUserMedicalHistory = "/user/addMedicalHistory";
	public static String addDependentMedicalHistory = "/user/dependent/addMedicalHistory";
	
}

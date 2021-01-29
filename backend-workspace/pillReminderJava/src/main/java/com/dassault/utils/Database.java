package com.dassault.utils;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {
	static Connection connection;
	
	public void setConnection() {
		try {
			Class.forName(Constants.driver);  
			connection=DriverManager.getConnection(Constants.dbUrl, Constants.dbUser, Constants.dbPassword);  
			System.out.println("database connection successfull");
		}catch(Exception e) {
			System.out.println("Exception while connecting database : " + e.getMessage());
		}
	}
	
	public static Connection getConnection() {
		System.out.println("getting database connection");
		return connection;
	}
}

package com.dassault.components;

import java.sql.Date;

public class User extends Person {
	String country;
	String password;
	
	public User() {
		super();
	}
	
	//constructor for registration
	public User(String name, String email, String contact, Date dob, String country, String password) {
		super(name, email, contact, dob);
		System.out.println("Registration constructor called");
		this.country = country;
		this.password = password;
	}
	
	//constructor for fetching data
	public User(String name, String email, String contact, String country, Date dob, String password, String bloodGroup, float weight, float height) {
		super(name, email, contact, dob, bloodGroup, weight, height);
		System.out.println("fetching constructor called");
		this.country = country;
		this.password = password;
	}
	

	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}

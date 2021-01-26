package com.dassault.components;

import java.sql.Date;

public class User extends Person {
	String country;
	String password;
	public User(String name, String contact, String bloodGroup, String email, Date dob, float weight, float height,
			String country, String password) {
		super(name, contact, bloodGroup, email, dob, weight, height);
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

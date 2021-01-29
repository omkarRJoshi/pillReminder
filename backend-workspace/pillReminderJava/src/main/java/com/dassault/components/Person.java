package com.dassault.components;

import java.sql.Date;

public class Person {
	String name;
	String email;
	String contact;
	Date dob;
	String bloodGroup;
	float weight;
	float height;
	
	public Person() {
		
	}
	
	//constructor for all fields - will be used while fetching data
	public Person(String name, String email, String contact, Date dob, String bloodGroup, float weight, float height) {
		this.name = name;
		this.contact = contact;
		this.bloodGroup = bloodGroup;
		this.email = email;
		this.dob = dob;
		this.weight = weight;
		this.height = height;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

	public float getHeight() {
		return height;
	}

	public void setHeight(float height) {
		this.height = height;
	}
	
}

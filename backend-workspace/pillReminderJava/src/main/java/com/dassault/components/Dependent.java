package com.dassault.components;

import java.sql.Date;

public class Dependent extends Person{
	String relationship;

	public Dependent(String name, String contact, String bloodGroup, String email, Date dob, float weight, float height,
			String relationship) {
		super(name, contact, bloodGroup, email, dob, weight, height);
		this.relationship = relationship;
	}

	public String getRelationship() {
		return relationship;
	}

	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}
	
	
}

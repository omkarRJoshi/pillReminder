package com.dassault.components;

import java.sql.Date;

public class Dependent extends Person{
	String relation;
	
	public Dependent() {
		super();
	}

	public Dependent(String relation, String name, String email, String contact, Date dob, String bloodGroup, float weight, float height) {
		super(name, email, contact, dob, bloodGroup, weight, height);
		this.relation = relation;
	}

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}
	
	
}

package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.dassault.components.Person;
import com.dassault.components.User;
import com.dassault.utils.Constants;

public class PersonExecutor {
	public boolean adddPerson(Connection connection, PreparedStatement pstmt, String personId, Person p) {
		boolean inserted = false;
		String query = "INSERT INTO " + Constants.personTb + " (personId, name, email, contact, dob, bloodGroup, weight, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, personId);
			pstmt.setString(2, p.getName());
			pstmt.setString(3, p.getEmail());
			pstmt.setString(4, p.getContact());
			pstmt.setDate(5, p.getDob());
			pstmt.setString(6, p.getBloodGroup());
			pstmt.setFloat(7, p.getWeight());
			pstmt.setFloat(8, p.getHeight());
			
			inserted = pstmt.executeUpdate() == 1;
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of addPerson PersonExecutor " + e.getMessage());
		}
		
		return inserted;
	}
	
	public boolean updatePerson(Connection connection, PreparedStatement pstmt, String personId, Person p) {
		boolean updated = false;
		String query = "Update " + Constants.personTb + " set " +
					   "name = ?, email = ?, contact = ?, dob = ?, bloodGroup = ?, weight = ?, height = ? " +
					   "where personId = " + "'" + personId + "'";
		
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, p.getName());
			pstmt.setString(2, p.getEmail());
			pstmt.setString(3, p.getContact());
			pstmt.setDate(4, p.getDob());
			pstmt.setString(5, p.getBloodGroup());
			pstmt.setFloat(6, p.getWeight());
			pstmt.setFloat(7, p.getHeight());
			
			updated = pstmt.executeUpdate() == 1;
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of updatePerson PersonExecutor " + e.getMessage());
		}
		
		return updated;
	}
	
	public boolean getPerson(Connection connection, PreparedStatement pstmt, String personId, User user) {
		String query = "select * from " + Constants.personTb + " where personId = " + "'" + personId + "'";
		ResultSet resultSet = null;
		boolean gotPerson = false;
		
		try {
			pstmt = connection.prepareStatement(query);
			resultSet = pstmt.executeQuery();
			
			resultSet.first();
			
			user.setName(resultSet.getString(2));
			user.setEmail(resultSet.getString(3));
			user.setContact(resultSet.getString(4));
			user.setDob(resultSet.getDate(5));
			user.setBloodGroup(resultSet.getString(6));
			user.setWeight(resultSet.getFloat(7));
			user.setHeight(resultSet.getFloat(8));
			
			gotPerson = true;
			
			resultSet.close();
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of getPerson PersonExecutor " + e.getMessage());
		}
		
		return gotPerson;
	}
	
	
}

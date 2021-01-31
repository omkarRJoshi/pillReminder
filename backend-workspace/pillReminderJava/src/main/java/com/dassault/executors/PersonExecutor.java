package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.dassault.components.Person;
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
			
			System.out.println(pstmt);
			
			inserted = pstmt.executeUpdate() == 1;
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of PersonExecutor " + e.getMessage());
		}
		
		
		
		return inserted;
	}
}

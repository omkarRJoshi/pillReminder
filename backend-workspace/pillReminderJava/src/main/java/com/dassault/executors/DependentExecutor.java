package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.dassault.components.Dependent;
import com.dassault.utils.Constants;

public class DependentExecutor {
	
	public PreparedStatement prepareStmtToAddDependent(Connection connection, String userId, Dependent dependent) {
		String dependentId = "javaDependent1";
		String query = "Insert into " + Constants.dependentTb + 
					   " (dependentId, userId, relation, name, emailid, contactNo, bloodGroup, dob, weight, height) "
				      + "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		PreparedStatement pstmt = null;
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, dependentId);
			pstmt.setString(2, userId);
			pstmt.setString(3, dependent.getRelation());
			pstmt.setString(4, dependent.getName());
			pstmt.setString(5, dependent.getEmail());
			pstmt.setString(6, dependent.getContact());
			pstmt.setString(7, dependent.getBloodGroup());
			pstmt.setString(8, dependent.getDob().toString());
			pstmt.setFloat(9, dependent.getWeight());
			pstmt.setFloat(10, dependent.getHeight());
			System.out.println(pstmt);
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of UserControll " + e.getMessage());
		}
		
		return pstmt;
	}
	
}

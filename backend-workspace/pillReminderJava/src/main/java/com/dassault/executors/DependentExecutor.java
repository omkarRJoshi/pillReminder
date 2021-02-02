package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.dassault.utils.Constants;

public class DependentExecutor {
	
	public boolean setRelation(Connection connection, PreparedStatement pstmt, String userId, String dependentId, String relation) {
		String query = "Insert into " + Constants.relationTb + 
					   " (userId, dependentId, relation) "
				      + "values (?, ?, ?)";
		boolean inserted = false;
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, userId);
			pstmt.setString(2, dependentId);
			pstmt.setString(3, relation);
			
			System.out.println(pstmt);
			
			inserted = pstmt.executeUpdate() == 1;
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during setRelation method of DependentExecutor " + e.getMessage());
		}
		
		return inserted;
	}
	
}

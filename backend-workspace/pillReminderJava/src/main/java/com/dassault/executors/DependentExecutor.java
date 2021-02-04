package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

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
	
	public void allRelations(Connection connection, PreparedStatement pstmt, String userId, ArrayList<String[]> relations) {
		String query = "Select * from " + Constants.relationTb + " where userId = " + "'" + userId + "'";
		System.out.println(query);
		ResultSet resultSet = null;
		
		try {
			pstmt = connection.prepareStatement(query);
			resultSet = pstmt.executeQuery();
			
			while(resultSet.next()) {
				String[] relation = new String[2];
				relation[0] = resultSet.getString(2);
				relation[1] = resultSet.getString(3);
				
				relations.add(relation);
			}
			
			resultSet.close();
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during setRelation method of DependentExecutor " + e.getMessage());
		}
	}
	
}

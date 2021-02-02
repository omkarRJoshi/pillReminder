package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.dassault.components.User;
import com.dassault.utils.Constants;

public class UserExecutor {
	public boolean addUser(Connection connection, PreparedStatement pstmt, String userId, User user) {
		boolean inserted = false;
		String query = "INSERT INTO " + Constants.userTb + " (userId, email, country, password) VALUES (?, ?, ?, ?)";
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, userId);
			pstmt.setString(2, user.getEmail());
			pstmt.setString(3, user.getCountry());
			pstmt.setString(4, user.getPassword());
			System.out.println(pstmt);
			
			inserted = pstmt.executeUpdate() == 1;
		} catch (SQLException e) {
			System.out.println("Exception during pstmt in method addUser of UserExecutor " + e.getMessage());
		}
		
		return inserted;
	}
	
	public String getUserId(Connection connection, PreparedStatement pstmt, String[] loginDetails) {
		String email = loginDetails[0];
		String password = loginDetails[1];
		String userId = null;
		
		String qry = "select userId from " + Constants.userTb + " where email = '" + email + "' AND password = '" + password +"'";
		ResultSet resultSet = null;
		
		try {
			pstmt = connection.prepareStatement(qry);
			resultSet = pstmt.executeQuery();
			resultSet.first();
			userId = resultSet.getString(1);
		} catch (SQLException e) {
			System.out.println("Exception for login in getUserId method of UserExecutor" + e.getMessage());
		}
		
		return userId;
	}
	
	public boolean setNewPassword(Connection connection, PreparedStatement pstmt, String[] forgotPasswordDetais) {
		String email = forgotPasswordDetais[0];
		String newPassword = forgotPasswordDetais[1];
		int updatedRows = 0;
		
		String query = "UPDATE " + Constants.userTb + " set password = ? where email = '" + email +"'";
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, newPassword);
			updatedRows = pstmt.executeUpdate();
			System.out.println(pstmt);
			System.out.println(updatedRows);
		} catch (SQLException e) {
			System.out.println("Exception while setNewPassword method of UserExecutor" + e.getMessage());
		}
		
		return updatedRows == 1;
	}
	
	public boolean getUser(Connection connection, PreparedStatement pstmt, String userId, User user) {
		String query = "select * from " + Constants.userTb + " where userId = " + "'" + userId + "'";
		ResultSet resultSet = null;
		boolean gotUser = false;
		
		try {
			pstmt = connection.prepareStatement(query);
			resultSet = pstmt.executeQuery();
			
			resultSet.first();
			
			user.setCountry(resultSet.getString(3));
			user.setPassword(resultSet.getString(4));
			
			gotUser = true;
			
			resultSet.close();
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of getUser UserExecutor " + e.getMessage());
		}
		
		return gotUser;
	}
	
	public boolean updateUser(Connection connection, PreparedStatement pstmt, String userId, User user) {
		boolean updated = false;
		
		String query = "Update " + Constants.userTb + " set " +
				   	   "email = ?, country = ?, password = ?" + 
				   	   "where userId = " + "'" + userId + "'";
		
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, user.getEmail());
			pstmt.setString(2, user.getCountry());
			pstmt.setString(3, user.getPassword());
			
			updated = pstmt.executeUpdate() == 1;
		} catch (SQLException e) {
			System.out.println("Exception during pstmt in method updateUser of UserExecutor " + e.getMessage());
		}
		
		return updated;
	}
}

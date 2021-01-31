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
			System.out.println("Exception during pstmt of UserExecutor " + e.getMessage());
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
}

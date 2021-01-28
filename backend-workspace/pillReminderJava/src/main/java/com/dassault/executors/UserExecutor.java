package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.dassault.components.User;
import com.dassault.utils.Constants;

public class UserExecutor {
	public PreparedStatement prepareStmtToAddUser(Connection connection, User user) {
		String userId = "javaUser4";
		
		String query = "INSERT INTO " + Constants.userTb + " (userId, name, emailid, contactNo, dob, country, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
		PreparedStatement pstmt = null;
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, userId);
			pstmt.setString(2, user.getName());
			pstmt.setString(3, user.getEmail());
			pstmt.setString(4, user.getContact());
			pstmt.setDate(5, user.getDob());
			pstmt.setString(6, user.getCountry());
			pstmt.setString(7, user.getPassword());
			System.out.println(pstmt);
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of UserControll " + e.getMessage());
		}
		
		return pstmt;
	}
	
	public ResultSet getResultSetToLogin(Connection connection, String[] loginDetails) {
		String emailId = loginDetails[0];
		String password = loginDetails[1];
		
		String qry = "select userId from " + Constants.userTb + " where emailid = '" + emailId + "' AND password = '" + password +"'";
		PreparedStatement pstmt = null;
		ResultSet resultSet = null;
		
		try {
			pstmt = connection.prepareStatement(qry);
			resultSet = pstmt.executeQuery();
		} catch (SQLException e) {
			System.out.println("Exception for login in getResultSetToLogin method" + e.getMessage());
		}
		
		return resultSet;
	}
	
	public PreparedStatement prepareStmtToSetPasword(Connection connection, String[] forgotPasswordDetais) {
		String userId = forgotPasswordDetais[0];
		String newPassword = forgotPasswordDetais[1];
		
		String query = "UPDATE " + Constants.userTb + " set password = ? where userId = '" + userId +"'";
		PreparedStatement pstmt = null;
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, newPassword);
		} catch (SQLException e) {
			System.out.println("Exception while set new password in executor" + e.getMessage());
		}
		
		return pstmt;
	}
}

package com.dassault.restModules;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.components.User;
import com.dassault.executors.UserExecutor;
import com.dassault.utils.Constants;
import com.dassault.utils.Database;

@RestController
public class UserController {
	Connection connection;
	UserExecutor userExecutor;
	Statement stmt;
	
	public UserController() {
		this.connection = Database.getConnection();
		userExecutor = new UserExecutor();
		try {
			stmt=connection.createStatement();
		} catch (SQLException e) {
			System.out.println("Exception while stmt of UserController : " + e.getMessage());
		}
	}
	
	//registering user 
	@PostMapping("/registerUser")
	public boolean registerUser(@RequestBody User user) {
		PreparedStatement pstmt = userExecutor.prepareStmtToAddUser(connection, user);
		int updatedRows = 0;
		
		try {
			updatedRows = pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Exception while executeUpdate() on pstmt " + e.getMessage());
		}
		
		return updatedRows == 1;
	}
	
	//login of user using emailId and password
	@PostMapping("/login")
	public String login(@RequestBody String[] loginDetails) {
		String userId = null;
		ResultSet resultSet = userExecutor.getResultSetToLogin(connection, loginDetails);
		
		try {
			resultSet.first();
			userId = resultSet.getString(1);
		} catch (SQLException e) {
			System.out.println("exception while looping around resultSet " + e.getMessage());
		}
		
		return userId;
	}
	
	//setting new password
	@PutMapping("/setPassword")
	public boolean setPassword(@RequestBody String[] forgotPasswordDetais) {
		PreparedStatement pstmt = userExecutor.prepareStmtToSetPasword(connection, forgotPasswordDetais);
		int updatedRow = 0;
		try {
			System.out.println(pstmt);
			updatedRow = pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Exception while set new password " + e.getMessage());
		}
		
		return updatedRow == 1;
	}
}

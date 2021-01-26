package com.dassault.restModules;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.components.User;
import com.dassault.utils.Constants;
import com.dassault.utils.Database;

@RestController
public class FlowController {
	
	Connection connection;
	Statement stmt;
	
	public FlowController() {
		
		connection = Database.getConnection();
		
		try {
			stmt=connection.createStatement();
		} catch (SQLException e) {
			System.out.println("Exception while statement : " + e.getMessage());
		}
		
	}
	
	@GetMapping("/")
	public String init() {
		return "welcome to pill reminder";
	}
	
	@PostMapping("/addUser")
	public boolean registerUser(@RequestBody User user) {
//		String firstName = user.getFirstName();
//		String lastName = user.getLastName();
//		String email = user.getEmail();
//		String password = user.getPassword();
//		String values = "'" + firstName + "', '" + lastName + "', '" +  email + "', '" +  password + "'";
//		String query = "insert into "+ Constants.userTb + " (firstName, lastName, email, password) values ( " + values + ")";
//		System.out.println(query);
//		int inserted = 0;
//		try {
//			inserted = stmt.executeUpdate(query);
//		} catch (SQLException e) {
//			System.out.println("Exception while inserting : " + e.getMessage());
//		}
//		
//		System.out.println(inserted);
//		
//		return inserted > 0;
		return false;
	}
}

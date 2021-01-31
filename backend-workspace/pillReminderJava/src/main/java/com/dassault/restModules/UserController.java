package com.dassault.restModules;

import java.sql.Connection;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.components.User;
import com.dassault.executors.PersonExecutor;
import com.dassault.executors.UserExecutor;
import com.dassault.utils.Database;

@RestController
public class UserController {
	Connection connection;
	PersonExecutor personExecutor;
	UserExecutor userExecutor;
	
	public UserController() {
		this.connection = Database.getConnection();
		personExecutor = new PersonExecutor();
		userExecutor = new UserExecutor();
	}
	
	//registering user 
	@PostMapping("/registerUser")
	public boolean registerUser(@RequestBody User user) {
		String userId = UUID.randomUUID().toString();
		userId = userId.replaceAll("-", "");
		
		boolean addPerson = personExecutor.adddPerson(connection, null, userId, user);
		boolean addUser = userExecutor.addUser(connection, null, userId, user);
		
		return addPerson & addUser;
	}
	
	//login of user using emailId and password
	@PostMapping("/login")
	public String login(@RequestBody String[] loginDetails) {
		String userId = userExecutor.getUserId(connection, null, loginDetails);
		return userId;
	}
	
	//setting new password
	@PutMapping("/setPassword")
	public boolean setPassword(@RequestBody String[] forgotPasswordDetais) {
		boolean passwordIsSet = userExecutor.setNewPassword(connection, null, forgotPasswordDetais);
		return passwordIsSet;
	}
}

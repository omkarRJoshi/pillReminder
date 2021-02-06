package com.dassault.restModules;

import java.sql.Connection;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.components.Person;
import com.dassault.components.User;
import com.dassault.executors.DependentExecutor;
import com.dassault.executors.PersonExecutor;
import com.dassault.executors.UserExecutor;
import com.dassault.utils.Database;

@RestController
public class UserController {
	Connection connection;
	PersonExecutor personExecutor;
	UserExecutor userExecutor;
	DependentExecutor dependentExecutor;
	
	public UserController() {
		this.connection = Database.getConnection();
		personExecutor = new PersonExecutor();
		userExecutor = new UserExecutor();
	}
	
	//registering user 
	@CrossOrigin("*")
	@PostMapping("/registerUser")
	public String registerUser(@RequestBody User user) {
		String userId = UUID.randomUUID().toString();
		userId = userId.replaceAll("-", "");
		
		boolean addPerson = personExecutor.adddPerson(connection, null, userId, user);
		boolean addUser = userExecutor.addUser(connection, null, userId, user);
		
		return addPerson & addUser ? userId : "";
	}
	
	//login of user using emailId and password
	@CrossOrigin("*")
	@PostMapping("/login")
	public String login(@RequestBody String[] loginDetails) {
		System.out.println(loginDetails[0]);
		String userId = userExecutor.getUserId(connection, null, loginDetails);
		return userId;
	}
	
	//setting new password
	@CrossOrigin("*")
	@PutMapping("/setPassword")
	public boolean setPassword(@RequestBody String[] forgotPasswordDetais) {
		boolean passwordIsSet = userExecutor.setNewPassword(connection, null, forgotPasswordDetais);
		return passwordIsSet;
	}
	
	//get user data
	@CrossOrigin("*")
	@GetMapping("/user")
	public User getUserDetails(@RequestParam String personId) {
		User user = new User();
		boolean gotPerson = personExecutor.getPerson(connection, null, personId, user);
		boolean gotUser = userExecutor.getUser(connection, null, personId, user);
		
		return (gotPerson && gotUser) ? user : new User();
	}
	//update user
	@CrossOrigin("*")
	@PutMapping("/user/update")
	public boolean updateUser(@RequestParam String personId, @RequestBody User user) {
		System.out.println("update user");
		boolean updatePerson = personExecutor.updatePerson(connection, null, personId, user);
		boolean updateUser = userExecutor.updateUser(connection, null, personId, user);
		System.out.println(updatePerson + " " + updatePerson);
		return updatePerson & updateUser;
	}
	
	
	@CrossOrigin("*")
	@GetMapping("/person")
	public Person getPersonDetails(@RequestParam String personId) {
		Person person = new Person();
		boolean gotPerson = personExecutor.getPerson(connection, null, personId, person);
		
		return (gotPerson) ? person : new Person();
	}
	
}

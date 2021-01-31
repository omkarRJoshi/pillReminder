package com.dassault.restModules;

import java.sql.Connection;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.components.Dependent;
import com.dassault.executors.DependentExecutor;
import com.dassault.executors.PersonExecutor;
import com.dassault.utils.Database;

@RestController
public class DependentController {
	
	Connection connection;
	PersonExecutor personExecutor;
	DependentExecutor dependentExecutor;
	
	//initializing connection and dependentExecutor 
	public DependentController() {
		this.connection = Database.getConnection();
		personExecutor = new PersonExecutor(); 
		dependentExecutor = new DependentExecutor();
	}
	
	//add dependent of an user
	@PostMapping("/user/addDependent")
	public boolean addDependent(@RequestParam String userId, @RequestBody Dependent dependent) {
		String dependentId = UUID.randomUUID().toString();
		dependentId = dependentId.replaceAll("-", "");
		
		boolean addPerson = personExecutor.adddPerson(connection, null, dependentId, dependent);
		boolean setRelation = dependentExecutor.setRelation(connection, null, userId, dependentId, dependent.getRelation());
		
		return addPerson & setRelation;
	}
	
	
	//edit dependent detais
}

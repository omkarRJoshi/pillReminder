package com.dassault.restModules;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.components.Dependent;
import com.dassault.executors.DependentExecutor;
import com.dassault.utils.Database;

@RestController
public class DependentController {
	
	Connection connection;
	DependentExecutor dependentExecutor;
	
	//initializing connection and dependentExecutor 
	public DependentController() {
		this.connection = Database.getConnection();
		dependentExecutor = new DependentExecutor();
	}
	
	//add dependent of an user
	@PostMapping("/user/addDependent")
	public boolean addDependent(@RequestParam String userId, @RequestBody Dependent dependent) {
		int updatedRows = 0;
		
		//initializing preparedStatement using DependentExecutor class
		PreparedStatement pstmt = dependentExecutor.prepareStmtToAddDependent(connection, userId, dependent);
		
		try {
			//pstmt.executeUpdate() return 1 (int) after insertion of single row
			updatedRows = pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt for add Dependent : " + e.getMessage());
		}
		
		return updatedRows == 1;
	}
	
	
	//edit dependent detais
}

package com.dassault.restModules;

import java.sql.Connection;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.executors.MedicalHistoryExecutor;
import com.dassault.utils.Database;
import com.dassault.utils.RestUrls;

@RestController
public class MedicalHistoryController {
	
	Connection connection;
	MedicalHistoryExecutor medicalHistoryExecutor;
	String addUserMedicalHistory = RestUrls.addUserMedicalHistory;
	//initializing connection and medicalHistoryExecutor 
	public MedicalHistoryController() {
		connection = Database.getConnection();
		medicalHistoryExecutor = new MedicalHistoryExecutor();
	}
	
	
	//add medical history of user
	@PostMapping("/user/addMedicalHistory")
	public boolean addUserMedicalHistory() {
		
		return false;
	}
	
	
}

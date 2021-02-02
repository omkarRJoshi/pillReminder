package com.dassault.restModules;

import java.sql.Connection;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dassault.components.MedicalHistory;
import com.dassault.executors.MedicalHistoryExecutor;
import com.dassault.utils.Database;

@RestController
public class MedicalHistoryController {
	
	Connection connection;
	MedicalHistoryExecutor medicalHistoryExecutor;

	//initializing connection and medicalHistoryExecutor 
	public MedicalHistoryController() {
		connection = Database.getConnection();
		medicalHistoryExecutor = new MedicalHistoryExecutor();
	}
	
	
	//add medical history of a person
	@CrossOrigin("*")
	@PostMapping("/person/addMedicalHistory")
	public boolean addUserMedicalHistory(@RequestParam String personId, @RequestBody MedicalHistory medicalHistory) {
		String historyId = UUID.randomUUID().toString();
		historyId = historyId.replaceAll("-", "");
		
		boolean inserted = medicalHistoryExecutor.addMedicalHistory(connection, null, historyId, personId, medicalHistory);
		
		return inserted;
	}
	
	
}

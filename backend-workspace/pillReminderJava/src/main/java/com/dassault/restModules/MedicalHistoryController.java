package com.dassault.restModules;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public String addUserMedicalHistory(@RequestParam String personId, @RequestBody MedicalHistory medicalHistory) {
		String historyId = UUID.randomUUID().toString();
		historyId = historyId.replaceAll("-", "");
		
		boolean inserted = medicalHistoryExecutor.addMedicalHistory(connection, null, historyId, personId, medicalHistory);
		
		return inserted ? historyId : "";
	}
	
	//get medical history of a Person
	@CrossOrigin("*")
	@GetMapping("/person/medicalHistory")
	public ArrayList<MedicalHistory> getMedicalHistory(@RequestParam String personId){
		ArrayList<MedicalHistory> histories = new ArrayList<>();
		medicalHistoryExecutor.getMedicalHistory(connection, null, personId, histories);
		return histories;
	}
	
	//update medical history of a person
	@CrossOrigin("*")
	@PutMapping("/person/medicalHistory/update")
	public boolean updateMedicalHistory(@RequestParam String historyId, @RequestBody MedicalHistory medicalHistory) {
		boolean updated = false;
		
		updated = medicalHistoryExecutor.updateMedicalHistory(connection, null, historyId, medicalHistory);
		
		return updated;
	}
	
	@CrossOrigin("*")
	@DeleteMapping("/person/medicalHistory/delete")
	public boolean deleteMedicalHistory(@RequestParam String historyId) {
		boolean deleted = false;
		deleted = medicalHistoryExecutor.deleteMedicalHistory(connection, null, historyId);
		return deleted;
	}
}

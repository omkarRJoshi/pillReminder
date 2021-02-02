package com.dassault.executors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.dassault.components.MedicalHistory;
import com.dassault.utils.Constants;

public class MedicalHistoryExecutor {
	
	public boolean addMedicalHistory(Connection connection, PreparedStatement pstmt, String historyId, String personId, MedicalHistory medicalHistory) {
		boolean inserted = false;
		String query = "insert into " + Constants.medicalHistoryTb + 
					   "(historyId, personId , illness, doctorDetails, medicine, startDate, endDate, dosageAmt, dosageTime, emailNotfication)  " + 
					   "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, historyId);
			pstmt.setString(2, personId);
			pstmt.setString(3, medicalHistory.getIllness());
			pstmt.setString(4, medicalHistory.getDoctorDetails());
			pstmt.setString(5, medicalHistory.getMedicines());
			pstmt.setDate(6, medicalHistory.getStartDate());
			pstmt.setDate(7, medicalHistory.getEndDate());
			pstmt.setFloat(8, medicalHistory.getDosageAmt());
			pstmt.setTime(9, medicalHistory.getDosageTime());
			pstmt.setBoolean(10, medicalHistory.isEmailNotification());
			System.out.println(pstmt);
			inserted = pstmt.executeUpdate() == 1;
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of MedicalHistoryExecutor " + e.getMessage());
		}
		return inserted;
	}
	
}

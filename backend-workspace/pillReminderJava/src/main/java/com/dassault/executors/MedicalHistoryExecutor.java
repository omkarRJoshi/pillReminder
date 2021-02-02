package com.dassault.executors;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.ArrayList;

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
			inserted = pstmt.executeUpdate() == 1;
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of MedicalHistoryExecutor " + e.getMessage());
		}
		return inserted;
	}
	
	public void getMedicalHistory(Connection connection, PreparedStatement pstmt, String personId, ArrayList<MedicalHistory> histories) {
		String query = "select * from " + Constants.medicalHistoryTb + " where personId = " + "'" + personId + "'";
		ResultSet resultSet;
		try {
			pstmt = connection.prepareStatement(query);
			resultSet = pstmt.executeQuery();
			
			while(resultSet.next()) {
				String illness = resultSet.getString(3);
				String doctorDetails = resultSet.getString(4);
				String medicines = resultSet.getString(5);
				Date startDate = resultSet.getDate(6);
				Date endDate = resultSet.getDate(7);
				float dosageAmt =  resultSet.getFloat(8);
				Time dosageTime = resultSet.getTime(9);
				boolean emailNotification = resultSet.getBoolean(10);
				MedicalHistory history = new MedicalHistory(illness, doctorDetails, medicines, startDate, endDate, dosageAmt, dosageTime, emailNotification);
				histories.add(history);
			}
			
			resultSet.close();
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of getPerson PersonExecutor " + e.getMessage());
		}
	}
	
	public boolean updateMedicalHistory(Connection connection, PreparedStatement pstmt, String historyId, MedicalHistory medicalHistory) {
		boolean updated = false;
		
		String query = "Update " + Constants.medicalHistoryTb + " set " +
					   "illness = ?, doctorDetails = ?, medicine = ?, startDate = ?, endDate = ?, dosageAmt = ?, dosageTime = ?, emailNotfication = ? " +
					   "where historyId = " + "'" + historyId + "'";
		
		try {
			pstmt = connection.prepareStatement(query);
			pstmt.setString(1, medicalHistory.getIllness());
			pstmt.setString(2, medicalHistory.getDoctorDetails());
			pstmt.setString(3, medicalHistory.getMedicines());
			pstmt.setDate(4, medicalHistory.getStartDate());
			pstmt.setDate(5, medicalHistory.getEndDate());
			pstmt.setFloat(6, medicalHistory.getDosageAmt());
			pstmt.setTime(7, medicalHistory.getDosageTime());
			pstmt.setBoolean(8, medicalHistory.isEmailNotification());
			updated = pstmt.executeUpdate() == 1;
			pstmt.close();
		} catch (SQLException e) {
			System.out.println("Exception during pstmt of MedicalHistoryExecutor " + e.getMessage());
		}
		
		return updated;
	}
}

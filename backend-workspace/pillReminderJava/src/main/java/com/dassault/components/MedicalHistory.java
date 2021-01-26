package com.dassault.components;

import java.sql.Date;
import java.sql.Time;

public class MedicalHistory {
	String illness;
	String doctorDetails;
	String medicines;
	Date startDate;
	Date endDate;
	float dosageAmt;
	Time dosageTime;
	boolean emailNotification;
	public MedicalHistory(String illness, String doctorDetails, String medicines, Date startDate, Date endDate,
			float dosageAmt, Time dosageTime, boolean emailNotification) {
		super();
		this.illness = illness;
		this.doctorDetails = doctorDetails;
		this.medicines = medicines;
		this.startDate = startDate;
		this.endDate = endDate;
		this.dosageAmt = dosageAmt;
		this.dosageTime = dosageTime;
		this.emailNotification = emailNotification;
	}
	public String getIllness() {
		return illness;
	}
	public void setIllness(String illness) {
		this.illness = illness;
	}
	public String getDoctorDetails() {
		return doctorDetails;
	}
	public void setDoctorDetails(String doctorDetails) {
		this.doctorDetails = doctorDetails;
	}
	public String getMedicines() {
		return medicines;
	}
	public void setMedicines(String medicines) {
		this.medicines = medicines;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public float getDosageAmt() {
		return dosageAmt;
	}
	public void setDosageAmt(float dosageAmt) {
		this.dosageAmt = dosageAmt;
	}
	public Time getDosageTime() {
		return dosageTime;
	}
	public void setDosageTime(Time dosageTime) {
		this.dosageTime = dosageTime;
	}
	public boolean isEmailNotification() {
		return emailNotification;
	}
	public void setEmailNotification(boolean emailNotification) {
		this.emailNotification = emailNotification;
	}
	
	
}

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_INFO_ABOUT_CLOSE_DISEASE')
	DROP PROC GET_INFO_ABOUT_CLOSE_DISEASE;

GO
CREATE PROCEDURE GET_INFO_ABOUT_CLOSE_DISEASE
	@PATIENT_ID INT
AS
BEGIN
	SELECT SUBDISEASES.SUBDISEASENAME, USERS1.FIRSTNAME AS DOCTOR_OPEN_FIRSTNAME, USERS1.LASTNAME AS DOCTOR_OPEN_LASTNAME, 
	SCHEDULE1.START_DATETIME,MEDICAL_CARD1.DESCRIPTION, MEDICAL_CARD1.CURE, 
	USERS2.FIRSTNAME AS DOCTOR_CLOSE_FIRSTNAME, USERS2.LASTNAME AS DOCTOR_CLOSE_LASTNAME,
	SCHEDULE2.START_DATETIME AS END_TIME
	FROM (PATIENT_DISEASES INNER JOIN SCHEDULE SCHEDULE1 ON PATIENT_DISEASES.ID_VISIT = SCHEDULE1.ID
							INNER JOIN MEDICAL_CARD MEDICAL_CARD1 ON PATIENT_DISEASES.ID_VISIT = MEDICAL_CARD1.ID_VISIT 
							INNER JOIN USERS USERS1 on SCHEDULE1.IDDOCTOR=USERS1.IDUsers
							INNER JOIN SCHEDULE SCHEDULE2 ON PATIENT_DISEASES.END_DATETIME = SCHEDULE2.ID
							INNER JOIN USERS USERS2 on SCHEDULE2.IDDOCTOR=USERS2.IDUsers
							INNER JOIN SUBDISEASES ON SUBDISEASES.SUBDISEASEID=PATIENT_DISEASES.ID_DISEASE
							) 
	WHERE (SCHEDULE1.IDPATIENT = @PATIENT_ID AND PATIENT_DISEASES.END_DATETIME IS NOT NULL)
END;
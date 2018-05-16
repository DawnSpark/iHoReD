﻿IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='GET_MEDICAL_CARD_BY_USER_ID')
BEGIN
	DROP PROC GET_MEDICAL_CARD_BY_USER_ID
END
GO

CREATE PROCEDURE GET_MEDICAL_CARD_BY_USER_ID
@ID_USER INT, @ELEMENT_COUNT INT, @PAGE_NUMBER INT AS
BEGIN
	WITH NUMBERED_MY_TABLE AS
	(
		SELECT  MEDICAL_CARD.ID AS "CARD_ID", MEDICAL_CARD.DESCRIPTION, MEDICAL_CARD.CURE, USERS.FIRSTNAME AS DOCTOR_FIRSTNAME, USERS.LASTNAME AS DOCTOR_LASTNAME,
		SCHEDULE.IDPATIENT, SCHEDULE.START_DATETIME AS SESSION_START_DATETIME,
		SCHEDULE.ID AS "ID_VISIT", SUBDISEASES.UBDISEASENAME, ROW_NUMBER() OVER (ORDER BY SCHEDULE.START_DATETIME DESC) AS ROWNUMBER
		FROM MEDICAL_CARD
		INNER JOIN SCHEDULE ON MEDICAL_CARD.ID_VISIT = SCHEDULE.ID
		LEFT JOIN PATIENT_DISEASES ON SCHEDULE.ID=PATIENT_DISEASES.ID_VISIT
		LEFT JOIN SUBDISEASES ON PATIENT_DISEASES.ID_DISEASE = SUBDISEASES.SUBDISEASEID
		INNER JOIN USERS ON IDDOCTOR= USERS.IDUsers
		WHERE (SCHEDULE.IDPATIENT = @ID_USER)
	)
	SELECT CARD_ID, DESCRIPTION, CURE, DOCTOR_FIRSTNAME, DOCTOR_LASTNAME, IDPATIENT, SESSION_START_DATETIME, ID_VISIT, SUBDISEASENAME
	FROM NUMBERED_MY_TABLE
	WHERE ROWNUMBER BETWEEN (@PAGE_NUMBER-1) * @ELEMENT_COUNT + 1 AND @ELEMENT_COUNT * @PAGE_NUMBER
	ORDER BY SESSION_START_DATETIME DESC;
END;

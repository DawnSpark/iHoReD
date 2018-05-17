IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'RULESETS')
	BEGIN
		DROP TABLE RULESETS;
	END
	BEGIN
		CREATE TABLE RULESETS (
			DOCTOR_ID INT FOREIGN KEY REFERENCES DOCTORS(IDDoctors) ON DELETE CASCADE,
			RULE_ID INT FOREIGN KEY REFERENCES RULES(ID) ON DELETE CASCADE,
			PRIMARY KEY (DOCTOR_ID,RULE_ID)
		)
	END;
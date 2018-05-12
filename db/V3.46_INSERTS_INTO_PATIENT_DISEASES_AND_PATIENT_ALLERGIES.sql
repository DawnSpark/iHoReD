BEGIN TRANSACTION;

INSERT INTO PATIENT_DISEASES 
SELECT TOP 10 SUBDISEASEID,
(SELECT TOP 1 ID FROM SCHEDULE),
'2018-04-30',GETDATE()
FROM SUBDISEASES;

INSERT INTO PATIENT_DISEASES(ID_DISEASE,ID_VISIT,START_DATETIME)
SELECT TOP 10 SUBDISEASEID,
(SELECT MAX(ID) FROM SCHEDULE),
'2018-05-10'
FROM SUBDISEASES;

 INSERT INTO PATIENT_ALLERGIES
 SELECT TOP 10 ID_ALLERGY ,
 (SELECT TOP 1 ID
 FROM SCHEDULE),GETDATE()
 FROM ALLERGIES;

 INSERT INTO PATIENT_ALLERGIES(ID_VISIT,ID_ALLERGY,START_DATETIME)
 SELECT TOP 10 ID,
 (SELECT TOP 1 ID_ALLERGY FROM ALLERGIES),
 GETDATE()
 FROM SCHEDULE;
 
 COMMIT TRANSACTION;

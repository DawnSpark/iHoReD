IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='CHANGE_ROLE')
BEGIN
 DROP PROC CHANGE_ROLE
END
GO
CREATE PROCEDURE CHANGE_ROLE 
    @ID_USER INT, @ROLE INT, @ID_PROFESSION INT=0
AS
IF(@ID_PROFESSION=0)
BEGIN
BEGIN TRANSACTION
UPDATE USERS SET IDROLE=@ROLE WHERE IDUsers= @ID_USER
UPDATE DOCTORS SET DATE_OF_DELAY=GETDATE() WHERE IDDoctors=@ID_USER
COMMIT TRANSACTION;
END;
ELSE
BEGIN
BEGIN TRANSACTION
UPDATE USERS SET IDROLE=@ROLE WHERE IDUsers= @ID_USER 
INSERT INTO DOCTORS(IDDoctors,IDPROFESSION,HOURSTART,HOURFINISH,DATEOFEMPLOYING,IMAGEDOC) VALUES(@ID_USER,@ID_PROFESSION,'12:00:00','18:00:00',GETDATE(),'D:\Photo\photo4.jpg') 
COMMIT TRANSACTION;   
END;

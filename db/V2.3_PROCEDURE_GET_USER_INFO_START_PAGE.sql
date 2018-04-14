GO
CREATE PROCEDURE GET_USER_INFO_START_PAGE 
    @LOGIN NVARCHAR(40), @PASSWORD NVARCHAR(30)
AS
BEGIN
    IF ((SELECT COUNT(*) FROM USERS WHERE LOGIN = @LOGIN AND PASSWORD=@PASSWORD) = 0) RETURN 0;
    ELSE 
    BEGIN 
        --INSERT INTO USERS (FIRSTNAME, LASTNAME, IDROLE, PASSWORD, EMAIL, IS_ACTIVATED) VALUES(@FIRSTNAME, @LASTNAME, 3, @PASSWORD, @EMAIL, 0);
        SELECT USERS.IDUsers, USERS.FIRSTNAME, USERS.LASTNAME, ROLES.ROLENAME, USERS.LOGIN, USERS.PASSWORD, USERS.EMAIL
		FROM USERS INNER JOIN ROLES 
		ON USERS.IDROLE=ROLES.IDRoles
		WHERE LOGIN = @LOGIN
		
		RETURN 1;
    END
END;
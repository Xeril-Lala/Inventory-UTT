DROP DATABASE IF EXISTS INVENTORY_UTT;
CREATE DATABASE INVENTORY_UTT;
USE INVENTORY_UTT;

-- TABLES

-- * TABLE USER
-- ADD PK, UNIQUE
DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
    USER_ID INT NOT NULL,
    USERNAME VARCHAR(20) NOT NULL,
    NAME VARCHAR(150) NOT NULL,
    LASTNAME VARCHAR(150) NOT NULL,
    PASSWORD VARCHAR(150) NOT NULL
);

ALTER TABLE USER ADD PRIMARY KEY PK_USER (USER_ID, USERNAME),
            MODIFY USER_ID INT NOT NULL AUTO_INCREMENT,
            ADD UNIQUE UQ_USER (USERNAME);

-- * TABLE USER_CONTACT
-- ADD PK, UNIQUE
DROP TABLE IF EXISTS USER_CONTACT;
CREATE TABLE USER_CONTACT (
    USER_ID INT NOT NULL,
    KEY1 VARCHAR(100),
    KEY2 VARCHAR(100),
    EMAIL1 TEXT NULL,
    EMAIL2 TEXT NULL,
    PHONE1 TEXT NULL,
    PHONE2 TEXT NULL,
    ADDRESS TEXT NULL
);

ALTER TABLE USER_CONTACT ADD PRIMARY KEY PK_USER_CONTACT (USER_ID),
            ADD FOREIGN KEY FK_USER_CONTACT (USER_ID) REFERENCES USER(USER_ID);

-- * TABLE ASSET
-- ADD PK, UNIQUE
DROP TABLE IF EXISTS ASSET;
CREATE TABLE ASSET (
    ASSET_CODE VARCHAR(10) NOT NULL,
    VALUE VARCHAR(450) NOT NULL,
    KEY1 VARCHAR(100) NOT NULL,
    KEY2 VARCHAR(100),
    KEY3 VARCHAR(100),
    DESC1 TEXT NULL,
    DESC2 TEXT NULL,
    DESC3 TEXT NULL,
    BIN LONGBLOB NULL
);

ALTER TABLE ASSET ADD CONSTRAINT PRIMARY KEY PK_ASSET (ASSET_CODE),
                  ADD CONSTRAINT UNIQUE UQ_ASSET_CODE (ASSET_CODE),
                  ADD INDEX IDX_ASSET_KEY (KEY1);

-- TABLES
-- * TABLE BRAND
-- ADD PK, UNIQUE

    # DROP TABLE IF EXISTS BRAND;
    # CREATE TABLE BRAND (
    # 	BRAND_ID INT NOT NULL,
    #     NAME VARCHAR(300)
    # );
    #
    # ALTER TABLE BRAND ADD PRIMARY KEY PK_BRAND (BRAND_ID),
    #             MODIFY BRAND_ID INT NOT NULL AUTO_INCREMENT,
    #             ADD UNIQUE UQ_BRAND (NAME);

-- * TABLE MODEL
-- ADD PK, UNIQUE, FK

    # DROP TABLE IF EXISTS MODEL;
    # CREATE TABLE MODEL (
    # 	MODEL_ID INT NOT NULL,
    #     BRAND_ID INT NOT NULL,
    #     NAME VARCHAR(100)
    # );
    #
    # ALTER TABLE MODEL ADD PRIMARY KEY PK_MODEL (MODEL_ID),
    #             MODIFY MODEL_ID INT NOT NULL AUTO_INCREMENT,
    #             ADD FOREIGN KEY FK_MODEL_BRAND (BRAND_ID) REFERENCES MODEL (MODEL_ID),
    #             ADD UNIQUE UQ_MODEL (NAME);

-- * TABLE INVENTORY
-- ADD PK, UNIQUE, DEFAULTS
DROP TABLE IF EXISTS INVENTORY;
CREATE TABLE INVENTORY (
	INVENTORY_ID INT NOT NULL,
    CUSTOM_ID VARCHAR(50) NOT NULL,
    DESCRIPTION TEXT,
    NAME VARCHAR (100),
    ACQUISITION_DT DATETIME NOT NULL DEFAULT NOW(),
    MODEL_CODE VARCHAR(450) NULL,
    SERIAL VARCHAR(150) NULL,
    CONDITION_USE VARCHAR(500)
    -- , IMG LONGBLOB NULL
);

ALTER TABLE INVENTORY ADD PRIMARY KEY PK_INVENTORY (INVENTORY_ID),
            MODIFY INVENTORY_ID INT NOT NULL AUTO_INCREMENT,
            ADD FOREIGN KEY FK_INVENTORY_MODEL (MODEL_CODE)  REFERENCES ASSET (ASSET_CODE),
            ADD UNIQUE UQ_INVENTORY_CMD (CUSTOM_ID);

-- * TABLE LOAN_MODE
-- ADD PK, UNIQUE, DEFAULTS
DROP TABLE IF EXISTS LOAN_MODE;
CREATE TABLE LOAN_MODE (
    LM_CODE VARCHAR(100),
    DURATION_UNIT VARCHAR(20) NULL,
    DURATION BIGINT NULL
);

ALTER TABLE LOAN_MODE ADD PRIMARY KEY PK_LOAN_MODE (LM_CODE);

-- * TABLE LOAN
-- ADD PK, UNIQUE, DEFAULTS
DROP TABLE IF EXISTS LOAN;
CREATE TABLE LOAN(
    LOAN_ID INT NOT NULL,
    COMMENTS TEXT NULL,
    LOAN_DT DATETIME NOT NULL,
    RETURN_DT DATETIME NULL,
    LOAN_MODE VARCHAR(100) NOT NULL,
    LOAN_STATUS VARCHAR(100) NOT NULL
);

ALTER TABLE LOAN ADD PRIMARY KEY PK_LOAN (LOAN_ID),
            MODIFY LOAN_ID INT NOT NULL AUTO_INCREMENT;
        --  ADD FOREIGN KEY FK_LOAN_MODE (LOAN_MODE) REFERENCES LOAN_MODE(LM_CODE);

-- * TABLE LOAN_DTL
-- ADD PK, UNIQUE, DEFAULTS
DROP TABLE IF EXISTS LOAN_DTL;
CREATE TABLE LOAN_DTL (
    LOAN_DTL_ID INT NOT NULL,
    LOAN_ID INT NOT NULL,
    INVENTORY_ID INT NOT NULL,
    DESCRIPTION TEXT,
    LOAN_STATUS VARCHAR(100)
);

ALTER TABLE LOAN_DTL ADD PRIMARY KEY PK_LOAN_DTL (LOAN_DTL_ID),
            MODIFY LOAN_DTL_ID INT NOT NULL AUTO_INCREMENT,
            ADD FOREIGN KEY FK_DTL_LOAN (LOAN_ID) REFERENCES LOAN (LOAN_ID);

-- * TABLE LOAN_LOCATION
-- ADD PK, UNIQUE, DEFAULTS
DROP TABLE IF EXISTS LOAN_LOCATION;
CREATE TABLE LOAN_LOCATION (
    LOAN_ID INT NOT NULL,
    LOCATION_CODE VARCHAR(450) NOT NULL,
    DESCRIPTION TEXT NULL
);

ALTER TABLE LOAN_LOCATION ADD PRIMARY KEY PK_LOAN_LOCATION (LOAN_ID, LOCATION_CODE),
            ADD FOREIGN KEY FK_LOAN_LOCATION (LOCATION_CODE) REFERENCES ASSET (ASSET_CODE);

-- * SP ADD_AUDIT_COLUMNS;
DROP PROCEDURE IF EXISTS ADD_AUDIT_COLUMNS;
DELIMITER //
CREATE PROCEDURE ADD_AUDIT_COLUMNS(
    IN IN_DB VARCHAR(100),
	OUT OUT_MSG VARCHAR(500)
)
BEGIN
    DECLARE TABLE_N VARCHAR(300) DEFAULT '';
	DECLARE TABLES_C CURSOR FOR SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = IN_DB;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @errmsg = MESSAGE_TEXT;
		SET OUT_MSG = HANDLE_EXCEPTION('ADD_AUDIT_COLUMNS', @errno, @errmsg);
	END;

    DECLARE EXIT HANDLER FOR NOT FOUND
	BEGIN
		-- Do nothing to handle "No data" error
	END;

	SET OUT_MSG = 'OK';

    OPEN TABLES_C;
    TABLE_LOOP: LOOP

		FETCH TABLES_C INTO TABLE_N;

        SET @s = CONCAT(
			'ALTER TABLE ',
				TABLE_N ,
			' ADD STATUS VARCHAR(40) NOT NULL DEFAULT \'ENABLED\' CHECK (STATUS IN (\'ENABLED\', \'DISABLED\')),
              ADD CREATED_ON DATETIME NOT NULL DEFAULT NOW(),
              ADD CREATED_BY VARCHAR(50),
              ADD UPDATED_ON DATETIME,
              ADD UPDATED_BY VARCHAR(50)'
		);

		PREPARE stmt FROM @s;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;

	END LOOP;
    CLOSE TABLES_C;

END
//
DELIMITER ;

SET @msg = null;
CALL ADD_AUDIT_COLUMNS('INVENTORY_UTT', @msg);
select @msg;

-- * SP HANDLE_EXCEPTION
DROP FUNCTION IF EXISTS HANDLE_EXCEPTION;
DELIMITER //
CREATE FUNCTION HANDLE_EXCEPTION(
    OBJECT_NAME VARCHAR(500),
    ERRCODE VARCHAR(500),
    MSG VARCHAR(500)
)
RETURNS VARCHAR(500) DETERMINISTIC
BEGIN
    DECLARE error_msg VARCHAR(500);
    SET error_msg = CONCAT('Exception at: ', OBJECT_NAME, ' - Error Code: ', ERRCODE, ', Error Message: ', MSG);
    RETURN error_msg;
END //
DELIMITER ;

-- * SP GET_STATUS_FN
DROP FUNCTION IF EXISTS GET_STS_FN;
DELIMITER //
CREATE FUNCTION GET_STS_FN(
    BOL BOOL
)
RETURNS VARCHAR(40) DETERMINISTIC
BEGIN
    RETURN IF(BOL, 'ENABLED', 'DISABLED');
END //
DELIMITER ;

SELECT GET_STS_FN(FALSE);
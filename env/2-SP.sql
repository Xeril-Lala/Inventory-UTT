-- * SP SET_ASSET
DROP PROCEDURE IF EXISTS SET_ASSET;
DELIMITER //
CREATE PROCEDURE SET_ASSET (
    IN IN_CODE      VARCHAR(10),
    IN IN_VALUE     VARCHAR(450),
    IN IN_KEY1      VARCHAR(100),
    IN IN_KEY2      VARCHAR(100),
    IN IN_KEY3      VARCHAR(100),
    IN IN_DESC1     TEXT,
    IN IN_DESC2     TEXT,
    IN IN_DESC3     TEXT,
    IN IN_HEX_BIN   LONGTEXT,
    IN IN_USER      VARCHAR(50),
    IN IN_STATUS    BOOL,
    OUT OUT_MSG     VARCHAR(450)
) BEGIN
    BEGIN
		GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @errmsg = MESSAGE_TEXT;
		SET OUT_MSG = HANDLE_EXCEPTION('SET_ASSET', @errno, @errmsg);
	END;
    SET OUT_MSG = 'OK';

    UPDATE ASSET SET
        VALUE = IFNULL(IN_VALUE, VALUE),
        KEY1 = IFNULL(IN_KEY1, KEY1),
        KEY2 = IFNULL(IN_KEY2, KEY2),
        KEY3 = IFNULL(IN_KEY3, KEY3),
        DESC1 = IFNULL(IN_DESC1, DESC1),
        DESC2 = IFNULL(IN_DESC2, DESC2),
        DESC3 = IFNULL(IN_DESC3, DESC3),
        BIN =  IFNULL(UNHEX(IN_HEX_BIN), BIN),
        STATUS = GET_STS_FN(IN_STATUS),
        UPDATED_ON = NOW(),
        UPDATED_BY = IN_USER
    WHERE
        ASSET_CODE = IN_CODE;

    IF ROW_COUNT() = 0 THEN
        INSERT INTO ASSET
        (
             ASSET_CODE,
             VALUE,
             KEY1,
             KEY2,
             KEY3,
             DESC1,
             DESC2,
             DESC3,
             BIN,
             STATUS,
             CREATED_BY
        )
        VALUES
        (
            IN_CODE,
            IN_VALUE,
            IN_KEY1,
            IN_KEY2,
            IN_KEY3,
            IN_DESC1,
            IN_DESC2,
            IN_DESC3,
            UNHEX(IN_HEX_BIN),
            GET_STS_FN(IN_STATUS),
            IN_USER
        );
    END IF;
END //
DELIMITER ;

/*SET @MSG = NULL;
CALL SET_ASSET(
    'TEST',
    'ABC',
    'GROUP1',
    NULL,
    NULL,
    'DESCRIPTION - UPDATE',
    NULL,
    NULL,
    NULL,
    'DBA',
    TRUE,
    @MSG
);
SELECT @MSG;*/

-- * SP SET_INVENTORY
DROP PROCEDURE IF EXISTS SET_INVENTORY;
DELIMITER //
CREATE PROCEDURE SET_INVENTORY (
    IN IN_ID INT,
    IN IN_CM_ID VARCHAR(50),
    IN IN_DESC TEXT,
    IN IN_NAME VARCHAR(100),
    IN IN_ACQUISITION_DT DATETIME,
    IN IN_MODEL_CODE VARCHAR(450),
    IN IN_SERIAL VARCHAR(150),
    IN IN_CONDITION VARCHAR(500),
    IN IN_USER VARCHAR(50),
    IN IN_STATUS BOOL,
    OUT OUT_MSG VARCHAR(50)
) BEGIN
    BEGIN
		GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @errmsg = MESSAGE_TEXT;
		SET OUT_MSG = HANDLE_EXCEPTION('SET_INVENTORY', @errno, @errmsg);
	END;
    SET OUT_MSG = 'OK';

    UPDATE INVENTORY SET
        CUSTOM_ID = IFNULL(IN_CM_ID, CUSTOM_ID),
        DESCRIPTION = IN_DESC,
        NAME = IFNULL(IN_NAME, NAME),
        ACQUISITION_DT = IFNULL(IN_ACQUISITION_DT, NOW()),
        MODEL_CODE = IFNULL(IN_MODEL_CODE, MODEL_CODE),
        SERIAL = IFNULL(IN_SERIAL, SERIAL),
        CONDITION_USE = IN_CONDITION,
        STATUS = GET_STS_FN(IN_STATUS),
        UPDATED_BY = IN_USER,
        UPDATED_ON = NOW()
    WHERE
        INVENTORY_ID = IN_ID;

    IF ROW_COUNT() = 0 THEN
        INSERT INTO INVENTORY
        (
            INVENTORY_ID,
            CUSTOM_ID,
            DESCRIPTION,
            NAME,
            ACQUISITION_DT,
            MODEL_CODE,
            SERIAL,
            CONDITION_USE,
            CREATED_BY,
            STATUS
         )
        VALUES
        (
            IN_ID,
            IN_CM_ID,
            IN_DESC,
            IN_NAME,
            IN_ACQUISITION_DT,
            IN_MODEL_CODE,
            IN_SERIAL,
            IN_CONDITION,
            IN_USER,
            GET_STS_FN(IN_STATUS)
        );
    END IF;
END //
DELIMITER ;

/*SET @msg = null;
CALL SET_INVENTORY(
    NULL,
    'ABCXXXX122',
    'DESCRIPTION',
    'INV_1',
    NOW(),
    'TEST',
    'TEST123',
    'CONDITION TEST - UPDATE',
    'DBA',
    TRUE,
    @msg
);
SELECT @msg;*/

-- * SP SET_LOAN_NODE
DROP PROCEDURE IF EXISTS SET_LOAN_MODE;
DELIMITER //
CREATE PROCEDURE SET_LOAN_MODE(
    IN IN_MODE VARCHAR(100),
    IN IN_UNIT VARCHAR(20),
    IN IN_DURATION BIGINT,
    IN IN_USER VARCHAR(50),
    IN IN_STATUS BOOL,
    OUT OUT_MSG VARCHAR(450)
) BEGIN
    BEGIN
		GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @errmsg = MESSAGE_TEXT;
		SET OUT_MSG = HANDLE_EXCEPTION('SET_LOAN_MODE', @errno, @errmsg);
	END;
    SET OUT_MSG = 'OK';
END //
DELIMITER ;

-- * SP SET_LOAN
DROP PROCEDURE IF EXISTS SET_LOAN;
DELIMITER //
CREATE PROCEDURE SET_LOAN (
    IN IN_ID INT,
    IN IN_COMMENT TEXT,
    IN IN_LN_DT DATETIME,
    IN IN_RN_DT DATETIME,
    IN IN_MODE VARCHAR(100),
    IN IN_LN_STS VARCHAR(100),
    IN IN_USER VARCHAR(50),
    IN IN_STATUS BOOL,
    OUT OUT_ID INT,
    OUT OUT_MSG VARCHAR(450)
) BEGIN
    BEGIN
		GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @errmsg = MESSAGE_TEXT;
		SET OUT_MSG = HANDLE_EXCEPTION('SET_LOAN', @errno, @errmsg);
	END;
    SET OUT_MSG = 'OK';
    SET OUT_ID = NULL;

    UPDATE LOAN SET
        COMMENTS = IN_COMMENT,
        LOAN_DT = IFNULL(IN_LN_DT, LOAN_DT),
        RETURN_DT = IFNULL(IN_RN_DT, RETURN_DT),
        LOAN_MODE = IN_MODE,
        LOAN_STATUS = IN_LN_STS,
        UPDATED_ON = NOW(),
        UPDATED_BY = IN_USER,
        STATUS = GET_STS_FN(IN_STATUS)
    WHERE
        LOAN_ID = IN_ID;

    SET OUT_ID = IN_ID;

    IF ROW_COUNT() = 0 THEN
        INSERT INTO LOAN
        (
            LOAN_ID,
            COMMENTS, LOAN_DT,
            RETURN_DT, LOAN_MODE,
            LOAN_STATUS, CREATED_BY,
            STATUS
        )
        VALUES
        (
            IN_ID,
            IN_COMMENT, IFNULL(IN_LN_DT, NOW()),
            IN_RN_DT, IN_MODE,
            IN_LN_STS, IN_USER,
            GET_STS_FN(IN_STATUS)
        );
        SET OUT_ID = LAST_INSERT_ID();
    END IF;
END //
DELIMITER ;

/*SET @msg = null, @m_id = null;
CALL SET_LOAN(
    1,
    'COMMENT - UPDATE',
    NULL,
    NOW() + 1,
    'MODE1',
    'STS_TEST',
    'DBA',
    TRUE,
    @m_id,
    @msg
);
SELECT @msg result, @m_id id;*/

-- * SP SET_LOAN
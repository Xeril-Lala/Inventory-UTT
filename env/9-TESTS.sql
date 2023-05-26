USE INVENTORY_UTT;

SET @MSG = NULL;

CALL SET_USER(
	'USR',
	'User',
    'Lastname',
    '8udw153r_',
	'DBA',
    TRUE,
    @MSG
);
SELECT @MSG;

CALL SET_USER_CONTACT(
	'USR',
    '0319125293',
    NULL,
    'ltonatiuh.011@gmail.com',
    'Tonatiuh.Lopez@exelaonline.com',
    '6631226015',
    NULL,
    'Blvd. Bellas Artes, 19842.',
    'DBA',
    TRUE,
    @MSG
);
SELECT @MSG;

CALL SET_ASSET(
    'TEST',
    'ABC',
    'MODEL',
    'BR1',
    NULL,
    'DESCRIPTION - UPDATE',
    NULL,
    NULL,
    NULL,
    'DBA',
    TRUE,
    @MSG
);
CALL SET_ASSET(
    'LOC_A',
    'ABC_LOC',
    'LOCATION',
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
SELECT @MSG;

CALL SET_INVENTORY(
    1,
    'ABCXXXX122',
    'DESCRIPTION',
    'INV_1',
    NOW(),
    NULL,-- 'MD1',-- 'TEST',
    'TEST123',
    'CONDITION TEST - UPDATE',
    'DBA',
    TRUE,
    @msg
);
SELECT @msg;

CALL SET_LOAN_MODE(
	'TEST_MODE',
	'hh',
    25,
    'DBA',
    TRUE,
	@msg
);
SELECT @msg;

SET @m_id = null;
CALL SET_LOAN(
    1,
    'COMMENT - UPDATE',
    NULL,
    NOW() + 1,
    'TEST_MODE',
    'STS_TEST',
    'DBA',
    TRUE,
    @m_id,
    @msg
);
SELECT @msg result, @m_id id;

SET @m_id_dtl = null;
CALL SET_LOAN_DTL(
    null,
    @m_id,
    1,
    'Object 1',
	'LOANED',
    'DBA',
    TRUE,
    @m_id_dtl,
	@msg
);
SELECT @msg, @m_id_dtl DTL_ID;

CALL SET_LOAN_LOCATION(
	@m_id,
    'LOC_A',
    'Ubication for test',
    'DBA',
    true,
    @msg
);
SELECT @msg;

CALL GET_ASSET_GROUP(
	NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    @msg
);
SELECT @msg;

CALL GET_USER(
	NULL,
    'T',
    NULL,
    @msg
);



SELECT 
	CONCAT('public const string ', routine_name, ' = "', routine_name, '";') as NAMES
FROM
    information_schema.routines
WHERE
    routine_type = 'PROCEDURE'
AND routine_schema = 'INVENTORY_UTT';
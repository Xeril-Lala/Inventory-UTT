SET @MSG = NULL;
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
SELECT @MSG;

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
    null,
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
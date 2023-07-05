export const C = {
    api_url: () => process.env.REACT_APP_API_URL,
    status: {
        common: {
            ok: 'OK',
            error: 'ERROR',
            complete: 'COMPLETE',
            no_auth: 'NO_AUTH'
        },
        loan: {
            // TODO: Add your common status
        },
        loan_detail: {
            // TODO: Add your common detail status
        }
    },
    media: {
        // TODO: Path to static images, logos, media, etc
    },
    // TODO: Add Input Patterns!
    inputPatterns: {
        username: '/^[a-zA-Z0-9_.-]{4,}$/',
        password: '/^.{4,}$/'
    }
};
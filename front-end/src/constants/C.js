export default {
    api_url: () => process.env.API_URL,
    status: {
        common: {
            ok: 'OK',
            error: 'ERROR',
            complete: 'COMPLETE'
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
    }
};
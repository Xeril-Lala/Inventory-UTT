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
    },
    styles: {
        dataTable: {
            rows: {
                style: {
                    minHeight: '4em',
                },
            },
            headCells: {
                style: {
                    paddingLeft: '2px',
                    paddingRight: '2px',
                },
            },
            cells: {
                style: {
                    paddingLeft: '2px',
                    paddingRight: '2px',
                },
            },
            header: {
                style: {
                    fontSize: '16pt',
                    padding: '0px',
                },
            },
            headRow: {
                style: {
                    fontSize: '1.5em',
                },
            },
            responsiveFont: 'sm:text-xs md:text-sm lg:text-base xl:text-lg',
        }
    }
};
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
            PRESTADO: 'PRESTADO',
            RESGUARDO: 'RESGUARDO',
            VENCIDO: 'VENCIDO',
            TERMINADO: 'TERMINADO',
            PERDIDO: 'PERDIDO',
            MOBILIARIO: 'MOBILIARIO'
        },
        loan_detail: {
            // TODO: Add your common detail status
        }
    },
    roles: {
        ADMIN: "ADMIN",
        DEV: "DEV",
        LAB_ADMIN: "LAB_ADMIN",
        PROF: "PROF",
        STU: "STU",
        USER: "USER"
    },
    tipo: {
        RESGUARDO: 'RESGUARDO',
        PRESTAMO: 'PRESTAMO',
        MOBILIARIO: 'MOBILIARIO'
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
        }
    }
};
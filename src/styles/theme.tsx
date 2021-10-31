import React, { ReactNode, useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { ColorModeContext } from '../components/Header';

interface Props {
    children: ReactNode;
};

const ToggleTheme: React.FC<Props> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
                components: {
                    MuiCardHeader: {
                        styleOverrides: {
                            title: {
                                fontSize: '1rem',
                            }
                        }
                    },
                    MuiButton: {
                        styleOverrides: {
                            text: {
                                color: '#FFFFFF',
                            }
                        }
                    },
                    MuiTab: {
                        styleOverrides: {
                            root: {
                                color: '#FFFFFF',
                                padding: 0,
                                margin: '0 10px',
                                "&.Mui-selected": {
                                    color: '#FFFFFF',
                                },
                                maxWidth: 130,
                                width: '100%'
                            },
                            textColorPrimary: '#FFFFFF',
                        }
                    },
                    MuiTabs: {
                        styleOverrides: {
                            indicator: {
                                background: '#FFFFFF',
                            },
                            flexContainer: {
                                flexWrap: 'wrap',
                            }
                        }
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                border: '2px solid #92d6a4',
                                boxShadow: "none",
                            },
                        }
                    },
                    MuiTextField: {
                        styleOverrides: {
                            root: {
                                ":focus": {
                                    background: 'black'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3a4a3f',
                                    },
                                },
                            }
                        }
                    },
                }
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ToggleTheme;

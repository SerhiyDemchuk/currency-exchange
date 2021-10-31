import React from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs, Theme } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        maxWidth: 500,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
        },
    }
}));

interface Props {

}

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const Header: React.FC<Props> = () => {
    const classes = useStyles();
    const { push } = useHistory();
    const [route, setRoute] = React.useState('/all_currencies');

    const handleChange = (event: React.SyntheticEvent, route: string) => {
        setRoute(route);
        push(route);
    };

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingY: 1,
                paddingX: 2,
                marginBottom: 5,
                flexGrow: 1,
                borderBottom: 1,
                borderColor: 'divider',
                background: '#3a4a3f',
            }}
        >
            <Tabs className={classes.tabs} onChange={handleChange} value={route} >
                <Tab label="All currencies" value="/all_currencies" />
                <Tab label="My currencies" value="/my_currencies" />
            </Tabs>
            <Box
                sx={{
                    maxWidth: 150,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.secondary',
                    borderRadius: 1,
                    px: 2,
                    mr: 4

                }}
            >
                {theme.palette.mode} mode
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Box>
        </Box>
    );
}

export default Header;

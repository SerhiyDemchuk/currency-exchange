import { Autocomplete, TextField, Theme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";

interface Props {
    searchCurrencyName: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: 545,
            width: '100%',
        }
    }
}));

const SearchInput: React.FC<Props> = ({ searchCurrencyName }) => {
    const classes = useStyles();
    return (
        <Autocomplete
            disablePortal
            options={['']}
            sx={{ maxWidth: 300, width: '100%' }}
            className={classes.input}
            popupIcon={<SearchIcon />}
            renderInput={(params) => <TextField onChange={searchCurrencyName} {...params} label="Search by name" />}
        />
    );
}

export default SearchInput;
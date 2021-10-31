import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';

interface Props {
    currencyName: string;
    isAdded: boolean;
    handleCurrency: (name: string, isAdded: boolean) => void;
}

const Item: React.FC<Props> = ({ currencyName, isAdded, handleCurrency }) => {
    const { push } = useHistory();
    return (
        <Card
            sx={{ maxWidth: 545, width: '100%', my: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <CardHeader
                sx={{ maxWidth: 35, width: '100%', cursor: 'pointer' }}
                title={
                    <Stack>
                        <div onClick={() => push('/currency')}>
                            {currencyName}
                        </div>
                    </Stack>
                }
            />
            <>
                {
                    !isAdded ? (
                        <IconButton
                            onClick={() => handleCurrency(currencyName, true)}
                        >
                            <StarOutlineIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => handleCurrency(currencyName, false)}
                        >
                            <StarIcon />
                        </IconButton>
                    )
                }
            </>
        </Card>
    );
}

export default Item;
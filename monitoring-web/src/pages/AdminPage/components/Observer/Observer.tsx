import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@hooks';

import { ChangeRegionData, IObserver } from '@models';

import { selectAdminAvailableRegions } from '@store/admin/admin.selectors';
import { changeObserverRegion } from '@store/admin/admin.action.creators';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Observer = ({ region, email, _id }: IObserver) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Omit<ChangeRegionData, 'id'>>({
    defaultValues: {
      region,
    },
  });
  const availableRegions = useAppSelector(selectAdminAvailableRegions);
  const dispatch = useAppDispatch();

  const selectItems = availableRegions.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  const handleSubmitForm = (data: Omit<ChangeRegionData, 'id'>) => {
    if (region === data.region) return;
    dispatch(changeObserverRegion({ ...data, _id }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content'>
          <Typography>{email}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            component={'form'}
            onSubmit={handleSubmit(handleSubmitForm)}
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}
          >
            <FormControl error={!!errors.region?.message} sx={{ flex: 1 }}>
              <InputLabel id='demo-simple-select-label'>Виберіть область</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue={region}
                {...register('region', { required: 'Виберіть одину з областей' })}
                label='Виберіть область'
              >
                {selectItems}
              </Select>
              <FormHelperText id='component-error-text'>{errors.region?.message}</FormHelperText>
            </FormControl>

            <Button variant='contained' type='submit'>
              Змінити область
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

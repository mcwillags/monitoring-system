import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { Alert, Box } from '@mui/material';
interface IErrorHandlingContext {
  createError: (error: string | null) => void;
}
interface IError {
  id: number;
  error: string;
}

const ErrorHandlingContext = createContext({} as IErrorHandlingContext);

export const useErrorHandling = () => {
  return useContext(ErrorHandlingContext);
};

const createIdGenerator = () => {
  let id = 0;

  return (): number => {
    return ++id;
  };
};

export const ErrorHandlingProvider = ({ children }: PropsWithChildren) => {
  const [errors, setErrors] = useState<IError[]>([]);
  const generateId = useCallback(createIdGenerator(), []);

  const createError = (error: string | null, timeout = 3000) => {
    if (error === null) return;
    const id = generateId();

    setErrors((prev) => [...prev, { id, error }]);

    setTimeout(() => {
      closeError(id);
    }, timeout);
  };
  const closeError = (id: number) => {
    setErrors((prev) => prev.filter((error) => error.id !== id));
  };

  const errorItems = errors.map(({ id, error }) => (
    <Alert
      variant='filled'
      severity='error'
      sx={{ position: 'fixed', left: 15, bottom: 15 }}
      key={id}
    >
      {error}
    </Alert>
  ));

  return (
    <ErrorHandlingContext.Provider value={{ createError }}>
      <Box sx={{ position: 'fixed', left: 15, bottom: 20, width: '100vw', maxWidth: '600px' }}>
        {errorItems}
      </Box>
      {children}
    </ErrorHandlingContext.Provider>
  );
};

import { APP_ROUTES } from '@router/constants';
import { NavButtonLink } from '@components/NavButtonLink/NavButtonLink';

export const ObserverControls = () => {
  return (
    <>
      <NavButtonLink to={APP_ROUTES.OBSERVER_PAGE}>Показники</NavButtonLink>
      <NavButtonLink to={APP_ROUTES.OBSERVER_SETTINGS}>Налаштування</NavButtonLink>
    </>
  );
};

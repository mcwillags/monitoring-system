interface Service<TModel, TPayload> {
  findByEmail: (email: string) => Promise<TModel>;
  createTokenResponse: (
    user: TModel,
    createToken: CreateTokenCallback<TPayload>,
  ) => any;
  createAuthResponse: (user: TModel) => any;
}

interface Config<TModel, TPayload> {
  user: TModel | undefined;
  service: Service<TModel, TPayload>;
}

type ResponserReturn<TModel, TPayload> = {
  config: Config<TModel, TPayload>;
  handleAuthInit: (service: Service<TModel, TPayload>, email: string) => void;
  generateTokenResponse: (createToken: CreateTokenCallback<TPayload>) => any;
  generateAuthResponse: () => any;
};

type CreateTokenCallback<TJwt> = (payload: TJwt) => string;

export const handleCreateResponser = <
  TModel,
  TPayload = undefined,
>(): ResponserReturn<TModel, TPayload> => {
  const config: Config<TModel, TPayload> = {
    user: undefined,
    service: undefined,
  };

  const handleAuthInit = async (
    service: Service<TModel, TPayload>,
    email: string,
  ) => {
    const user = await service.findByEmail(email);

    config.service = service;
    config.user = user;
  };

  const generateTokenResponse = (createToken) => {
    return config.service.createTokenResponse(config.user, createToken);
  };

  const generateAuthResponse = () => {
    return config.service.createAuthResponse(config.user);
  };

  return {
    config,
    handleAuthInit,
    generateTokenResponse,
    generateAuthResponse,
  };
};
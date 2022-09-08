import { registerAs } from '@nestjs/config';

interface HttpConfig {
  port: number;
}

export default registerAs(
  'http',
  (): HttpConfig => ({
    port: +(process.env.HTTP_PORT || 80),
  }),
);

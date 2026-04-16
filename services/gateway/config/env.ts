export type Env = {
  DATABASE_URL: string;
  NODE_ENV: string;
  SERVER_PORT: number;
};

export default (): Env => ({
  DATABASE_URL: process.env.DATABASE_URL!,
  NODE_ENV: process.env.NODE_ENV!,
  SERVER_PORT: parseInt(process.env.SERVER_PORT!, 10) || 4000,
});

export default {
  tokenExpiry: process.env.TOKEN_EXPIRY || '7d',
  rememberedTokenExpiry: process.env.REMEMBERED_TOKEN_EXPIRY || '10d',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '30d',
  mailTokenSecret: process.env.MAIL_TOKEN_SECRET || 'TestSecret',
  jwtPassphrase: process.env.JWT_PASSPHRASE || 'top-secret',
  jwtTokenExpire: process.env.JWT_TOKEN_EXPIRY || '30d',
  forgetTokenExpiry: process.env.FORGET_TOKEN_ExPIRY || '1d',
  passwordsaltRound: 10,
  profile_progress_min: 0,
  profile_progress_max: 100
};
export type RoleType = "admin" | "manager" | "member";
export const roles = {
  admin: "admin",
  manager: "manager",
  member: "member",
} as const;
export type OrderByDirection = 'ASC' | 'DESC' 

export type status = 'published' | 'draft';
export const projectStatus: Record<status, string> = {
  published: 'published',
  draft: 'draft',
};
export type projectStatus = 'published' | 'draft'
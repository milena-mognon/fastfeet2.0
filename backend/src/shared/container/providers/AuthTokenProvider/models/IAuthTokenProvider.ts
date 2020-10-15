export default interface IAuthTokenProvider {
  createToken(subject?: string): string;
  // verifyToken();
}

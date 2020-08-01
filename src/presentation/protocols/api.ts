export interface Api {
  getUsers: (url: string) => Promise<Object[]>
}

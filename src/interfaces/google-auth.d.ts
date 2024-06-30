// declare global {
export interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize(options: { client_id: string; callback: Function }): void;
          renderButton(
            element: HTMLElement,
            params: any, // { size?: string; text?: string; width?: string; logo_alignment?: string; dataWidth?: number }
          ): void;
          signIn(): void;
        };
      };
    };
  }
// }
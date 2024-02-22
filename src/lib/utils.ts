import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AuthError } from "firebase/auth"

interface errorMessagesInterface {
  [index: string]: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleAuthError(error: AuthError) {
  const errorMessages: errorMessagesInterface = {
    'auth/email-already-in-use': 'Este endereço de e-mail já está em uso.',
    'auth/invalid-email': 'O endereço de e-mail é inválido.',
    'auth/weak-password': 'A senha é muito fraca. Escolha uma senha mais forte.',
    'auth/invalid-credential': 'Essa conta não existe.',
    'auth/too-many-requests': 'Houveram muitas tentativas de acesso a essa conta. Por favor tente novamente mais tarde.',
    'auth/wrong-password': 'Senha incorreta.'
  };

  return errorMessages[error.code as keyof errorMessagesInterface] || `Ocorreu algum erro desconhecido! \n Código: ${error.code}`
}
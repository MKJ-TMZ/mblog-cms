import { msgError } from "@/utils/message";
import router from "@/router";

export function isEmpty(value: string | undefined | null | number): boolean {
  return value === null || value === 'null' || value === undefined || value === 'undefined' || value === '';
}

export function isNotEmpty(value: string | undefined | null | number): boolean {
  return !isEmpty(value)
}

export function logoutForError() {
  window.localStorage.clear()
  router.push('/login')
  msgError('登录超时')
}
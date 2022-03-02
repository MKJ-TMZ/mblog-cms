import { ElMessage } from "element-plus";

export function message(message: string) {
  ElMessage(message)
}

export function msgSuccess(message: string) {
  ElMessage({
    message: message,
    type: 'success',
  })
}

export function msgWarning(message: string) {
  ElMessage({
    message: message,
    type: 'warning',
  })
}

export function msgError(message: string) {
  ElMessage.error(message)
}
